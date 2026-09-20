import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidenavbar } from './pages/students-list/sidenavbar/sidenavbar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidenavbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  loginValue:any;
  protected readonly title = signal('frontend');
  userLogin:any;
 ngOnInit() {
  // debugger
   this.loginValue =  localStorage.getItem('loginSuccess');
 }
}
