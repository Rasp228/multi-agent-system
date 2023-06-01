import { ErrorController } from "../Controller/error.controller";
import { Module } from "@nestjs/common";

@Module({
    controllers: [ErrorController],
})
export class ErrorModule {}
