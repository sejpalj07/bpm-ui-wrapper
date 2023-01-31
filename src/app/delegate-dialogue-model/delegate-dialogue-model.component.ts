import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CamundaVariables } from '../models/CamundaVariables';
import { TaskListModel } from '../models/TaskListModel';
import { TaskService } from '../Task-service.service';
import { HomePageComponent } from '../home-page/home-page.component';
import { DataService } from '../DataService';
import { ProcessDefinationServiceService } from '../process-defination-service.service';

@Component({
  selector: 'app-delegate-dialogue-model',
  templateUrl: './delegate-dialogue-model.component.html',
  styleUrls: ['./delegate-dialogue-model.component.css']
})
export class DelegateDialogueModelComponent implements OnInit{
  
  userdata:any;
  groupdata:any;
  currentUserName:any;
  currentGroupName:any;
  isUser:boolean=true;
  tasks:any;
  postRequestMsg: any;
  constructor(private router: Router,
    private TaskService: TaskService,
    public dialogRef: MatDialogRef<DelegateDialogueModelComponent>,
    private DataService: DataService) { }
   
  ngOnInit() {
    this.DataService.selectetasdata$.subscribe(res=>{
      this.tasks=res;
    })
     this.TaskService.getUsers().subscribe(res=>{
      this.userdata=res;
      console.log(this.userdata);
     })
     this.TaskService.getGroups().subscribe(res=>{
      this.groupdata=res;
      console.log(this.groupdata);
     })
  }
  delegateTouser() {
    console.log(this.tasks,this.currentUserName);
    this.TaskService.delegateTask(this.tasks,this.currentUserName,"user").subscribe(res => {
      alert(res.postStatus);
    })
    window.location.reload();
  }
  delegateToGroup() {
    this.TaskService.delegateTask(this.tasks,this.currentGroupName,"group").subscribe(res => {
      alert(res.postStatus);
    })
    window.location.reload();
  }
}
