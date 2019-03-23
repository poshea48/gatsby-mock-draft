export const NFLTeamsNeeds = {
  default: {
    'Pauls Teams Needs': {},
  },
};

export const NFLTeamsNeedsList = Object.keys(NFLTeamsNeeds).map(needsList => {
  return { name: needsList };
});
