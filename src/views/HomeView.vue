<script setup lang="ts">
import RaceList from '@/components/races/RaceList.vue';
import EntryList from '@/components/entries/EntryList.vue';
</script>

<template>
  <main>
    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            Current Entries
          </div>
          <div class="card-body">
            <EntryList :edit="true" />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            Current Races
          </div>
          <div class="card-body">
            <RaceList />
          </div>
        </div>
      </div>
  </div>
  </main>
</template>
