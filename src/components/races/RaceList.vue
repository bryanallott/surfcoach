<script setup lang="ts">
import { RaceModel } from "@/models/RaceModel";
import RaceItem from "./RaceItem.vue";
import { useRacesStore } from '@/stores/races';
import EntryList from "../entries/EntryList.vue";
const raceStore = useRacesStore();
raceStore.getRaces()
.then(() => {
    raceStore.getEntries().then(() => {
        raceStore.getResults();
    })
})



/*
defineProps<{
  //races: raceStore.getRaces();
}>();
*/

function handleStartRace(raceid:number) {
    let selectedRace = raceStore.raceList.find((e) => e.id === raceid);
    if(null != selectedRace) {
        raceStore.resultList.filter((result) => {
            if(result.race.id == raceid) {
                result.started = selectedRace?.started || 0;
                result.stopped = 0;
            }
        })
    }
}

function handleStopRace(raceid:number) {
    let selectedRace = raceStore.raceList.find((e) => e.id === raceid);
    if(null != selectedRace) {
        raceStore.resultList.filter((result) => {
            if(result.race.id == raceid && 0 == result.stopped) {
                result.stopped = selectedRace?.stopped || 0;
            }
        })
    }
}


function handleDeleteRace(raceid:number) {
    let selectedRace = raceStore.raceList.find((e) => e.id === raceid);
    if(null != selectedRace) {
        raceStore.resultList.filter((result) => {
            if(result.race.id == raceid && 0 == result.stopped) {
                result.started = 0;
                result.stopped = 0;
                result.action = '';
            }
        })
    }
}

function handleResetRace(raceid:number) {
    let selectedRace = raceStore.raceList.find((e) => e.id === raceid);
    if(null != selectedRace) {
        raceStore.resultList.filter((result) => {
            if(result.race.id == raceid && 0 == result.stopped) {
                result.started = 0;
                result.stopped = 0;
                result.action = '';
            }
        })
    }
}
</script>

<template>
  <div class="row">
    <div class="col-2">id</div>
    <div class="col-4">name</div>
    <div class="col-6"></div>
  </div>
  <div v-for="item in raceStore.raceList" :key="item.id">
    <RaceItem :race="item" 
                @delete-race="handleDeleteRace"
                @reset-race="handleResetRace"
                @start-race="handleStartRace" 
                @stop-race="handleStopRace" />
    <EntryList :edit="false" :race="item" v-if="!item.deleted" />
  </div>
</template>
