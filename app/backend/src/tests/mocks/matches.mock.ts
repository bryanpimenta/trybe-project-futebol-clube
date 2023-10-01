export const matches = [
    {
        id: 1,
        home_team_id: 16,
        home_team_goals: 1,
        away_team_id: 8,
        away_team_goals: 1,
        in_progress: false,
        homeTeam: {
            teamName: "São Paulo"
          },
          awayTeam: {
            teamName: "Grêmio"
          }
    },
    {
        id: 2,
        home_team_id: 9,
        home_team_goals: 1,
        away_team_id: 14,
        away_team_goals: 1,
        in_progress: false,
        homeTeam: {
            teamName: "Internacional"
          },
          awayTeam: {
            teamName: "Santos"
          }
    },
    {
        id: 3,
        home_team_id: 16,
        home_team_goals: 2,
        away_team_id: 9,
        away_team_goals: 0,
        in_progress: true,
        homeTeam: {
            teamName: "São Paulo"
          },
          awayTeam: {
            teamName: "Internacional"
          }
    },
    {
        id: 4,
        home_team_id: 6,
        home_team_goals: 1,
        away_team_id: 1,
        away_team_goals: 0,
        in_progress: true,
        homeTeam: {
            teamName: "São Paulo"
          },
          awayTeam: {
            teamName: "Grêmio"
          }
    },
    {
        id: 5,
        home_team_id: 7,
        home_team_goals: 1,
        away_team_id: 10,
        away_team_goals: 1,
        in_progress: false,
        homeTeam: {
            teamName: "Flamengo"
          },
          awayTeam: {
            teamName: "Minas Brasília"
          }
    },
];

export const matches_in_progress = matches.filter(match => match.in_progress);
export const matches_no_progress = matches.filter(match => !match.in_progress);