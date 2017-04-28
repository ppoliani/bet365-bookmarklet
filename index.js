javascript:(
  () => {
    const partial = (fn, ...args) => (...restArgs) => fn.apply(this, args.concat(restArgs));

    const periodicCheck = (resolve, className, childrenIndex) => {
      try{
        const elem = document.querySelector(className).children[childrenIndex];
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
        console.log('Parsing unsettled bets', e.target);
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
