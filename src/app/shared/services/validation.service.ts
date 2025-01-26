import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private validateFnSubject = new BehaviorSubject<() => Promise<[boolean, boolean | null]>>(() => Promise.resolve([true, null]));
  validateFn$ = this.validateFnSubject.asObservable();

  setValidateFn(fn: () => Promise<[boolean, boolean | null]>): void {
    this.validateFnSubject.next(fn);
  }
}
