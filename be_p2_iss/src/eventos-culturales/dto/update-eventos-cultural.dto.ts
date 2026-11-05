
import { PartialType } from '@nestjs/swagger';
import { CreateEventosCulturalDto } from './create-eventos-cultural.dto';
export class UpdateEventosCulturalDto extends PartialType(CreateEventosCulturalDto) {}
