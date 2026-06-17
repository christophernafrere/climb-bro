import {
    ConflictException,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { PartenarshipService } from "./partenarship.service";

@Controller("partnership")
export class PartenarshipController {
    constructor(private readonly partenarshipService: PartenarshipService) {}

    @UseGuards(AuthGuard)
    @Post("add/:partenarId")
    async addClimbingPartenar(
        @Req() req: any,
        @Param("partenarId") partenarId: string,
    ) {
        try {
            const addedPartenarship =
                await this.partenarshipService.addClimbingPartenar(
                    req.user.id,
                    partenarId,
                );
            return addedPartenarship;
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "uniconstraint violation"
            ) {
                throw new ConflictException("Cet ami est déjà ajouté.");
            }
            throw error;
        }
    }

    @UseGuards(AuthGuard)
    @Get("check/:id")
    async checkClimbingPartenar(@Param("id") id: string, @Req() req: any) {
        const isChecked = await this.partenarshipService.checkClimbingPartenar(
            req.user.id,
            id,
        );

        return isChecked;
    }

    @UseGuards(AuthGuard)
    @Post("remove/:partenarId")
    async removeClimbingPartenar(
        @Param("partenarId") partenarId: string,
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
