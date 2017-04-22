import { Injectable, Pipe } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class InputService {

	constructor(private http: Http) { }

	getInput(incl: any, excl: any) {
		var url = 'http://localhost:4000/api/inclexcl';
		url = url + "?incl=" + incl + "&excl=" + excl; 
		return this.http.get(url).map((res:Response) => res.json());
  }


}