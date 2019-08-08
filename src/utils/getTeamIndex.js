const getTeamIndex = (currentPick, currentRound, teamsNum) => {
  let index;
  if (currentRound % 2 === 0) {
    index = teamsNum - 1 - ((currentPick - 1) % teamsNum);
  } else {
    index = (currentPick - 1) % teamsNum;
  }
  return index;
};

export default getTeamIndex;
