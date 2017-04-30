const safeDomTextContentCheck = (className, parent) => parent.querySelector(className) ? parent.querySelector(className).textContent : '';

export const getBetType = parentElem => safeDomTextContentCheck('.mbr-OpenBetItemRhs_OpenBetContainer .mbr-OpenBetParticipantRhs_HeaderText', parentElem);
export const getMatch = parentElem => safeDomTextContentCheck('.mbr-OpenBetItemRhs_OpenBetContainer .mbr-OpenBetParticipantRhs_FixtureDescriptionText', parentElem);
export const getStake = parentElem => Number(safeDomTextContentCheck('.mbr-OpenBetItemRhsDetails_StakeInfo .mbr-OpenBetItemRhsDetails_StakeText', parentElem));
export const getReturnValue = parentElem => Number(safeDomTextContentCheck('.mbr-OpenBetItemRhsDetails_ReturnInfo .mbr-OpenBetItemRhsDetails_ReturnText', parentElem));
export const getMatchTime = parentElem => safeDomTextContentCheck('.mbr-OpenBetItemRhs_OpenBetContainer .mbr-OpenBetScoresRhs_Time', parentElem);
export const getMatchScore = parentElem => safeDomTextContentCheck('.mbr-OpenBetItemRhs_OpenBetContainer .mbr-OpenBetScoresRhs_Score-lastscore', parentElem);

