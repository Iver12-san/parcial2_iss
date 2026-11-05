import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventosCultural } from './entities/eventos-cultural.entity';
import { CreateEventosCulturalDto } from './dto/create-eventos-cultural.dto';
import { UpdateEventosCulturalDto } from './dto/update-eventos-cultural.dto';

@Injectable()
export class EventosCulturalesService {
  constructor(
    @InjectRepository(EventosCultural)
    private readonly eventosCulturalRepository: Repository<EventosCultural>,
  ) {}
  async create(createEventosCulturalDto: CreateEventosCulturalDto): Promise<EventosCultural> {
    let eventoCultual = await this.eventosCulturalRepository.findOneBy({
      idRecinto: createEventosCulturalDto.idRecinto,
      fechaEvento: createEventosCulturalDto.fechaEvento,
    });
    if (eventoCultual) throw new ConflictException('El evento cultural ya existe');

    eventoCultual = new EventosCultural();
    Object.assign(eventoCultual, createEventosCulturalDto);
    return this.eventosCulturalRepository.save(eventoCultual);
  }

  async findAll(): Promise<EventosCultural[]> {
    return this.eventosCulturalRepository.find({
      relations: { recinto: true },
      order: { idRecinto: 'ASC' },
    });
  }

  async findOne(id: number): Promise<EventosCultural> {
    const eventoCultual = await this.eventosCulturalRepository.findOne({
      where: { id },
      relations: { recinto: true },
    });
    if (!eventoCultual) throw new NotFoundException('El evento cultural no existe');
    return eventoCultual;
  }

  async update(
    id: number,
    updateEventosCulturalDto: UpdateEventosCulturalDto,
  ): Promise<EventosCultural> {
    const eventoCultual = await this.findOne(id);
    Object.assign(eventoCultual, updateEventosCulturalDto);
    return this.eventosCulturalRepository.save(eventoCultual);
  }

  async remove(id: number): Promise<EventosCultural> {
    const eventoCultual = await this.findOne(id);
    return this.eventosCulturalRepository.softRemove(eventoCultual);
  }
}
