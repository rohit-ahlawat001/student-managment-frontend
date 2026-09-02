import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentsList } from './pages/students-list/students-list';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
