import { Injectable } from '@angular/core';
import { AXHttpService } from '@acorex/core';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  constructor(private http: AXHttpService) { }

  getMockData(id: number = null) {
    if (id != null) {
      return this.http.get('https://jsonplaceholder.typicode.com/todos/' + id);
    } else {
      return this.http.get('https://jsonplaceholder.typicode.com/todos/');

    }
  }
}
