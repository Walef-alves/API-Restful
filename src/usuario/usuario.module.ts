import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailEhUnicoValidaor } from "./validacao/email-eh-unico.validator";

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioRepository, EmailEhUnicoValidaor]
})
export class UsuarioModule{}
