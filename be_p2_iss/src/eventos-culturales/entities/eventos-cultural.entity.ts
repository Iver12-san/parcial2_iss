import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recinto } from '../../recintos/entities/recinto.entity';

@Entity('eventos-culturales')
export class EventosCultural {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_recinto' })
  idRecinto: number;

  @Column('varchar', { length: 150 })
  titulo: string;

  @Column('varchar', { length: 100, name: 'artista_principal' })
  artistaPrincipal: string;

  @Column('int', { nullable: false, name: 'duracion_minutos' })
  duracionMinutos: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'precio_entrada' })
  precioEntrada: number;

  @Column('date', { name: 'fecha_evento' })
  fechaEvento: Date;

  @Column({
    type: 'enum',
    enum: ['Programado', 'Agotado', 'Cancelado'],
    default: 'Programado',
  })
  estado: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Recinto, recinto => recinto.eventosCulturales)
  @JoinColumn({ name: 'id_recinto', referencedColumnName: 'id' })
  recinto: Recinto;
}
