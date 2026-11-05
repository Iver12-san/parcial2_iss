import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventosCulturalesService } from './eventos-culturales.service';
import { CreateEventosCulturalDto } from './dto/create-eventos-cultural.dto';
import { UpdateEventosCulturalDto } from './dto/update-eventos-cultural.dto';

@Controller('eventos-culturales')
export class EventosCulturalesController {
  constructor(private readonly eventosCulturalesService: EventosCulturalesService) {}

  @Post()
  create(@Body() createEventosCulturalDto: CreateEventosCulturalDto) {
    return this.eventosCulturalesService.create(createEventosCulturalDto);
  }

  @Get()
  findAll() {
    return this.eventosCulturalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventosCulturalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventosCulturalDto: UpdateEventosCulturalDto) {
    return this.eventosCulturalesService.update(+id, updateEventosCulturalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosCulturalesService.remove(+id);
  }
}
