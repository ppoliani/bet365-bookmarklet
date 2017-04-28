javascript:(
  () => {
    const entries = function *(obj) {
      for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
      }
    };

    const partial = (fn, ...args) => (...restArgs) => fn.apply(this, args.concat(restArgs));

    const periodicCheck = (resolve, className, childrenIndex) => {
      try{
        const elem = childrenIndex
          ? document.querySelector(className).children[childrenIndex]
          : document.querySelector(className).children;
        if(elem) return resolve(elem);
        requestAnimationFrame(partial(periodicCheck, resolve, className, childrenIndex))
      }
      catch(err) {
        requestAnimationFrame(partial(periodicCheck, resolve, className, childrenIndex))
      }
    };

    const checkExistanceOfElement = (className, childrenIndex) => {
      return new Promise((resolve, reject) => {
        requestAnimationFrame(partial(periodicCheck, resolve, className, childrenIndex))
      });
    };
    const betsTab = document.querySelectorAll('.bw-BetslipHeader_Item')[1];
    const getTotalStake = aggregates =>
      +[...entries(aggregates)]
        .reduce((acc, [_, {stake}]) => acc + stake, 0)
        .toFixed(2);

    const getTotalReturnValue = aggregates =>
       +[...entries(aggregates)]
        .reduce((acc, [_, {returnValue}]) => acc + returnValue, 0)
        .toFixed(2);

    if(!window.BET_365_onUnsettledBetsTabClick) {
      window.BET_365_onUnsettledBetsTabClick = e => {
        checkExistanceOfElement('.mbr-OpenBetItemsContainerRhs_BetItemsContainer')
          .then(openBets => {
            const aggregates = Array
              .from(openBets)
              .reduce((acc, bet) => {
                const betType = bet.querySelector('.mbr-OpenBetItemRhs .mbr-OpenBetParticipantRhs_HeaderText').textContent;
                const match = bet.querySelector('.mbr-OpenBetItemRhs .mbr-OpenBetParticipantRhs_FixtureDescriptionText').textContent;
                const betInfo = bet.querySelector('.mbr-OpenBetItemRhs .mbr-OpenBetItemRhsDetails_BetInfo');
                const stake = Number(betInfo.querySelector('.mbr-OpenBetItemRhsDetails_StakeInfo .mbr-OpenBetItemRhsDetails_StakeText').textContent);
                const returnValue = Number(betInfo.querySelector('.mbr-OpenBetItemRhsDetails_ReturnInfo .mbr-OpenBetItemRhsDetails_ReturnText').textContent);
                const matchTime = bet.querySelector('.mbr-OpenBetItemRhs .mbr-OpenBetScoresRhs_Time').textContent;
                const matchScore = bet.querySelector('.mbr-OpenBetItemRhs .mbr-OpenBetScoresRhs_Score-lastscore').textContent;
                const key = `${match} - ${betType}`;
                let matchEntry = acc[key];

                if(matchEntry) {
                  acc[key] = {
                    stake: matchEntry.stake + stake,
                    returnValue: matchEntry.returnValue + returnValue,
                    matchTime,
                    matchScore,
                    betType
                  }
                }
                else {
                  acc[key] = {stake, returnValue, matchTime, matchScore, betType};
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
        });
      };
    }

    betsTab.click();

    checkExistanceOfElement('.mbr-OpenBetHeaderRhs_Container', 2)
      .then(unsettledBetsTab => {
        unsettledBetsTab.removeEventListener('click', window.BET_365_onUnsettledBetsTabClick);
        unsettledBetsTab.addEventListener('click', window.BET_365_onUnsettledBetsTabClick);
        unsettledBetsTab.click();
      });
  }
)();
