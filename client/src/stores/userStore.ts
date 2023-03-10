import { defineStore } from 'pinia';
import { toRaw, watch } from 'vue';

import openDatabase from '@/database';
import { preference } from '../types';

const db = await openDatabase();

const useUserStore = defineStore('useUserStore', {
  state: () => ({
    preferences: { id: 1, starredLocations: [] } as preference,
    online: true,
    showAnyway: false,
  }),

  actions: {
    async getPreferences(): Promise<preference | undefined> {
      const prefs = (await db.get('preferences', 1)) as preference;
      return prefs ?? undefined;
    },

    async savePreferences(): Promise<void> {
      if (!this.preferences) return;

      let updatedPrefs: preference;

      const oldPrefs = (await db.get('preferences', 1)) as preference;

      if (!oldPrefs) updatedPrefs = this.preferences;
      else updatedPrefs = { ...oldPrefs, ...this.preferences };
      updatedPrefs.starredLocations = toRaw(updatedPrefs.starredLocations);

      await db.put('preferences', toRaw(updatedPrefs));
    },

    savePrefsOnUpdate(): void {
      this.savePreferences();

      watch(this.preferences, () => {
        this.savePreferences();
      });
    },

    updateOnlineStatus(e: Event): void {
      this.online = e.type === 'online';
    },
  },
});

export default useUserStore;
