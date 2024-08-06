import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, IsUUID, Matches, MaxLength, Min, ValidateNested } from "class-validator";

export class caracteristicaProdutoDTO{

    @IsString()
    @IsNotEmpty({message: 'O nome não pode ser vazio!'})
    nome: string;

    @IsString()
    @IsNotEmpty({message: 'O nome não pode ser vazio!'})
    descricao: string;
}

export class imagemDoProdutoDTO{
    @IsUrl()
    url: string;

    @IsString()
    @IsNotEmpty({message: 'Descrição da imagem não pode ser vazia'})
    descricao: string;
}

export class CriaProdutoDTO {

    @IsUUID(undefined, {message: 'ID de usuário inválid'})
    @IsString()
    @IsNotEmpty({message: 'O nome não pode ser vazio!'})
    nome: string;

    //Valida se o numero inserido é maior que 0
    //O @Matches garante que o valor de price tenha o formato correto (número positivo com até duas casas decimais) e o @IsPositive garante que seja um número positivo.
    @IsPositive({message: 'O valor do produto precisa ser um número positivo!'})
    @Matches(/^\d+(\.\d{1,2})?$/,{message: 'O valor do produto deve ter até duas casas decimais.'})
    valor: number;

    @IsNumber()
    @Min(0, {message: 'A quantidade precisa ser um numero maior ou igual a 0'})
    quantidade: number;

    @IsNotEmpty({message: 'A descrição não pode ser vazia!'})
    //Valida o tamanho maximo de uma string
    @MaxLength(1000,{message: 'A descrição não pode ter mais que 1000 caracteres.'})
    descricao: string;
    
    @ValidateNested()
    @IsArray()
    @Type(() => caracteristicaProdutoDTO)
    @ArrayMinSize(3, {message: 'A lista precisa ter no minimo 3 intens'})
    caracteristicas: caracteristicaProdutoDTO[];
    
    @ValidateNested()
    @IsArray()
    @Type(() => imagemDoProdutoDTO)
    @ArrayMinSize(1, {message: 'A lista de imagens do produto precisa ter pelo menos 1 item'})
    imagens: imagemDoProdutoDTO[];

    @IsString()
    categoria: string;
  }