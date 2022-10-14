import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { exec, execSync } from "child_process";
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from "./dto/create-user.dto";
import { UserTier } from "./enums/user-tier";

@Injectable()
export class UsersService{
    reposStorage;

    constructor(private configService: ConfigService) {
        this.reposStorage = this.configService.get('REPOS_STORAGE')
    }

    async create(createUserDto: CreateUserDto){
        const path: any = this.repoPath('ml_karateAPI_automated_test');
        const logPath = this.executionLogPath(`${uuid()}.log`);
        if(UserTier.LITE_TIER == createUserDto.tier){
            execSync(`mvn clean install -Dkarate.options="--tags ~@ignore --tags @createICLiteTierUser" > ${logPath}`, {
                cwd: path,
                env: {
                    'AWS_PROFILE': 'mk2acc',
                    'LOCAL': 'true'
                },
                encoding: 'utf8', maxBuffer: 50 * 1024 * 1024,
                stdio: 'inherit'
            });

            if(!fs.existsSync(logPath)){
                throw new InternalServerErrorException("No Execution available")
            }
            const output = execSync(`tail -n 100 ${logPath}`,{
                encoding: 'utf8', maxBuffer: 50 * 1024 * 1024
            }).toString();
            const expectedOutput = /\<output\>(.*)\<output\>/gi.exec(output);
            // fs.unlinkSync(logPath)
            return JSON.parse(expectedOutput[1]);
        }

        return new BadRequestException("Unsupported tier");
    }

    repoPath(id){
        return path.join(this.reposStorage, id);
    }

    executionLogPath(logfile){
        return path.resolve(`storages/tmp/${logfile}`);
    }
}