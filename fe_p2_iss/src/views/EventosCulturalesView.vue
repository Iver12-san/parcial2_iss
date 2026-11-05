<script setup lang="ts">
import EventosCulturalList from '@/components/eventos-cultural/Eventos-CulturalList.vue'
import EventosCulturalSave from '@/components/eventos-cultural/EventosCulturalSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const eventosCulturalListRef = ref<typeof EventosCulturalList | null>(null)
const eventosCulturalEdit = ref<any>(null)

function handleCreate() {
  eventosCulturalEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(eventoCultural: any) {
  eventosCulturalEdit.value = eventoCultural
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  eventosCulturalListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="mx-2 mt-6 md:m-7">
    <h2>Eventos Culturales</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <EventosCulturalList ref="eventosCulturalListRef" @edit="handleEdit" />
    <EventosCulturalSave
      :mostrar="mostrarDialog"
      :eventoCultural="eventosCulturalEdit"
      :modoEdicion="!!eventosCulturalEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
