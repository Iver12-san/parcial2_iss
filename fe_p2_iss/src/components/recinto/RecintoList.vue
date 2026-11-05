<script setup lang="ts">
import type { Recinto } from '@/models/recinto'
import http from '@/plugins/axios'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'recintos'
const recintos = ref<Recinto[]>([])
const busqueda = ref<string>('')
const recintoDelete = ref<Recinto | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const emit = defineEmits(['edit'])

const recintosFiltrados = computed(() => {
  return recintos.value.filter(
    (recinto) =>
      recinto.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      recinto.ciudad.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

async function obtenerLista() {
  recintos.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(recinto: Recinto) {
  emit('edit', recinto)
}

function mostrarEliminarConfirm(recinto: Recinto) {
  recintoDelete.value = recinto
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${recintoDelete.value?.id}`)
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
    <InputGroup>
      <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
      <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre o nacionalidad" />
    </InputGroup>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Ciudad</th>
          <th>Aforo Máximo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(recinto, index) in recintosFiltrados" :key="recinto.id">
          <td>{{ index + 1 }}</td>
          <td>{{ recinto.nombre }}</td>
          <td>{{ recinto.ciudad }}</td>
          <td>{{ recinto.aforoMaximo }}</td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(recinto)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(recinto)"
            />
          </td>
        </tr>
        <tr v-if="recintosFiltrados.length === 0">
          <td colspan="4">No se encontraron resultados</td>
        </tr>
      </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
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
