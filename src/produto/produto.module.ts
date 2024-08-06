import { Module } from "@nestjs/common";
import { produtoController } from "./produto.controller";
import { produtoRepository } from "./produto.repository";

@Module({
    controllers: [produtoController],
    providers: [produtoRepository]
})
export class produtoModule{}