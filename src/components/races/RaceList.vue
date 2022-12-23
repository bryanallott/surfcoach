<script setup lang="ts">
import { RaceModel } from "@/models/RaceModel";
import RaceItem from "./RaceItem.vue";
import { useRacesStore } from '@/stores/races';
import EntryList from "../entries/EntryList.vue";
const raceStore = useRacesStore();
raceStore.getRaces();
raceStore.getEntries();

/*
defineProps<{
  //races: raceStore.getRaces();
}>();
*/

</script>

<template>
  <div class="row">
    <div class="col-2">id</div>
    <div class="col-4">name</div>
    <div class="col-6"></div>
  </div>
  <div v-for="item in raceStore.raceList" :key="item.id">
    <RaceItem :race="item" />
    <EntryList :edit="false" :race="item" v-if="!item.deleted" />
  </div>
</template>
