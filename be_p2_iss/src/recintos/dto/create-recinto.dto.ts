import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateRecintoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La ciudad es obligatorio' })
  @IsString({ message: 'La ciudad debe ser de tipo cadena' })
  @MaxLength(50, { message: 'La ciudad no puede tener más de 50 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly ciudad: string;

  @ApiProperty()
  @IsOptional()
  @IsInt({ message: 'El aforo máximo debe ser un número entero' })
  @Min(0, { message: 'El aforo máximo no puede ser negativo' })
  @Transform(({ value }): number | undefined => (typeof value == 'number' ? value : undefined))
  readonly aforoMaximo: number;
}
