import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Keeps the UI and route guards in sync with the persisted login state. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'loginSuccess';

  readonly isAuthenticated = signal(this.readPersistedLogin());

  signIn(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, '1');
    }
    this.isAuthenticated.set(true);
  }

  signOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageKey);
    }
    this.isAuthenticated.set(false);
  }

  private readPersistedLogin(): boolean {
    return isPlatformBrowser(this.platformId) && localStorage.getItem(this.storageKey) === '1';
  }
}
