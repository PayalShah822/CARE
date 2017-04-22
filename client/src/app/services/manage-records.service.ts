import { Injectable, Pipe } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ManageRecordsService {

  constructor(private http: Http) { }

  private url = 'http://localhost:4000/api/records';
  private updateUrl = 'http://localhost:4000/api/update';

  getUpdate() {
    return this.http.get(this.updateUrl)
      .map((res:Response) => res.json());
  }

  getRecords(): Observable<Record[]> {
    return this.http.get(this.url)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  addRecord(record: Record) {
    let bodyString = JSON.stringify(record);
    let headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(this.url, record)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  updateRecord(record: Record) {
    let bodyString = JSON.stringify(record);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(`${this.url}/${record.name}`, record)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));


  }

  deleteRecord(record: Record) {
    return this.http.delete(`${this.url}/${record.name}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

}

export class Record {
  constructor(public name: string, public content: string, public grade: number, public editMode?: boolean) {
    editMode = false;
  }
}

@Pipe({
    name: 'ellipsis'
})
export class EllipsisPipe {
  transform(val, args) {
    if (args === undefined) {
      return val;
    }
    if (val.length > args) {
      return val.substring(0, args) + '...';
    } else {
      return val;
    }
  }
}

