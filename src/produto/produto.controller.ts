import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { produtoRepository } from './produto.repository';
import { Body, Controller, Get, Post } from "@nestjs/common";


@Controller('/produtos')
export class produtoController{

    constructor(private produtoRepository: produtoRepository){}

    @Post()
    async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO){
        this.produtoRepository.salvar(dadosDoProduto);
        return dadosDoProduto;
    }
    @Get()
    async listaUsuarios() {
        return this.produtoRepository.listar();
    }

}