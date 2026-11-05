<script setup lang="ts">
import type { EventoCultural, EstadoEvento, CategoriaEventoo } from '@/models/eventos-culturales'
import type { Recinto } from '@/models/recinto'
import http from '@/plugins/axios'
import { Button, Dialog, InputNumber, InputText, Select, Textarea, DatePicker } from 'primevue'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'eventos-Culturales'

// Estado del Evento (para el Select)
const ESTADOS_EVENTO: EstadoEvento[] = ['Programado', 'Agotado', 'Cancelado']
// Categoría del Evento (para el Select)
const CATEGORIAS_EVENTO: CategoriaEventoo[] = ['Concierto', 'Teatro', 'Danza', 'Festival']

const props = defineProps({
  mostrar: Boolean,
  eventoCultural: {
    type: Object as () => EventoCultural,
    default: () => ({}) as EventoCultural,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

// Listas para Selects
const recintos = ref<Recinto[]>([])

// Datos del formulario
const eventoCultural = ref<EventoCultural>({ ...props.eventoCultural })

// Lógica de diálogo
const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

// Observador para actualizar el formulario cuando cambian las props
watch(
  () => props.eventoCultural,
  (newVal) => {
    if (newVal && newVal.id) {
      eventoCultural.value = {
        ...newVal,
        fechaEvento: newVal.fechaEvento ? new Date(newVal.fechaEvento) : new Date(),
      }
    } else {
      eventoCultural.value = {
        id: 0,
        idRecinto: 0,
        titulo: '',
        artistaPrincipal: '',
        duracionMinutos: 1,
        precioEntrada: 0,
        fechaEvento: new Date(),
        estado: 'Programado',
        categoriaEvento: 'Concierto',
        recinto: {} as Recinto,
      } as EventoCultural
    }
  },
  { deep: true },
)

async function obtenerRecintos() {
  try {
    recintos.value = await http.get('recintos').then((response) => response.data)
  } catch (error) {
    console.error('Error al cargar recintos:', error)
  }
}

// --- Métodos de Guardado ---

async function handleSave() {
  try {
    const body = {
      idRecinto: eventoCultural.value.idRecinto,
      titulo: eventoCultural.value.titulo,
      artistaPrincipal: eventoCultural.value.artistaPrincipal,
      duracionMinutos: eventoCultural.value.duracionMinutos,
      precioEntrada: eventoCultural.value.precioEntrada,
      fechaEvento: eventoCultural.value.fechaEvento
        ? eventoCultural.value.fechaEvento.toISOString()
        : null,
      estado: eventoCultural.value.estado,
      categoriaEvento: eventoCultural.value.categoriaEvento,
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${eventoCultural.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    eventoCultural.value = {} as EventoCultural
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error desconocido al guardar el evento cultural.')
  }
}

// --- Lógica de Inicialización al Abrir ---

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerRecintos()

      if (!props.eventoCultural?.id) {
        eventoCultural.value = {
          id: 0,
          idRecinto: 0,
          titulo: '',
          artistaPrincipal: '',
          duracionMinutos: 1,
          precioEntrada: 0,
          fechaEvento: new Date(),
          estado: 'Programado',
          categoriaEvento: 'Concierto',
          recinto: {} as Recinto,
        } as EventoCultural
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="card flex justify-content-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Evento Cultural' : 'Crear Evento Cultural'"
      style="width: 35rem"
      modal
    >
      <div class="p-fluid">
        <div class="field mb-4">
          <label for="recinto" class="font-semibold w-full">Recinto</label>
          <Select
            id="recinto"
            v-model="eventoCultural.idRecinto"
            :options="recintos"
            optionLabel="nombre"
            optionValue="id"
            class="w-full"
            placeholder="Seleccione un Recinto"
            required
            autofocus
          />
        </div>

        <div class="field mb-4">
          <label for="titulo" class="font-semibold w-full">Título del Evento</label>
          <InputText
            id="titulo"
            v-model="eventoCultural.titulo"
            class="w-full"
            autocomplete="off"
            maxlength="100"
            required
          />
        </div>

        <div class="field mb-4">
          <label for="artistaPrincipal" class="font-semibold w-full">Artista Principal</label>
          <InputText
            id="artistaPrincipal"
            v-model="eventoCultural.artistaPrincipal"
            class="w-full"
            autocomplete="off"
            maxlength="100"
            required
          />
        </div>

        <div class="field mb-4">
          <label for="duracionMinutos" class="font-semibold w-full">Duración (Minutos)</label>
          <InputNumber
            id="duracionMinutos"
            v-model="eventoCultural.duracionMinutos"
            mode="decimal"
            :min="1"
            :max="9999"
            showButtons
            required
          />
        </div>

        <div class="field mb-4">
          <label for="precioEntrada" class="font-semibold w-full">Precio de Entrada</label>
          <InputNumber
            id="precioEntrada"
            v-model="eventoCultural.precioEntrada"
            mode="currency"
            currency="BOB"
            locale="es-BO"
            :min="0"
            :maxFractionDigits="2"
            required
          />
        </div>

        <div class="field mb-4">
          <label for="fechaEvento" class="font-semibold w-full">Fecha del Evento</label>
          <DatePicker
            id="fechaEvento"
            v-model="eventoCultural.fechaEvento"
            dateFormat="dd/mm/yy"
            showIcon
            required
          />
        </div>

        <div class="field mb-4">
          <label for="estado" class="font-semibold w-full">Estado</label>
          <Select
            id="estado"
            v-model="eventoCultural.estado"
            :options="ESTADOS_EVENTO"
            class="w-full"
            placeholder="Seleccione el estado"
            required
          />
        </div>

        <div class="field mb-4">
          <label for="categoriaEvento" class="font-semibold w-full">Categoría del Evento</label>
          <Select
            id="categoriaEvento"
            v-model="eventoCultural.categoriaEvento"
            :options="CATEGORIAS_EVENTO"
            class="w-full"
            placeholder="Seleccione la categoría"
            required
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-content-end gap-2">
          <Button
            type="button"
            label="Cancelar"
            icon="pi pi-times"
            severity="secondary"
            @click="dialogVisible = false"
          ></Button>
          <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 1.5rem;
}
.p-fluid .field > label {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
