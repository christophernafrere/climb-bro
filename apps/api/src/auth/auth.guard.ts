import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.cookies?.access_token;

        if (!token) {
            throw new UnauthorizedException("No access token provided");
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);

            request.user = payload;

            return true;
        } catch (error) {
            throw new UnauthorizedException("Invalid access token");
        }
    }
}
