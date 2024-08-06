//A pasta dto, onde criaremos classes que definem o formato e
//os tipos dos dados que aceitaremos para criar um usuário.
//e validar as informações  
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class AtualizaUsuarioDTO{

    //Valida que o nome não pode ser vazio
    @IsNotEmpty({ message: 'O nome não pode ser vazio!'})
    @IsOptional()
    nome: string;

    //Valida o e-mail
    @IsEmail(undefined, { message: 'O e-mail informado é invalido!'})
    @EmailEhUnico({message: 'Ja existe um usuário com este e-mail'})
    @IsOptional()
    email: string;

    //Valida que a senha precisa ter no minimo 6 caracteres
    @MinLength(6, {message: 'A senha precisa ter pelo menos 6 caracteres!'})
    @IsOptional()
    senha: string
}