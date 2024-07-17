import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksComponent } from './MyComponents/tasks/tasks.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TasksComponent,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TMS-CN';
}
