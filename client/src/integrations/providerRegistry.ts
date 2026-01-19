import { ProviderType, ProviderStub } from "./types";

class ProviderRegistry {
  private providers: Map<ProviderType, ProviderStub> = new Map();

  register(type: ProviderType, provider: ProviderStub) {
    this.providers.set(type, provider);
  }

  get(type: ProviderType): ProviderStub | undefined {
    return this.providers.get(type);
  }
}

export const providerRegistry = new ProviderRegistry();

// Register Stubs
const createStub = (name: string): ProviderStub => ({
  connect: async () => { console.log(`Connecting to ${name}...`); return true; },
  disconnect: async () => { console.log(`Disconnecting from ${name}...`); return true; },
  sync: async () => { console.log(`Syncing with ${name}...`); }
});

providerRegistry.register('SQUARE', createStub('Square'));
providerRegistry.register('TOAST', createStub('Toast'));
providerRegistry.register('CLOVER', createStub('Clover'));
providerRegistry.register('LIGHTSPEED', createStub('Lightspeed'));
