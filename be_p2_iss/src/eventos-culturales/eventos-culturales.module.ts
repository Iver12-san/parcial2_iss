import { Module } from '@nestjs/common';
import { EventosCulturalesService } from './eventos-culturales.service';
import { EventosCulturalesController } from './eventos-culturales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosCultural } from './entities/eventos-cultural.entity';


@Module({
  imports: [TypeOrmModule.forFeature([EventosCultural])],
  controllers: [EventosCulturalesController],
  providers: [EventosCulturalesService],
})
export class EventosCulturalesModule {}
