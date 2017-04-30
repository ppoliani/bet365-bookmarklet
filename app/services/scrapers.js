const safeDomTextContentCheck = (className, parent) => parent.querySelector(className) ? parent.querySelector(className).textContent : '';

const findStake = betInfo => {
  if (betInfo.querySelector('.mbr-OpenBetItemRhsDetails_StakeInfo .mbr-OpenBetItemRhsDetails_StakeLabel').textContent === "Stake"){
    return Number(betInfo.querySelector('.mbr-OpenBetItemRhsDetails_StakeInfo .mbr-OpenBetItemRhsDetails_StakeText').textContent);
  }
  else {
    const stakeLabel = Number(betInfo.querySelector('.mbr-OpenBetItemRhsDetails_StakeInfo .mbr-OpenBetItemRhsDetails_StakeLabel').textContent.match(/([0-9.]+)/g));
    const stakeText = Number(betInfo.querySelector('.mbr-OpenBetItemRhsDetails_StakeInfo .mbr-OpenBetItemRhsDetails_StakeText').textContent.match(/([0-9.]+)/g));

    return stakeLabel * stakeText;
  }
};


export const getBetType = parentElem => safeDomTextContentCheck('.mbr-OpenBetItemRhs_OpenBetContainer .mbr-OpenBetParticipantRhs_HeaderText', parentElem);
export const getMatch = parentElem => safeDomTextContentCheck('.mbr-OpenBetItemRhs_OpenBetContainer .mbr-OpenBetParticipantRhs_FixtureDescriptionText', parentElem);
export const getStake = parentElem => findStake(parentElem);
export const getReturnValue = parentElem => Number(safeDomTextContentCheck('.mbr-OpenBetItemRhsDetails_ReturnInfo .mbr-OpenBetItemRhsDetails_ReturnText', parentElem));
export const getMatchTime = parentElem => safeDomTextContentCheck('.mbr-OpenBetItemRhs_OpenBetContainer .mbr-OpenBetScoresRhs_Time', parentElem);
export const getMatchScore = parentElem => safeDomTextContentCheck('.mbr-OpenBetItemRhs_OpenBetContainer .mbr-OpenBetScoresRhs_Score-lastscore', parentElem);

