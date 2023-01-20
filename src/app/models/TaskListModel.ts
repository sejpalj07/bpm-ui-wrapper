import { CamundaVariables } from "./CamundaVariables";

export class TaskListModel {
  checkSelect: boolean = false;
  priority: string = "";
  taskTitle: string = "";
  taskDef: string="";
  dueDate: string = "";
  ownerName: string = "";
  taskCreatedTime: string = "";
  postStatus: string="";
  groupName: string="";
  taskId: string="";
  camundaVariables = new Array<CamundaVariables>(); 
  camundaUser: String="";
  }
