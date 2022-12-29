<script setup lang="ts">
import { RaceModel } from "@/models/RaceModel";
import StopWatch from "./StopWatch.vue";

const emits = defineEmits< {
    (e: "resetRace", id: number): void ,
    (e: "deleteRace", id: number): void,
    (e: "startRace", id: number): void,
    (e: "stopRace", id: number): void
}>();

defineProps<{
  race: RaceModel;
}>();

</script>

<template>
  <div class="row">
    <div class="col-2">{{ race.id }}</div>
    <div class="col-4">
      <span v-if="race.deleted" style="text-decoration: line-through;">
        {{ race.name }}
      </span>
      <span v-if="!race.deleted">
        {{ race.name }}
      </span>
    </div>
    <div class="col-2">

      <button type="button" class="btn btn-sm btn-danger"
        v-if="!race.deleted && 0 == race.started && 0 == race.stopped"
        @click="race.deleted = true; emits('deleteRace', race.id)">
          <i class="fa fa-trash"></i>
      </button>

      <button type="button" class="btn btn-sm btn-success" 
            v-if="!race.deleted && 0 == race.started"
            @click="race.started = Date.now(); emits('startRace', race.id)">
        <i class="fa fa-play"></i>
      </button>

      <button type="button" class="btn btn-sm btn-warning" 
            v-if="!race.deleted && 0 < race.started && 0 == race.stopped"
            @click="race.stopped = Date.now(); emits('stopRace', race.id)">
        <i class="fa fa-stop"></i>
      </button>

      <button type="button" class="btn btn-sm btn-info" 
        v-if="race.deleted || 0 < race.started || 0 < race.stopped"
        @click="race.deleted = false; race.started=0;race.stopped=0; emits('resetRace', race.id)">
          <i class="fa fa-recycle"></i>
      </button>

    </div>
    <div class="col-4">
      <StopWatch :started="race.started" :stopped="race.stopped" :reset="race.started == 0 && race.stopped == 0" />
    </div>
  </div>
</template>
