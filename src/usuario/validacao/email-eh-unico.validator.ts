import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './../usuario.repository';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@Injectable()
@ValidatorConstraint({ async: true})

export class EmailEhUnicoValidaor implements ValidatorConstraintInterface{
    
    constructor(private UsuarioRepository: UsuarioRepository) {}
    
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean>{
        const usuarioComEmailExiste = await this.UsuarioRepository.existeComEmail(value)
        return !usuarioComEmailExiste;
    }
    
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidaor
        })
    }
}
//Validar que um e-mail já foi usado por outro usuário da nossa lógica precisa ser feito de forma assíncrona, visto que precisamos ir até o banco de dados ou mesmo outro serviço e esperar uma resposta.

//Dito isso, crie um novo provider, que decorado com @ValidatorConstraint({ async: true }), implemente a interface ValidatorConstraintInterface. Este provider também deve receber como dependência no construtor o repositório de usuários, afinal, é o repositório que faz interação com o banco de dados.

//A interface ValidatorConstraintInterface no seu método validate, espera que retornemos um valor booleano que indique se a validação foi um sucesso ou não. Se retornarmos o valor false, o erro de validação deve ser apresentado.

//Para criar o decorator que executa a validação personalizada que acabamos de descrever, precisamos criar uma função. O nome desta função será o nome do decorator. E, como parâmetro, essa função deve receber um objeto do tipo ValidationOptions, interface importada do pacote class-validator.

//Nossa função decorator deve retornar como resultado uma nova função que tem como parâmetros o objeto a ser validado e o nome da propriedade que será validada.

//Esta segunda função deve executar o registro deste decorator no class-validator por meio do uso da função registerDecorator que recebe como argumento um objeto, informando o target alvo da validação, a propriedade a ser validada, as opções de validação, as constraints e por último o validator (classe que já escrevemos antes).