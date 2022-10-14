import { IsEnum } from "class-validator";
import { UserTier } from "../enums/user-tier";

export class CreateUserDto {
    @IsEnum(UserTier)
    tier: UserTier;
}