import { Module } from "@nestjs/common";
import { PartenarshipController } from "./partenarship.controller";
import { PartenarshipService } from "./partenarship.service";

@Module({
    controllers: [PartenarshipController],
    providers: [PartenarshipService],
})
export class PartenarshipModule {}
