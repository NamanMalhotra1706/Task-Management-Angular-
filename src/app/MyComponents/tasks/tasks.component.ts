import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Task } from '../../Task';
import { TaskItemsComponent } from '../task-items/task-items.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AddTaskComponent } from '../add-task/add-task.component';
import { CsvExportService } from '../../services/csv-export.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule,TaskItemsComponent,AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})


export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private csvExportService: CsvExportService
  ) {}

  exportTasksToCsv() {
    if (this.tasks.length > 0) {
      this.csvExportService.exportToCsv(this.tasks);
    } else {
      // Handle case where there are no tasks to export
      console.log('No tasks to export.');
    }
  }

  sortTasks(criteria: 'dueDate' | 'priority' | 'status') {
    if (criteria === 'dueDate') {
      this.tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else if (criteria === 'priority') {
      const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
      this.tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (criteria === 'status') {
      const statusOrder = { 'to-do': 1, 'in-progress': 2, 'completed': 3 };
      this.tasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    }
    this.updateLocalStorage();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const localItem = localStorage.getItem("tasks");
      if (localItem) {
        this.tasks = JSON.parse(localItem);
      }
    } else {
      this.tasks = []; // Initialize tasks array as empty for non-browser environments
    }
  }

  onDeleteTask(task: Task) {
    console.log('Deleting task:', task);
    this.tasks = this.tasks.filter(t => t !== task);
    this.updateLocalStorage();
  }

  onAddTask(task: Task) {
    console.log("Task Added: ", task);
    this.tasks.push(task);
    this.updateLocalStorage();
  }
  
  onUpdateTask(updatedTask: Task) {
    console.log('Updating task:', updatedTask);
    // Find the index of the task in the array
    const index = this.tasks.findIndex(t => t.sNo === updatedTask.sNo);
    if (index !== -1) {
      // Update specific properties of the task
      this.tasks[index].title = updatedTask.title;
      this.tasks[index].desc = updatedTask.desc;
      this.tasks[index].dueDate = updatedTask.dueDate;
      this.tasks[index].priority = updatedTask.priority;
      this.tasks[index].status = updatedTask.status;
  
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  }
}