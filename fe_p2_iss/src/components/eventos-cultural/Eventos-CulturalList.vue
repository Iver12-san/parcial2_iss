<script setup lang="ts">
import type { EventoCultural } from '@/models/eventos-culturales'
import http from '@/plugins/axios'
import { Button, Column, DataTable, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'eventos-Culturales'
const eventosCulturales = ref<EventoCultural[]>([])
const eventosCulturalDelete = ref<EventoCultural | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')
const emit = defineEmits(['edit'])

const eventoCulturalFiltradas = computed(() => {
  return eventosCulturales.value.filter(
    (eventoCultural) =>
      eventoCultural.titulo.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      eventoCultural.recinto.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

async function obtenerLista() {
  eventosCulturales.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(eventoCultural: EventoCultural) {
  emit('edit', eventoCultural)
}

function mostrarEliminarConfirm(eventoCultural: EventoCultural) {
  eventosCulturalDelete.value = eventoCultural
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${eventosCulturalDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="col-7 pl-0 mt-3">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText
          v-model="busqueda"
          type="text"
          placeholder="Buscar por EventoCultural o nivel academico"
        />
      </InputGroup>
    </div>

    <table v-if="true">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Recinto</th>
          <th>Titulo</th>
          <th>Atista principal</th>
          <th>Duracion (minutos)</th>
          <th>Precio</th>
          <th>Fecha Evento</th>
          <th>Estado</th>
          <th>Categoria de Evento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(eventoCultural, index) in eventoCulturalFiltradas" :key="eventoCultural.id">
          <td>{{ index + 1 }}</td>
          <td>{{ eventoCultural.recinto?.nombre }}</td>
          <td>{{ eventoCultural.titulo }}</td>
          <td>{{ eventoCultural.artistaPrincipal }}</td>
          <td>{{ eventoCultural.duracionMinutos }}</td>
          <td>{{ eventoCultural.precioEntrada }}</td>
          <td>{{ eventoCultural.fechaEvento }}</td>
          <td>{{ eventoCultural.estado }}</td>
          <td>{{ eventoCultural.categoriaEvento }}</td>
          <td>
            <Button
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(eventoCultural)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(eventoCultural)"
            />
          </td>
        </tr>
        <tr v-if="eventoCulturalFiltradas.length === 0">
          <td colspan="7">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>
        ¿Estás seguro de que deseas eliminar el eventoCultural {{ eventosCulturalDelete?.titulo }}?
      </p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
