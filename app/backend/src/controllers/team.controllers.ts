import { Request, Response } from "express";
import mapStatusHTTP from "../util/mapStatus";
import TeamService from "../services/team.services";

export default class TeamsController {
    constructor(
      private teamService = new TeamService(),
    ) { }

    public async getTeams(_req: Request, res: Response) {
        const serviceResponse = await this.teamService.getTeams();
        res.status(200).json(serviceResponse.data);
      }
    
      public async getTeamsById(req: Request, res: Response) {
        const { id } = req.params;
    
        const serviceResponse = await this.teamService.getTeamById(Number(id));
    
        if (serviceResponse.status !== 'SUCCESSFUL') {
          return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
        }
    
        res.status(200).json(serviceResponse.data);
      }
}