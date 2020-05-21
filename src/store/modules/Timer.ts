import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import { Timer } from "@/types/types";
import store from "@/store";
import { TimerService } from "@/services/TimerService";
@Module({
  namespaced: true,
  name: "timers",
  store,
  dynamic: true
})
class TimerModule extends VuexModule {
  public allTimers: Timer[] = [];
  public posTimers = 0;
  public service: TimerService = new TimerService();

  get selectedTimer(): Timer {
    return this.allTimers[this.posTimers];
  }

  @Action({ commit: "setTimers" })
  public async fetchTimers() {
    const timers = await this.service.getAlltimers();
    return timers;
  }

  @Mutation
  public setTimers(p: Timer[]) {
    this.posTimers = 0;
    this.allTimers = p;
  }

  @Mutation
  public nextTimer() {
    this.allTimers.forEach(timer => (timer.timePassed = 0));
    this.posTimers++;
    if (this.posTimers >= this.allTimers.length) {
      this.posTimers = 0;
    }
  }
}

export default getModule(TimerModule);
