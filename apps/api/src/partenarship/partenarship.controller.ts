import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { PartenarshipService } from "./partenarship.service";

@Controller("partenarship")
export class PartenarshipController {
    constructor(private readonly partenarshipService: PartenarshipService) {}
    @UseGuards(AuthGuard)
    @Post("add")
    async addClimbingPartenar(
        @Body("partenarId") partenarId: string,
        @Req() req: any,
    ) {
        const newPartenarship =
            await this.partenarshipService.addClimbingPartenar(
                req.user.id,
                partenarId,
            );
        return newPartenarship;
    }

    @UseGuards(AuthGuard)
    @Post("remove")
    async removeClimbingPartenar(
        @Body("partenarId") partenarId: string,
        @Req() req: any,
    ) {
        const removedPartenarship =
            await this.partenarshipService.removeClimbingPartenar(
                req.user.id,
                partenarId,
            );
        return removedPartenarship;
    }

    @UseGuards(AuthGuard)
    @Get()
    async getClimbingPartenars(@Req() req: any) {
        const partenars = await this.partenarshipService.getClimbingPartenars(
            req.user.id,
        );
        return partenars;
    }
}
