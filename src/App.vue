<template>
  <div id="app">
    <h1>Pomodoro Timer</h1>
    <base-timer :timer="selectedTimer" :key="selectedTimer.id" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseTimer from "@/components/BaseTimer.vue";
import timers from "@/store/modules/Timer";
import { Timer } from "@/types/types";

@Component({
  components: {
    BaseTimer
  }
})
export default class App extends Vue {
  get allTimers(): Timer[] {
    return timers.allTimers;
  }

  get selectedTimer(): Timer {
    return timers.selectedTimer;
  }

  public created() {
    timers.fetchTimers();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
