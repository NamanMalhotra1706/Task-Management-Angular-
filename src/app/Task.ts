export class Task {
  sNo: number;
  title: string;
  desc: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'to-do' | 'in-progress' | 'completed';

  constructor(sNo: number, title: string, desc: string, dueDate: Date, priority: string, status: string) {
    this.sNo = sNo;
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority as 'low' | 'medium' | 'high'; // Ensure type safety
    this.status = status as 'to-do' | 'in-progress' | 'completed'; // Ensure type safety
  }
}
