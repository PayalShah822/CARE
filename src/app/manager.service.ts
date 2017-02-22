import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ManagerService {

  constructor(private http: Http) { }

  getRecords() {
    return Observable.forkJoin(
      this.http.get('/app/record-files/inRecords.json').map((res:Response) => res.json()),
      this.http.get('/app/record-files/exRecords.json').map((res:Response) => res.json())
      );
  }

}
