export const matches = [
    {
        id: 1,
        homeTeamId: 16,
        homeTeamGoals: 1,
        awayTeamId: 8,
        awayTeamGoals: 1,
        inProgress: false,
    },
    {
        id: 2,
        homeTeamId: 9,
        homeTeamGoals: 1,
        awayTeamId: 14,
        awayTeamGoals: 1,
        inProgress: false,
    },
    {
        id: 3,
        homeTeamId: 16,
        homeTeamGoals: 2,
        awayTeamId: 9,
        awayTeamGoals: 0,
        inProgress: true,
    },
    {
        id: 4,
        homeTeamId: 6,
        homeTeamGoals: 1,
        awayTeamId: 1,
        awayTeamGoals: 0,
        inProgress: true,
    },
];

export const matches_in_progress = matches.filter(match => match.inProgress);
export const matches_no_progress = matches.filter(match => !match.inProgress);
export const update_match = { homeTeamGoals: 3, awayTeamGoals: 1 };
export const create_match = {
  homeTeamId: 6,
  homeTeamGoals: 1,
  awayTeamId: 1,
  awayTeamGoals: 0,
};