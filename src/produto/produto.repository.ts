import { Injectable } from "@nestjs/common";

@Injectable()
export class produtoRepository{
    private produtos = [];

    async salvar(produto){
        this.produtos.push(produto);
    }
    async listar(){
        return this.produtos;
    }
}