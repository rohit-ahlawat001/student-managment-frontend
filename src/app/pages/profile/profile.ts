import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfilePage {
  private readonly auth = inject(AuthService);
  readonly profile = this.auth.profile;
  readonly displayName = computed(() => {
    const { firstName, lastName } = this.profile() ?? {};
    return [firstName, lastName].filter(Boolean).join(' ') || 'Administrator';
  });
  readonly initials = computed(() =>
    this.displayName()
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  );
}