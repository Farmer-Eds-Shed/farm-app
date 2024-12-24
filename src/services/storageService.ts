// Code for storage service
import { Storage } from '@ionic/storage';

class StorageService {
  private store: Storage | null = null;

  constructor() {
    this.init();
  }

  async init() {
    const newStore = new Storage();
    this.store = await newStore.create();
  }

  async setItem(key: string, value: any) {
    await this.store?.set(key, value);
  }

  async getItem(key: string): Promise<any> {
    return await this.store?.get(key);
  }

  async removeItem(key: string) {
    await this.store?.remove(key);
  }
}

const storageService = new StorageService();
export default storageService;