<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputNumber, InputText } from 'primevue'
import type { Recinto } from '@/models/recinto'

const ENDPOINT = 'recintos'
const props = defineProps({
  mostrar: Boolean,
  recinto: {
    type: Object as () => Recinto,
    default: () => ({}) as Recinto,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])
const recinto = ref<Recinto>({ ...props.recinto })
watch(
  () => props.recinto,
  (newVal) => {
    recinto.value = { ...newVal }
  },
)

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

async function handleSave() {
  try {
    const body = {
      nombre: recinto.value.nombre,
      ciudad: recinto.value.ciudad,
      aforoMaximo: recinto.value.aforoMaximo,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${recinto.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    recinto.value = {} as Recinto
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="recinto.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="ciudad" class="font-semibold w-3">Ciudad</label>
        <InputText id="ciudad" v-model="recinto.ciudad" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="aforoMaximo" class="font-semibold w-3">Aforo Maximo</label>
        <InputNumber
          id="aforoMaximo"
          v-model="recinto.aforoMaximo"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
