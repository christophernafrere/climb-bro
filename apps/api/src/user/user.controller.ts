import { Controller, Get, Put, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @UseGuards(AuthGuard)
    @Get("me")
    async getMyProfile(
        @Req() request: any,
        @Res({ passthrough: true }) response: Response,
    ) {
        const userId = request.user.id;

        const user = await this.userService.getUserById(userId);

        console.log("User profile retrieved:", user);

        return user;
    }

    @UseGuards(AuthGuard)
    @Put("profile/picture")
    async modifyProfilePicture(
        @Req() request: any,
        @Res({ passthrough: true }) response: Response,
    ) {
        const userId = request.user.id;
        const { imageUrl } = request.body;

        const updatedUser = await this.userService.modifyProfilePicture(
            userId,
            imageUrl,
        );

        console.log("User profile picture updated:", updatedUser);

        return updatedUser;
    }
}
