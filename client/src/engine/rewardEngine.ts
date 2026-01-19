import { EventType } from "@/integrations/types";

// Mock Event Bus and Engine
export interface AppEvent {
  id: string;
  type: EventType;
  payload: any;
  createdAt: string;
}

const eventLog: AppEvent[] = [];

export function emitEvent(type: EventType, payload: any) {
  const event: AppEvent = {
    id: Math.random().toString(36).substr(2, 9),
    type,
    payload,
    createdAt: new Date().toISOString()
  };
  eventLog.push(event);
  console.log(`[EventBus] Emitted: ${type}`, payload);
  processLatestEvents();
}

function processLatestEvents() {
  // In a real app, this would be a worker or server-side logic
  // Here we just simulate checking rules
  console.log("[RewardEngine] Processing events...");
  
  const latest = eventLog[eventLog.length - 1];
  if (!latest) return;

  if (latest.type === 'CHECKIN') {
    checkMilestones(latest.payload);
  } else if (latest.type === 'TRAIL_COMPLETE') {
    unlockReward(latest.payload);
  }
}

function checkMilestones(payload: any) {
  // Logic to check if user hit 5 checkins, etc.
  console.log("[RewardEngine] Checking milestones for user", payload.userId);
}

function unlockReward(payload: any) {
  console.log("[RewardEngine] Unlocking reward for user", payload.userId);
}
