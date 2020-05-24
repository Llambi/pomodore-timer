import { Timer } from "@/types/types";
import { db } from "../repositories/firestore";
export class TimerService {
  private db = db;
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
  public getAlltimers(): Timer[] {
    const timers: Timer[] = [];
    this.db
      .collection("/users")
      .doc("ckhHAlUdAbe6u60Pf803")
      .collection("/timers")
      .orderBy("order")
      .onSnapshot(observer => {
        observer.docs.forEach(doc => {
          timers.push({
            id: doc.id,
            timeLimit: doc.data().timeLimit * 60, // Convert to minutes
            timePassed: 0
          });
        });
      });
    return timers;
  }
}
