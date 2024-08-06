import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEtity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Controller('/usuarios')
export class UsuarioController {

    constructor(private UsuarioRepository: UsuarioRepository){}

    @Post()
    //dadosDoUsuario: CriaUsuarioDTO -> O tipo do usuário precisa ser
    //CriaUsuarioDTO para que no momento do envio da requisição
    //seja validado os dados
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEtity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uuid();

        this.UsuarioRepository.salvar(usuarioEntity);
        return { 
            id: usuarioEntity.id,
            messagem: 'usuario criado com sucesso'
        }
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.UsuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );

        return usuariosLista;

    }

    @Put('/:id')

    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO){
        const usuarioAtualizado = await this.UsuarioRepository.atualiza(id, novosDados);

        return{
            usuario: usuarioAtualizado,
            messagem: 'Usuario atualizado com sucesso!'
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.UsuarioRepository.remove(id);

        return {
            usuario: usuarioRemovido,
            messagem: 'usuário removido com sucesso'
        }
    }
}