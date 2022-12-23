<script setup lang="ts">
import { EntryModel } from "@/models/EntryModel";
import EntryItem from "./EntryItem.vue";
import { useRacesStore } from '@/stores/races';
import { RaceModel } from "@/models/RaceModel";
import ResultItem from "./ResultItem.vue";
import EntryCreate from "./EntryCreate.vue";
const raceStore = useRacesStore();
raceStore.getEntries();

defineProps<{
  edit: boolean;
  race?: RaceModel;
}>();

function saveEntry(newvalue: string): void {
  let id = raceStore.entryList.length;
  raceStore.entryList.push({
      id: raceStore.entryList.length+1,
      name: newvalue,
      deleted: false,
  });
}


function unDeleteEntry(id: number): void {
  let selectedEntry = raceStore.entryList.find((e) => e.id === id);
  if(null != selectedEntry) {
    
  }
}

function deleteEntry(id: number): void {
  let selectedEntry = raceStore.entryList.find((e) => e.id === id);
  if(null != selectedEntry) {
    
  }
}
function updateEntry(id: number, newvalue: string): void {
  let selectedEntry = raceStore.entryList.find((e) => e.id === id);
  if(null != selectedEntry) {
    selectedEntry.name= newvalue;
  }
}


function updateResult(entryid: number, raceid:number, now:number): void {
  let selectedResult = raceStore.resultList.find((e) => e.entryid === entryid && e.raceid == raceid);
  if(null != selectedResult) {
    selectedResult.stopped = now;
  }
}

function clearResult(entryid: number, raceid:number): void {
  let selectedResult = raceStore.resultList.find((e) => e.entryid === entryid && e.raceid == raceid);
  if(null != selectedResult) {
    selectedResult.stopped = 0;
  }
}

//const post = await fetch(`/api/post/1`).then((r) => r.json())

</script>

<template>
  <div class="row" v-if="edit">
    <div class="col-3">Add new entry</div>
    <div class="col-5"><EntryCreate @addEntry="saveEntry" /></div>
    <div class="col-4"></div>
  </div>
  <div class="row">
    <div class="col-2">id</div>
    <div class="col-4">name</div>
    <div class="col-6"></div>
  </div>
  
  <div v-for="item in raceStore.entryList" 
        :key="item.id">
        
    <EntryItem v-if="edit" :entry="item" 
        v-on:updateEntry="updateEntry" 
        v-on:deleteItem="deleteEntry"
        v-on:unDeleteItem="unDeleteEntry" />

    <ResultItem v-if="!edit" :entry="item" :race="race"
        v-on:updateResult="updateResult" 
        v-on:clearResult="clearResult" />

</div>
</template>
