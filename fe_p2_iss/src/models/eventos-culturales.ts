import type { Recinto } from './recinto'
export type EstadoEvento = 'Programado' | 'Agotado' | 'Cancelado'
export type CategoriaEventoo = 'Concierto' | 'Teatro' | 'Danza' | 'Festival'
export interface EventoCultural {
  id: number
  idRecinto: number
  titulo: string
  artistaPrincipal: string
  duracionMinutos: number
  precioEntrada: number
  fechaEvento: Date
  estado: EstadoEvento
  categoriaEvento: CategoriaEventoo
  recinto: Recinto
}
