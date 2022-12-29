<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFormattedTime } from '@/composables/formatTime'

const formatter = useFormattedTime();
const racestate = defineProps<{
    started:number;
    stopped:number;
    reset:boolean;
}>();

var timeElapsed = ref(0);
var timer:number = 0;

const displayTime = computed({
    get() {

        if(0 === racestate.started) {
            return '00:00:00.000';
        }

        if(0 === racestate.stopped) {
            if(0 === timer) {
                timer = setInterval(function() {
                    timeElapsed.value = Date.now() - racestate.started;
                }, 10);
            }
        } else {
            clearInterval(timer);
            timer = 0;
        } 

        timeElapsed.value = Date.now() - racestate.started;
        return formatter.formatTime(timeElapsed.value);
    },
    set(newValue) {
        //timeElapsed.value = Date.now() - racestate.started;
    }
})

 
</script>

<template>
    <span>{{ displayTime }}</span>
</template>