import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidenavbar } from './pages/students-list/sidenavbar/sidenavbar';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidenavbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
  protected readonly auth = inject(AuthService);
}
