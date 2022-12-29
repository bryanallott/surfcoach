<script setup lang="ts">
import { computed, ref } from 'vue'
import { EntryModel } from "@/models/EntryModel";
import { RaceModel } from "@/models/RaceModel";

import { useFormattedTime } from '@/composables/formatTime'
import { ResultModel } from '@/models/ResultModel';
const formatter = useFormattedTime();

const emits = defineEmits< {
    (e: "updateResult", entryid: number, raceid: number, action:string): void }
>();

const props = defineProps<{
  result: ResultModel
}>();

var timeElapsed = ref(0);

const displayTime = computed({
    get() {

        if(0 === props.result.race.started) {
            return '00:00:00.000';
        }

        if(0 < props.result.stopped) {
          return formatter.formatTime(props.result.stopped - props.result.started);
        }

        return "...";
    },
    set(newValue) {
        //timeElapsed.value = Date.now() - racestate.started;
    }
})

function handleStop(result: ResultModel, action:string) {
  result.stopped = Date.now();
  result.action = action;
  emits('updateResult', result.entry.id, result.race.id, action);
};

</script>

<template>
  <div class="row">
    <div class="col-2">{{ result.race.name }}</div>
    <div class="col-2">
      <label v-if="result.entry.deleted" style="text-decoration:line-through">{{ result.entry.name }}</label>  
      <label v-if="!result.entry.deleted">{{ result.entry.name }}</label> 
    </div>
    <div class="col-4">
      <span>{{ displayTime }}</span>
    </div>

    <div class="col-4">
      <span v-if="!result.entry.deleted && 0 < result.race.started && 0 < result.race.stopped">
          {{ result.action }}
      </span>
      <button v-if="!result.entry.deleted && result.race.started && !result.race.stopped" type="button" class="btn btn-sm btn-success" title="Save"
                :value="result.entry.name" 
                @click="handleStop(result, 'ok')">
        <i class="fa fa-check"></i>
      </button>
      <button v-if="!result.entry.deleted && result.race.started && !result.race.stopped" type="button" class="btn btn-sm btn-warning" title="DNF or DNS"
                :value="result.entry.name" 
                @click="handleStop(result, 'ns')">
        <i class="fa fa-question"></i>
      </button>

      <button v-if="!result.entry.deleted && result.race.started && !result.race.stopped" type="button" class="btn btn-sm btn-danger" title="DQ"
                :value="result.entry.name" 
                @click="handleStop(result, 'dq')">
        <i class="fa fa-times"></i>
      </button>                
      <button v-if="!result.entry.deleted && result.race.started && !result.race.stopped" type="button" class="btn btn-sm btn-info" title="Reset"
                :value="result.entry.name" 
                @click="handleStop(result, 'reset')">
        <i class="fa fa-recycle"></i>
      </button>                
    </div>
  </div>
</template>
