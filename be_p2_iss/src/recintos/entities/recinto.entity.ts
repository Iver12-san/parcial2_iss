import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventosCultural } from '../../eventos-culturales/entities/eventos-cultural.entity';

@Entity('recintos')
export class Recinto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 50 })
  ciudad: string;

  @Column('int', { name: 'aforo_maximo', nullable: true })
  aforoMaximo: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => EventosCultural, eventosCulturales => eventosCulturales.recinto)
  eventosCulturales: EventosCultural[];
}
