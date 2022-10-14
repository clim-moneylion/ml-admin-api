import { Controller, Param, Post } from "@nestjs/common";
import { ReposService } from "./repos.service";

@Controller('/api/repos')
export class ReposController {

    constructor(private reposService: ReposService){
    }

    @Post(':id/reload')
    async reload(@Param('id')id:string) {
        await this.reposService.reload(id);
    }
}