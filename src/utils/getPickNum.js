const getPickNum = (teamIndex, round, teamsNum) => {
  let pick;
  if (round % 2 === 0) {
    pick = round * teamsNum - teamIndex;
  } else {
    pick = round * teamsNum - teamsNum + teamIndex + 1;
  }
  return pick;
};

export default getPickNum;
