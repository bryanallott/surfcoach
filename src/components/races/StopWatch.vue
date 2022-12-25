<script setup lang="ts">
import { computed, ref } from 'vue'

const racestate = defineProps<{
    started:number;
    stopped:number;
    reset:boolean;
}>();

var timeElapsed = ref(0);
var timer:number = 0;

function zeroPrefix(num:number, digit:number) {
    var zero = '';
    for(var i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }


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
        var dt = new Date(timeElapsed.value);
        var hour = dt.getUTCHours()
            , min = dt.getUTCMinutes()
            , sec = dt.getUTCSeconds()
            , ms = dt.getUTCMilliseconds();
        
        return zeroPrefix(hour, 2) + ":" + 
            zeroPrefix(min, 2) + ":" + 
            zeroPrefix(sec, 2) + "." + 
            zeroPrefix(ms, 3);
    },
    set(newValue) {
        timeElapsed.value = Date.now() - racestate.started;
    }
})

 
</script>

<template>
    <span>{{ displayTime }}</span>
</template>