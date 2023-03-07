import { defineStore } from 'pinia';
import { toRaw } from 'vue';

import openDatabase from '@/database';
import { preference } from '../types';

const db = await openDatabase();

const useUserStore = defineStore('useUserStore', {
  state: () => ({
    preferences: { id: 1, starredLocations: [] } as preference,
  }),

  actions: {
    async getPreferences(): Promise<preference | undefined> {
      const prefs = (await db.get('preferences', 'userPreferences')) as preference;
      return prefs ?? undefined;
    },

    async savePreferences(): Promise<void> {
      if (!this.preferences) return;

      let updatedPrefs: preference;

      const oldPrefs = (await db.get('preferences', 1)) as preference;

      if (!oldPrefs) updatedPrefs = this.preferences;
      else updatedPrefs = { ...oldPrefs, ...this.preferences };

      // await db.put('preferences', toRaw(updatedPrefs), 1);
      console.log('ok');
    },

    savePrefsOnUpdate(): void {
      this.savePreferences();

      this.$subscribe(() => {
        this.savePreferences();
      });
    },
  },
});

export default useUserStore;
