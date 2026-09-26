import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface AdminProfile {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
}

/** Keeps the UI and route guards in sync with the persisted login state. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'loginSuccess';
  private readonly profileStorageKey = 'adminProfile';

  readonly isAuthenticated = signal(this.readPersistedLogin());
  readonly profile = signal(this.readPersistedProfile());

  signIn(profile: AdminProfile): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, '1');
      // Keep only display fields; credentials must never be stored with the profile snapshot.
      localStorage.setItem(this.profileStorageKey, JSON.stringify(profile));
    }
    this.profile.set(profile);
    this.isAuthenticated.set(true);
  }

  signOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.profileStorageKey);
    }
    this.profile.set(null);
    this.isAuthenticated.set(false);
  }

  private readPersistedLogin(): boolean {
    return isPlatformBrowser(this.platformId) && localStorage.getItem(this.storageKey) === '1';
  }

  private readPersistedProfile(): AdminProfile | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    try {
      const profile = localStorage.getItem(this.profileStorageKey);
      return profile ? JSON.parse(profile) as AdminProfile : null;
    } catch {
      return null;
    }
  }
}
