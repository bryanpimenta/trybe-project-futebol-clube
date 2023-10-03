import { ResponseService } from '../util/mapStatus';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ILeaderboard, matchType } from '../Interfaces/leaderboards/ILeaderboard';
import TeamModel from '../models/TeamModel';

export default class LeaderboardController {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) { }

  private static calculateGoals(matches: IMatch[], teamId: number):
  { goalsFavor: number, goalsOwn: number } {
    let goalsFavor = 0;
    let goalsOwn = 0;

    matches.forEach((match) => {
      if (match.homeTeamId === teamId) {
        goalsFavor += match.homeTeamGoals;
        goalsOwn += match.awayTeamGoals;
      } else {
        goalsFavor += match.awayTeamGoals;
        goalsOwn += match.homeTeamGoals;
      }
    });

    return { goalsFavor, goalsOwn };
  }

  private static sortLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    leaderboard.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }

      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }

      return b.goalsFavor - a.goalsFavor;
    });

    return leaderboard;
  }

  private static getTeamMatches(teamId: number, finishedMatches: IMatch[], mt: matchType):
  IMatch[] {
    return finishedMatches.filter((match) => {
      if (mt === 'home') {
        return match.homeTeamId === teamId;
      } if (mt === 'away') {
        return match.awayTeamId === teamId;
      }
      return match.homeTeamId === teamId || match.awayTeamId === teamId;
    });
  }

  private static calculateEfficiency(points: number, totalMatches: number): string {
    const efficiency = ((points / (totalMatches * 3)) * 100).toFixed(2);
    return efficiency;
  }

  private static calculatePoints(wins: number, draws: number): number {
    return wins * 3 + draws;
  }

  private static calculateResults(matches: IMatch[], teamId: number):
  { wins: number, draws: number, losses: number } {
    let wins = 0;
    let draws = 0;
    let losses = 0;

    matches.forEach((match) => {
      const isHomeTeam = match.homeTeamId === teamId;
      const isAwayTeam = match.awayTeamId === teamId;
      const isDraw = match.homeTeamGoals === match.awayTeamGoals;

      if ((isHomeTeam && match.homeTeamGoals > match.awayTeamGoals)
          || (isAwayTeam && match.awayTeamGoals > match.homeTeamGoals)) {
        wins += 1;
      } else if (isDraw) {
        draws += 1;
      } else {
        losses += 1;
      }
    });
    return { wins, draws, losses };
  }

  private static leaderboard(teams: ITeam[], finishedMatches: IMatch[], mt: matchType):
  ILeaderboard[] {
    return teams.map((team) => {
      const teamMatches = LeaderboardController.getTeamMatches(team.id, finishedMatches, mt);
      const { goalsFavor, goalsOwn } = LeaderboardController.calculateGoals(teamMatches, team.id);
      const { wins, draws, losses } = LeaderboardController.calculateResults(teamMatches, team.id);
      const points = LeaderboardController.calculatePoints(wins, draws);
      return { name: team.teamName,
        totalPoints: points,
        totalGames: teamMatches.length,
        totalVictories: wins,
        totalDraws: draws,
        totalLosses: losses,
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: LeaderboardController.calculateEfficiency(points, teamMatches.length),
      };
    });
  }

  public async getLeaderboard(mt: matchType): Promise<ResponseService<ILeaderboard[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();
    const finishedMatches = matches.filter((match) => match.inProgress === false);
    const leaderboard = LeaderboardController.leaderboard(teams, finishedMatches, mt);
    const sortedLeaderboard = LeaderboardController.sortLeaderboard(leaderboard);

    return { status: 'successful', data: sortedLeaderboard };
  }
}
