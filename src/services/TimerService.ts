import { Timer } from "@/types/types";

export class TimerService {
  private dataTimers = [
    {
      id: 1,
      timeLimit: 25 * 60, // 25 minutes
      timePassed: 0
    },
    {
      id: 2,
      timeLimit: 5 * 60, // 5 minutes
      timePassed: 0
    }
  ];
  public getAlltimers(): Promise<Timer[]> {
    // Mock, WIP: Connect to firestore
    const timers = Promise.resolve(this.dataTimers);
    return timers;
  }
}
