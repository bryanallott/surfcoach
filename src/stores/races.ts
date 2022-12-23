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
          return (entryid:number) => state.resultList.filter((result) => result.entryid === entryid)
        },
        getEntriesPerRace: (state) => {
            return (raceid:number) => state.resultList.filter((result) => result.raceid === raceid)
          }
      }, 

      actions: {
        updateRaceName(id: NumberConstructor, value: string) {
            
        },
        
        async getRaces() {
            this.loading =  false;
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
            this.entryList = (await import("@/json/entries.json")).default;
        },
        async getResults() {
            this.resultList = (await import("@/json/results.json")).default;
        }
      }
});
