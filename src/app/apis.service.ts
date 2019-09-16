import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs"
@Injectable({
  providedIn: 'root'
})
export class ApisService {

  DATA_URL = "https://nut-case.s3.amazonaws.com/jobs.json"; // for test use "assets/jobs.json";
  jobs: Array<any> = [];
  constructor(private http: HttpClient) { }

  getJobsData(): Observable<any> {
    return this.http.get(this.DATA_URL);
  }
}
