import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { ProcessDefinationModel } from './models/ProcessDefinationModel';
import { TaskListModel } from './models/TaskListModel';
import { HomePageComponent } from './home-page/home-page.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService{

  private serviceUrl = 'http://localhost:8080/request/list';
  myData: any;
  constructor(private http: HttpClient) { }

  getTaskList(requestbody:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let params= new HttpParams();
    const requestOptions = { headers: headers};
    return this.http.post<TaskListModel[]>('http://localhost:8080/custom/usertask',requestbody, requestOptions);
  }

  
  getGroupTaskList(requestbody:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let params= new HttpParams();
    const requestOptions = { headers: headers};
    return this.http.post<TaskListModel[]>('http://localhost:8080/custom/usergrouptask',requestbody,requestOptions);
  }

  completeTask(requestbody:any,approvalStatus:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let params= new HttpParams();
    params=params.append('approvalStatus',approvalStatus)
    const requestOptions = { headers: headers ,params: params};
    return this.http.post<any>('http://localhost:8080/custom/completetask',requestbody,requestOptions);
  }

  claim(requestbody:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let params= new HttpParams();
    const requestOptions = { headers: headers};
    return this.http.post<any>('http://localhost:8080/custom/claim',requestbody,requestOptions);
  }



}
