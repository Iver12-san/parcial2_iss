import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recinto } from './entities/recinto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecintosService {
  constructor(@InjectRepository(Recinto) private recintosRepository: Repository<Recinto>) {}
  async create(createRecintoDto: CreateRecintoDto): Promise<Recinto> {
    let recinto = await this.recintosRepository.findOneBy({
      nombre: createRecintoDto.nombre,
      aforoMaximo: createRecintoDto.aforoMaximo ?? 0,
    });
    if (recinto) throw new ConflictException('El recinto ya existe');

    recinto = new Recinto();
    Object.assign(recinto, createRecintoDto);
    return this.recintosRepository.save(recinto);
  }

  async findAll(): Promise<Recinto[]> {
    return this.recintosRepository.find();
  }

  async findOne(id: number): Promise<Recinto> {
    const recinto = await this.recintosRepository.findOneBy({ id });
    if (!recinto) throw new NotFoundException('El recinto no existe');
    return recinto;
  }

  async update(id: number, updateRecintoDto: UpdateRecintoDto): Promise<Recinto> {
    const recinto = await this.findOne(id);
    Object.assign(recinto, updateRecintoDto);
    return this.recintosRepository.save(recinto);
  }

  async remove(id: number): Promise<Recinto> {
    const recinto = await this.findOne(id);
    return this.recintosRepository.softRemove(recinto);
  }
}
