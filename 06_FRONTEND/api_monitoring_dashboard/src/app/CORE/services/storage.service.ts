import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private currentThemeSubject = new BehaviorSubject<string>(localStorage.getItem('currentTheme') || ''); // Initialize with theme from local storage if available
  currentTheme$: Observable<string> = this.currentThemeSubject.asObservable();

  constructor() {
    const storedTheme = localStorage.getItem('currentTheme');
    if (storedTheme) {
      this.currentThemeSubject.next(storedTheme);
    }
  }

  setData(data: string): void {
    this.currentThemeSubject.next(data);
    localStorage.setItem('currentTheme', data);
  }

  getData(): Observable<string> {
    return this.currentTheme$;
  }
}
