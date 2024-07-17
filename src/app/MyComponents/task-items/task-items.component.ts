import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../Task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-items.component.html',
  styleUrls: ['./task-items.component.css'],
})
export class TaskItemsComponent {
  @Input() task: Task = new Task(0, '', '', new Date(), 'low', 'to-do');
  @Output() deleteTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() updateTask: EventEmitter<Task> = new EventEmitter<Task>();

  editing: boolean = false;
  editedTask: Task = { ...this.task };

  onDeleteTask(task: Task) {
    this.deleteTask.emit(task);
  }

  onEdit() {
    this.editing = true;
    // Make a deep copy of the task for editing
    this.editedTask = { ...this.task };
  }

  onSave() {
    // Update the task with edited values
    this.task.title = this.editedTask.title;
    this.task.desc = this.editedTask.desc;
    this.task.dueDate = this.editedTask.dueDate;
    this.task.priority = this.editedTask.priority;
    this.task.status = this.editedTask.status;

    // Emit the updateTask event with the edited task
    this.updateTask.emit(this.editedTask);

    this.editing = false;
  }

  onCancel() {
    // Exit edit mode without saving changes
    this.editing = false;
  }

  isFormValid() {
    return (
      this.editedTask.title.trim() !== '' &&
      this.editedTask.desc.trim() !== '' &&
      this.editedTask.dueDate !== undefined &&
      this.editedTask.priority !== undefined &&
      this.editedTask.status !== undefined
    );
  }
}
