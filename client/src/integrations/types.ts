export type ProviderType = 'NONE' | 'SQUARE' | 'TOAST' | 'CLOVER' | 'LIGHTSPEED';
export type RewardSourceType = 'MANUAL' | 'POS_CODE' | 'POS_AUTOMATED';
export type EventType = 'CHECKIN' | 'TRAIL_COMPLETE' | 'MILESTONE' | 'POS_TRANSACTION' | 'POS_REDEMPTION';

export interface IntegrationConnection {
  id: string;
  provider: ProviderType;
  status: 'DISCONNECTED' | 'CONNECTED' | 'ERROR';
  lastSync?: string;
}

export interface ProviderStub {
  connect: () => Promise<boolean>;
  disconnect: () => Promise<boolean>;
  sync: () => Promise<void>;
}
