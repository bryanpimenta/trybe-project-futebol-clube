export const matches = [
    {
        id: 1,
        homeTeamId: 1,
        homeTeamGoals: 2,
        awayTeamId: 5,
        awayTeamGoals: 2,
        inProgress: false,
    },
    {
        id: 2,
        homeTeamId: 2,
        homeTeamGoals: 2,
        awayTeamId: 3,
        awayTeamGoals: 5,
        inProgress: false,
    },
    {
        id: 3,
        homeTeamId: 3,
        homeTeamGoals: 2,
        awayTeamId: 4,
        awayTeamGoals: 5,
        inProgress: false,
    },
    {
        id: 4,
        homeTeamId: 4,
        homeTeamGoals: 2,
        awayTeamId: 2,
        awayTeamGoals: 5,
        inProgress: false,
    },
    {
        id: 5,
        homeTeamId: 5,
        homeTeamGoals: 2,
        awayTeamId: 1,
        awayTeamGoals: 2,
        inProgress: false,
    },
    {
        id: 6,
        homeTeamId: 11,
        homeTeamGoals: 0,
        awayTeamId: 10,
        awayTeamGoals: 0,
        inProgress: true,
    },
    {
        id: 7,
        homeTeamId: 7,
        homeTeamGoals: 2,
        awayTeamId: 15,
        awayTeamGoals: 2,
        inProgress: true,
    },
    {
        id: 8,
        homeTeamId: 5,
        homeTeamGoals: 1,
        awayTeamId: 3,
        awayTeamGoals: 1,
        inProgress: true,
    },
    {
        id: 9,
        homeTeamId: 4,
        homeTeamGoals: 1,
        awayTeamId: 12,
        awayTeamGoals: 1,
        inProgress: true,
    },
    {
        id: 10,
        homeTeamId: 8,
        homeTeamGoals: 1,
        awayTeamId: 14,
        awayTeamGoals: 2,
        inProgress: true,
    }
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

export const invalid_create_match = {
    homeTeamId: 1,
    homeTeamGoals: 0,
    awayTeamId: 1,
    awayTeamGoals: 0,
};

export const inexistent_team_match = {
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 100,
    awayTeamGoals: 0,
}
