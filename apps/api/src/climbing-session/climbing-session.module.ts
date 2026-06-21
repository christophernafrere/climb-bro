import { Module } from "@nestjs/common";
import { ClimbingSessionController } from "./climbing-session.controller";
import { ClimbingSessionService } from "./climbing-session.service";

@Module({
    controllers: [ClimbingSessionController],
    providers: [ClimbingSessionService],
})
export class ClimbingSessionModule {}
