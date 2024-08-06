import { Injectable } from "@nestjs/common";
import { UsuarioEtity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEtity[] = [];

    async salvar(usuario: UsuarioEtity){
        this.usuarios.push(usuario);
    }

    async listar() {
        return this.usuarios;
    }

    async existeComEmail(email: string){
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return possivelUsuario !== undefined;
    }

    private buscaPorID(id: string) {
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );

        if(!possivelUsuario){
            throw new Error('Usuário não existe!')
        }

        return possivelUsuario;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEtity>) {
        const usuario = this.buscaPorID(id)

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if(chave === 'id'){
                return;
            }

            usuario[chave] = valor;
        });

        return usuario;

    }

    async remove(id: string) {
        const usuario = this.buscaPorID(id);
        this.usuarios = this.usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        );

        return usuario;
    }
}