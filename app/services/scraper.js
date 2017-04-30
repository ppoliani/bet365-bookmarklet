import {checkExistanceOfElement, periodicCheck, partial} from './utils';
import {getTotalStake, getTotalReturnValue} from './betslip';
import {getBetType, betMarket, getMatch, getStake, getReturnValue, getMatchTime, getMatchScore, getBetMarket} from './scrapers';

const calculateAggregates = openBets => {
  const aggregates = Array
    .from(openBets)
    .reduce((acc, bet) => {
      const {betType, betMarket, match, stake, returnValue, matchTime, matchScore} = getBetSlipValues(bet);
      const key = `${match} - ${betType}`;
      let matchEntry = acc[key];

      if(matchEntry) {
        acc[key] = {
          stake: matchEntry.stake + stake,
          returnValue: matchEntry.returnValue + returnValue,
          matchTime,
          matchScore,
          betType,
          betMarket
        }
      }
      else {
        acc[key] = {stake, returnValue, matchTime, matchScore, betType, betMarket};
      }
      return acc;
    },
    {}
  );

  aggregates['Total'] = {
    stake: getTotalStake(aggregates),
    returnValue: getTotalReturnValue(aggregates)
  };

  console.table(aggregates);

  return aggregates;
};

const getBetSlipValues = bet => {
  const betType = getBetType(bet);
  const betMarket = getBetMarket(bet);
  const match = getMatch(bet);
  const betInfo = bet.querySelector('.mbr-OpenBetItemRhs_OpenBetContainer .mbr-OpenBetItemRhsDetails_BetInfo');
  const stake = getStake(betInfo);
  const returnValue = getReturnValue(betInfo);
  const matchTime = getMatchTime(bet);
  const matchScore = getMatchScore(bet);

  return {betType, betMarket, match, stake, returnValue, matchTime, matchScore};
};

export const scrape = () =>
  new Promise((resolve, reject) => {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        const activeTab = tabs[0];

        chrome.runtime.onMessage.addListener(openBets => {
          const parser = new DOMParser();
          const docs = JSON
            .parse(openBets)
            .map(bet => parser.parseFromString(bet, 'text/html'));

          try {
            resolve(calculateAggregates(docs));
          }
          catch(_) {
            reject(new Error('No bets available!'));
          }
        });

        chrome.tabs.executeScript(
          activeTab.id,
          {
            code: `
              (async () => {
                ${partial.toString()}
                ${periodicCheck.toString()}
                ${checkExistanceOfElement.toString()}

                const betsTab = document.querySelectorAll('.bw-BetslipHeader_Item')[1];
                betsTab.click();

                const unsettledBetsTab = await checkExistanceOfElement('.mbr-OpenBetHeaderRhs_Container', 2);
                unsettledBetsTab.click();

                const openBets = await checkExistanceOfElement('.mbr-OpenBetItemsContainerRhs_BetItemsContainer');
                const result = JSON.stringify(Array.from(openBets).map(e => e.innerHTML));

                chrome.runtime.sendMessage(result, response => {
                  console.log(response);
                });
              })()
            `
          }
        );
      })
  });
