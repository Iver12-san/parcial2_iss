<script setup lang="ts">
import RecintoList from '@/components/recinto/RecintoList.vue'
import RecintoSave from '@/components/recinto/RecintoSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const recintoListRef = ref<typeof RecintoList | null>(null)
const recintoEdit = ref<any>(null)

function handleCreate() {
  recintoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(recinto: any) {
  recintoEdit.value = recinto
  mostrarDialog.value = true
}

function handleSave() {
  recintoListRef.value?.obtenerLista()
}

function handleCloseDialog() {
  mostrarDialog.value = false
}
</script>

<template>
  <section class="section" data-section="section6">
    <div class="container">
      <div class="row pt-6 mt-6">
        <div class="col-md-12">
          <h2>Recintos</h2>
          <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
          <RecintoList ref="recintoListRef" @edit="handleEdit" />
          <RecintoSave
            :mostrar="mostrarDialog"
            :recinto="recintoEdit"
            :modoEdicion="!!recintoEdit"
            @guardar="handleSave"
            @close="handleCloseDialog"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
