<template>
  <div class="base-timer">
    <svg
      class="base-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
        <path
          :stroke-dasharray="circleDasharray"
          :class="remainingPathColor"
          class="base-timer__path-remaining"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        />
      </g>
    </svg>
    <span class="base-timer__label">{{ formattedTimeLeft }}</span>
    <button @click="startTimer">Start</button>
    <button @click="resetTimer">Stop</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Timer } from "@/types/types";
import timers from "@/store/modules/Timer";
@Component
export default class BaseTimer extends Vue {
  private FULL_DASH_ARRAY = 283;
  private intervalId!: number;

  @Prop({ required: true }) readonly timer!: Timer;
  @Prop({ type: Number, default: 5 }) readonly alertThreshold!: number;
  @Prop({ type: Number, default: 10 }) readonly warningThreshold!: number;

  public startTimer(): void {
    this.intervalId = setInterval(() => (this.timer.timePassed += 1), 1000);
  }

  public resetTimer(): void {
    clearInterval(this.intervalId);
    this.timer.timePassed = 0;
  }

  get formattedTimeLeft(): string {
    if (this.timeLeft <= 0) return `00:00`;

    const timeLeft = this.timeLeft;

    const minutes = Math.floor(timeLeft / 60);

    const secondsNumber = timeLeft % 60;
    const seconds =
      secondsNumber < 10 ? `0${secondsNumber}` : `${secondsNumber}`;

    return `${minutes}:${seconds}`;
  }

  get timeLeft(): number {
    const timeLeft = this.timer.timeLimit - this.timer.timePassed;
    if (timeLeft < 0) {
      clearInterval(this.intervalId);
      timers.nextTimer();
    }
    return timeLeft;
  }

  get circleDasharray(): string {
    return `${(this.timeFraction * this.FULL_DASH_ARRAY).toFixed(0)} 283`;
  }

  get timeFraction() {
    const rawTimeFraction = this.timeLeft / this.timer.timeLimit;

    return rawTimeFraction - (1 / this.timer.timeLimit) * (1 - rawTimeFraction);
  }

  get colorCodes() {
    return {
      info: {
        color: "green"
      },
      warning: {
        color: "orange",
        threshold: this.warningThreshold
      },
      alert: {
        color: "red",
        threshold: this.alertThreshold
      }
    };
  }

  get remainingPathColor() {
    const { alert, warning, info } = this.colorCodes;
    if (this.timeLeft <= alert.threshold) {
      return alert.color;
    } else if (this.timeLeft <= warning.threshold) {
      return warning.color;
    } else {
      return info.color;
    }
  }
}
</script>

<style lang="scss" scoped>
/* Sets the containers height and width */
.base-timer {
  position: relative;
  width: 300px;
  height: 300px;
  /* Removes SVG styling that would hide the time label */
  &__circle {
    fill: none;
    stroke: none;
  }
  /* The SVG path that displays the timer's progress */
  &__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
  }

  &__label {
    position: absolute;

    /* Size should match the parent container */
    width: 300px;
    height: 300px;
    /* Keep the label aligned to the top */
    top: 0;
    /* Create a flexible box that centers content vertically and horizontally */
    display: flex;
    align-items: center;
    justify-content: center;
    /* Sort of an arbitrary number; adjust to your liking */
    font-size: xxx-large;
    font-weight: bold;
  }

  &__path-remaining {
    /* Just as thick as the original ring */
    stroke-width: 7px;
    /* Rounds the line endings to create a seamless circle */
    stroke-linecap: round;
    /* Makes sure the animation starts at the top of the circle */
    transform: rotate(90deg);
    transform-origin: center;
    /* One second aligns with the speed of the countdown timer */
    transition: 1s linear all;
    /* Allows the ring to change color when the color value updates */
    stroke: rgb(65, 184, 131); // green
  }

  &__svg {
    /* Flips the svg and makes the animation to move left-to-right */
    transform: scaleX(-1);
  }

  &__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;
    &.green {
      color: rgb(65, 184, 131);
    }
    &.orange {
      color: orange;
    }
    &.red {
      color: red;
    }
  }
}
</style>
