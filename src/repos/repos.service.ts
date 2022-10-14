import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { exec, execSync } from "child_process";
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class ReposService{
    reposStorage;

    constructor(private configService: ConfigService) {
        this.reposStorage = this.configService.get('REPOS_STORAGE')
    }

    async clone(id:string){
        return execSync(`git clone -b Create_IC_users git@github.com:MoneyLion/${id}.git ${this.repoPath(id)}`)
    }

    async reload(id:string){
        const path: any = this.repoPath(id);
        if(!fs.existsSync(path)){
            return this.clone(id);
        }

        return execSync(`git pull`, {
            cwd: path
        })
    }

    repoPath(id){
        return path.join(this.reposStorage, id);
    }
}