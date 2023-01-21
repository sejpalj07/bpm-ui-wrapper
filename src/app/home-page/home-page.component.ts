import { Component, EventEmitter, Injectable, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProcessDefinationModel } from '../models/ProcessDefinationModel';
import { ProcessDefinationServiceService } from '../process-defination-service.service';
import { TaskService } from '../Task-service.service';
import { TaskListModel } from '../models/TaskListModel';
import { CamundaVariables } from '../models/CamundaVariables';
import { Call, ReadVarExpr, ThisReceiver } from '@angular/compiler';
import { Data, Router } from '@angular/router';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient,HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { FormControl, NgForm } from '@angular/forms';
import { MatTableDataSourcePaginator } from '@angular/material/table';
import { CamundaDialogueModelComponent } from '../camunda-dialogue-model/camunda-dialogue-model.component';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../DataService';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
}
)

export class HomePageComponent implements OnInit {

  // @Output() msgToSibling = new EventEmitter<any>()
  source:any
  dataSource: any
  taskSource: any
  groupSource: any
  currentGroupName: any
  UserGroupName: Array<String>=[]
  approvalStatus:string="";
  private ApprovalMsg: string[] = [];
  lastIndexApprovalMsg:string="";
  find: boolean=false;
  IsTaskList: boolean=true;
  b: boolean=false;
  isTaskList : boolean=false;
  msg: String="";
  postStatus: String="";
  postRequestMsg: String="";
  displayedColumns = ['definitionId', 'definitionKey', 'name', 'version', 'versionTag','startProcess'];
  displayNoSignUp: any
  username: any

  

  constructor(private processDefinationService: ProcessDefinationServiceService,public dialog: MatDialog, private router: Router,private TaskService:TaskService,private http: HttpClient,private DataService:DataService,private cookie:CookieService) {
    
  }


  TaskList(){
    this.displayedColumns=['checkSelect','taskTitle', 'taskCreatedTime', 'camundaUser','groupName','priority','unclaim','claim','getTask'];
    this.IsTaskList=false;
    this.b=false;
   
  }
 ProcessList(){
  this.displayedColumns=['definitionId', 'definitionKey', 'name', 'version', 'versionTag','startProcess'];
  this.IsTaskList=true;
  this.b=false;
 }
  
