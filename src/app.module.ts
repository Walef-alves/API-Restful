import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { produtoModule } from './produto/produto.module';

@Module({
  imports: [UsuarioModule, produtoModule],
})
export class AppModule {}

