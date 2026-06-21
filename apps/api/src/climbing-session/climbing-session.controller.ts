import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ClimbingSessionService } from "./climbing-session.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("climbing-session")
export class ClimbingSessionController {
    constructor(
        private readonly climbingSessionService: ClimbingSessionService,
    ) {}

    @UseGuards(AuthGuard)
    @Post()
    async createClimbingSession(
        @Request() req,
        @Body()
        {
            name,
            climbingType,
            date,
            message,
            requiredLevel,
            maxClimbers,
            onlyForPartner,
            creatorId,
        },
    ) {
        // Call the service method to create a climbing session
        const userId = req.user.id; // Assuming the user ID is available in the request object
        if (userId !== creatorId) {
            throw new Error(
                "You are not authorized to create a climbing session for another user.",
            );
        }
        const newSession =
            await this.climbingSessionService.createClimbingSession(
                name,
                climbingType,
                date,
                message,
                requiredLevel,
                maxClimbers,
                onlyForPartner,
                creatorId,
            );

        return newSession;
    }

    @UseGuards(AuthGuard)
    @Post("all-public")
    async getAllPublicClimbingSession() {
        const allPublicSessions =
            await this.climbingSessionService.getAllPublicClimbingSession();
        return allPublicSessions;
    }

    @UseGuards(AuthGuard)
    @Post("my-sessions")
    async getMyClimbingSessions(@Request() req) {
        const userId = req.user.id;
        const mySessions =
            await this.climbingSessionService.getMyClimbingSessions(userId);
        return mySessions;
    }

    @UseGuards(AuthGuard)
    @Post("partners-sessions")
    async getPartnersSession(@Request() req) {
        const userId = req.user.id;
        const partnersSessions =
            await this.climbingSessionService.getPartnersSession(userId);
        return partnersSessions;
    }

    @UseGuards(AuthGuard)
    @Post("history")
    async getClimbingSessionHistory(@Request() req) {
        const userId = req.user.id;
        const history =
            await this.climbingSessionService.getClimbingSessionHistory(userId);
        return history;
    }

    @UseGuards(AuthGuard)
    @Post("incoming")
    async getAllIncomingClimbingSessions(@Request() req) {
        const userId = req.user.id;
        const incomingSessions =
            await this.climbingSessionService.getAllIncomingClimbingSessions(
                userId,
            );
        return incomingSessions;
    }
}
