import { Injectable } from '@angular/core';
import { Task } from '../Task';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CsvExportService {

  constructor() { }

  exportToCsv(tasks: Task[]) {
    const csvData = Papa.unparse(tasks, {
      header: true
    });

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "tasks.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
