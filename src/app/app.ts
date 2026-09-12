import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidenavbar } from './pages/students-list/sidenavbar/sidenavbar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidenavbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
