<script setup lang="ts">

let newValue:string = "New Entry";

const emits = defineEmits< {
    (e: "addEntry", newvalue: string): void }
>();

</script>

<template>
  <div class="row">
    <div class="col-10">
        <input type="text" class="form-control" required v-model="newValue" />
    </div>
    <div class="col-2">
      <button type="button" class="btn btn-sm btn-success" 
        @click="emits('addEntry', newValue)">
        <i class="fa fa-plus"></i>
      </button>
    </div>
  </div>
</template>