  ngOnInit() {
  
   this.postRequestMsg=""
   this.username=this.cookie.get("username");
   this.postRequestMsg="{\"camundaUser\": \""+this.username+"\"}";
    this.TaskService.getTaskList(this.postRequestMsg).subscribe(res => {
        this.taskSource = new MatTableDataSource(res);
        console.log(this.taskSource);
    });
    this.source=this.taskSource;
    this.processDefinationService.getProcessDefinations().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      console.log(this.dataSource);
    });
    this.TaskService.getGroupTaskList(this.postRequestMsg).subscribe(res=> {
      this.groupSource=new MatTableDataSource(res);
      res.forEach(val=>{
        if(this.UserGroupName.indexOf(val.groupName)== -1)
        this.UserGroupName.push(val.groupName)
      })
      console.log(this.groupSource);
    })
  }
 
  applyFilter(event: Event) {
    if(this.IsTaskList==true){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    else{
      const filterValue = (event.target as HTMLInputElement).value;
      this.taskSource.filter = filterValue.trim().toLowerCase();
    }
  }

  getProcessdefinition(definitionId: string) {
    this.processDefinationService.getProcessDefinations().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
   
  }

  getTaskList(){
    this.isTaskList=true;
    this.postRequestMsg=""
    this.postRequestMsg="{\"camundaUser\": \""+this.username+"\"}";
    this.displayedColumns=['checkSelect','taskTitle', 'taskCreatedTime', 'camundaUser','priority','unclaim','getTask'];
    this.TaskService.getTaskList(this.postRequestMsg).subscribe(res =>{
      this.taskSource=new MatTableDataSource(res);
    })
    this.source=this.taskSource;
  }

  groupTaskFilter(){ 
    const filterValue=this.currentGroupName;
    this.source.filter = filterValue.trim().toLowerCase();
  }

  getGroupTaskList(){
    this.currentGroupName="";
    this.isTaskList=false;
    this.postRequestMsg=""
    this.postRequestMsg="{\"camundaUser\": \""+this.username+"\"}";
    this.displayedColumns=['taskTitle', 'taskCreatedTime','groupName','priority','claim'];
    this.TaskService.getGroupTaskList(this.postRequestMsg).subscribe(res=>{
      this.groupSource=new MatTableDataSource(res);
      res.forEach(val=>{
        if(this.UserGroupName.indexOf(val.groupName)== -1)
        this.UserGroupName.push(val.groupName)
      })
    })

    this.source=this.groupSource;
    
  }


  getDecisionDefinition(definitionId: string) {
    this.processDefinationService.getDecisionDefinition().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
    this.b=false;
  }

  Approve(){
    this.approvalStatus="approved";
  }
  Reject(){
    this.approvalStatus="rejected";
  }

  completeTask(){
    this.postRequestMsg="";
    this.postRequestMsg= this.postRequestMsg+"[";
    this.ApprovalMsg.forEach(element => {
      this.postRequestMsg=this.postRequestMsg+element.toString();
     console.log(element.indexOf(this.lastIndexApprovalMsg));
     if(element.toString()!=this.lastIndexApprovalMsg)
      this.postRequestMsg=this.postRequestMsg+',';
        }); 
    this.postRequestMsg=this.postRequestMsg+"]";
    
    console.log(this.postRequestMsg+" "+this.approvalStatus);
    //call the service
    if(this.postRequestMsg!=null){
    this.TaskService.completeTask(this.postRequestMsg,this.approvalStatus).subscribe(res=>{
      alert(res.postStatus);
      this.postStatus=res.postStatus;
    });
    this.getTaskList;
     console.log(this.postStatus);
    this.ApprovalMsg=[]
    
  
  }
  this.cookie.set("a",this.IsTaskList?"true":"false")
  window.location.reload();
  }
  
  claim(taskid:any){
    this.postRequestMsg="{\"taskId\":\""+taskid+"\",\"camundaUser\":\""+this.username+"\"}";
    this.TaskService.claim(this.postRequestMsg).subscribe(res=>{
      alert(res.postStatus);
      this.getTaskList();
      this.getGroupTaskList();
    })
    this.getGroupTaskList();
    window.location.reload();
  }

  unclaim(taskid:any){
    this.postRequestMsg="{\"taskId\":\""+taskid+"\",\"camundaUser\":"+null+"}";
    this.TaskService.claim(this.postRequestMsg).subscribe(res=>{
      alert(res.postStatus);
      this.getTaskList();
      this.getGroupTaskList();
    })
    this.getTaskList();
    window.location.reload();
  }
 

  getRecord(definitionId: string) {
    alert(definitionId);
  }

  //call model dialogur box
  getRecord1(taskid:any,e: any,e1:any,msg:any){
       console.log(taskid);
    this.DataService.setProduct(e);
     e1.target.checked=true;
     this.GetSelected(e1,taskid,msg);
     this.DataService.setApprovalTaskDetail(this.ApprovalMsg);
    const dialogRef = this.dialog.open(CamundaDialogueModelComponent, {
        width: '60%',
      });
      
      this.b=false
      this.ApprovalMsg=[]
  }


  GetSelected(e:any,taskid:any,msg:any){
    msg=""
   this.find=false;
   const status=  e.target.checked;
   this.lastIndexApprovalMsg="";
   msg="{\"taskId\""+":"+"\""+taskid+"\""+"}";
   const index: number = this.ApprovalMsg.indexOf(msg);
   if (index !== -1)
   this.find=true;

   if(this.ApprovalMsg==null)
   this.find=false;

   this.lastIndexApprovalMsg=msg;

   if(status)
   {
   if(this.find==false)
   this.ApprovalMsg.push(msg);
   this.find=false;
   }
   else{
    if (index !== -1) {
        this.ApprovalMsg.splice(index, 1);
    }      
   }
   if(this.ApprovalMsg.length>1)
   this.b=true;
   else
   this.b=false;
   console.log(this.ApprovalMsg);
  }

}





