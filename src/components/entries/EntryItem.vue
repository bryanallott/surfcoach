<script setup lang="ts">
import { EntryModel } from "@/models/EntryModel";

const emits = defineEmits< {
    (e: "deleteItem", id: number): void ,
    (e: "unDeleteItem", id: number): void ,
    (e: "updateEntry", id: number, newvalue: string): void }
>();

const updateEntry = (event: Event, id: number) => {
  const target = event.target as HTMLInputElement;
  emits("updateEntry", id, target.value);
};

const props = defineProps<{
  entry: EntryModel;
}>();


</script>

<template>
  <div class="row">
    <div class="col-2">{{ entry.id }}</div>
    <div class="col-4">
        <label v-if="entry.deleted" style="text-decoration:line-through">{{ entry.name }}</label>
        <input v-if="!entry.deleted" type="text" class="form-control" 
                :value="entry.name" 
                @change="updateEntry($event, entry.id)" />
    </div>
    <div class="col-6">
      <button type="button" class="btn btn-sm btn-info" 
        v-if="!entry.deleted"
        @click="entry.deleted = true; emits('deleteItem', entry.id)">
        <i class="fa fa-trash"></i>
      </button>
      <button type="button" class="btn btn-sm btn-warning" 
        v-if="entry.deleted"
        @click="entry.deleted = false; emits('unDeleteItem', entry.id)">
        <i class="fa fa-recycle"></i>
      </button>
    </div>
  </div>
</template>
