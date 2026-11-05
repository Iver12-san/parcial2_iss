import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDateString, IsDefined, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateEventosCulturalDto {
  @ApiProperty()
  @IsDefined({ message: 'El id del artista es obligatorio' })
  @IsInt({ message: 'El id del artista debe ser tipo numérico' })
  readonly idRecinto: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El titulo es obligatorio' })
  @IsString({ message: 'El titulo debe ser de tipo cadena' })
  @MaxLength(150, { message: 'El titulo no puede tener más de 150 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly titulo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El artista principal es obligatorio' })
  @IsString({ message: 'El artista principal debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El artista principal no puede tener más de 100 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly artistaPrincipal: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo duracion minutos es obligatorio' })
  @IsInt({ message: 'El campo duracion minutos debe ser numérico' })
  readonly duracionMinutos: number;

  @ApiProperty({
    description: 'Precio entrada  en formato decimal',
    example: 1250.5,
  })
  @IsNotEmpty({ message: 'El campo precio es obligatorio' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El campo precio entrada debe ser un número decimal válido' },
  )
  @Transform(({ value }) => (value !== undefined && value !== '' ? parseFloat(value) : value))
  readonly precioEntrada: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo fecha de venta debe estar definido' })
  @IsDateString({}, { message: 'El campo fecha de venta debe ser una fecha válida' })
  @Transform(({ value }) => (value === '' || value === null ? undefined : value))
  readonly fechaEvento: Date;

  @ApiProperty({
    description:
      'Estado actual del evento cultural. Valores permitidos: Programado, Agotado, Cancelado',
    enum: ['Programado', 'Agotado', 'Cancelado'],
    example: 'Programado',
  })
  @IsNotEmpty({ message: 'El campo estado no debe estar vacío' })
  @IsEnum(['Programado', 'Agotado', 'Cancelado'], {
    message:
      'El campo estado solo puede tener los valores: Programado, Agotado, Cancelado',
  })
  @MaxLength(20, { message: 'El campo estado no puede tener más de 20 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly estado: string;
}
