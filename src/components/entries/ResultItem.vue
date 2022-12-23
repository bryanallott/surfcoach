<script setup lang="ts">
import { EntryModel } from "@/models/EntryModel";
import { RaceModel } from "@/models/RaceModel";

const emits = defineEmits< {
    (e: "updateEntry", entryid: number, raceid: number, action:string): void }
>();

const props = defineProps<{
  entry: EntryModel;
  race?: RaceModel;
}>();

</script>

<template>
  <div class="row">
    <div class="col-2">{{ race?.name }}</div>
    <div class="col-2">
      <label v-if="entry.deleted" style="text-decoration:line-through">{{ entry.name }}</label>  
      <label v-if="!entry.deleted">{{ entry.name }}</label> 
    </div>
    <div class="col-4">

    </div>
    <div class="col-4">
      <button v-if="!entry.deleted" type="button" class="btn btn-sm btn-success" title="Save"
                :value="entry.name" 
                @click="emits('updateEntry', entry.id, race ? race.id : 0, 'ok')">
        <i class="fa fa-check"></i>
      </button>
      <button v-if="!entry.deleted" type="button" class="btn btn-sm btn-warning" title="DNF or DNS"
                :value="entry.name" 
                @click="emits('updateEntry', entry.id, race ? race.id : 0, 'ns')">
        <i class="fa fa-question"></i>
      </button>

      <button v-if="!entry.deleted" type="button" class="btn btn-sm btn-danger" title="DQ"
                :value="entry.name" 
                @click="emits('updateEntry', entry.id, race ? race.id : 0, 'dq')">
        <i class="fa fa-times"></i>
      </button>                
      <button v-if="!entry.deleted" type="button" class="btn btn-sm btn-info" title="Reset"
                :value="entry.name" 
                @click="emits('updateEntry', entry.id, race ? race.id : 0, 'reset')">
        <i class="fa fa-recycle"></i>
      </button>                
    </div>
  </div>
</template>
