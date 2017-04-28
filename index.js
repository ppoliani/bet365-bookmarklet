javascript:(
  () => {
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

    if(!window.BET_365_onUnsettledBetsTabClick) {
      window.BET_365_onUnsettledBetsTabClick = e => {
        checkExistanceOfElement('.mbr-OpenBetItemsContainerRhs_BetItemsContainer')
          .then(openBets => {
            const aggregates = Array
              .from(openBets)
              .reduce((acc, bet) => {
                const match = bet.querySelector('.mbr-OpenBetItemRhs .mbr-OpenBetParticipantRhs_FixtureDescriptionText').textContent;
                const betInfo = bet.querySelector('.mbr-OpenBetItemRhs .mbr-OpenBetItemRhsDetails_BetInfo');
                const stake = Number(betInfo.querySelector('.mbr-OpenBetItemRhsDetails_StakeInfo .mbr-OpenBetItemRhsDetails_StakeText').textContent);
                const returnValue = Number(betInfo.querySelector('.mbr-OpenBetItemRhsDetails_ReturnInfo .mbr-OpenBetItemRhsDetails_ReturnText').textContent);

                if(acc[match]) {
                  acc[match] = {
                    stake: acc[match].stake + stake,
                    returnValue: acc[match].returnValue + returnValue
                  }
                }
                else {
                  acc[match] = {stake, returnValue};
                }
                return acc;
              },
              {}
            );

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
