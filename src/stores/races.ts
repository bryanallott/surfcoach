import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { RaceModel } from "@/models/RaceModel";
import { EntryModel } from "@/models/EntryModel";
import { ResultModel } from "@/models/ResultModel";

export const useRacesStore = defineStore("races", {
    state: () => {
        return {
            loading: false,
            error: null as any,
            raceList: [] as RaceModel[],
            entryList: [] as EntryModel[],
            resultList: [] as ResultModel[],
        }
      },

      getters: {
        getRacesPerEntry: (state) => {
          return (entryid:number) => state.resultList.filter((result) => result.entry.id === entryid)
        },
        getEntriesPerRace: (state) => {
            return (raceid:number) => state.resultList.filter((result) => result.race.id === raceid)
        }
      }, 

      actions: {
        updateRaceName(id: NumberConstructor, value: string) {
            
        },
        
        async getRaces() {
            this.loading =  true;
            try {
                this.raceList = (await import("@/json/races.json")).default;
            } catch (error) {
                this.error = error
              } 
            finally {
                this.loading =  false;
            }
        },
        async getEntries() {
            if(0 === this.entryList.length) {
              this.loading =  true;
              try {
                this.entryList = (await import("@/json/entries.json")).default;
              }
              catch(error) {
                this.error = error;
              }
              finally {
                this.loading = false;
              }
            }
        },

        async getResults() {
          if(0 < this.resultList.length) {
            return;
          }
          this.loading = true;
          try {
            this.resultList = [];
            this.raceList.filter((race) => {
              this.entryList.filter((entry) => {
                var newResult:ResultModel = { 
                  id: this.resultList.length+1,
                  race: race,
                  entry: entry, 
                  started: 0, 
                  stopped: 0, 
                  action: ""};
                this.resultList.push(newResult);
              })
            })
          }
          catch(error) {
            this.error = error;
          }
          finally {
            this.loading = false;
          }
        }
      }
});
