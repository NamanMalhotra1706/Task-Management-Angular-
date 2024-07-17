import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../Task';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent {

  @Output() addTask: EventEmitter<Task> = new EventEmitter<Task>();

  newTask: Task;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.newTask = this.initializeNewTask();
  }

  onSubmitTask() {
    this.addTask.emit(this.newTask);
    this.resetForm();
  }

  resetForm() {
    this.newTask = this.initializeNewTask();
  }

  isFormValid(): boolean {
    return !!this.newTask.title && !!this.newTask.desc && !!this.newTask.dueDate && !!this.newTask.priority;
  }

  private initializeNewTask(): Task {
    let sNo = 1; 
    if (isPlatformBrowser(this.platformId)) {
      let taskCounter = parseInt(localStorage.getItem('taskCounter') || '0', 10);
      sNo = taskCounter + 1;
      localStorage.setItem('taskCounter', sNo.toString());
    }

    return {
      sNo: sNo,
      title: '',
      desc: '',
      dueDate: new Date(),
      priority: 'low',
      status: 'to-do'
    };
  }
}
