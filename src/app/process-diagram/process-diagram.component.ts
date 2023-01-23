import { Component, Inject, OnInit } from '@angular/core';
import { ProcessDefinationServiceService } from '../process-defination-service.service';
declare let BpmnJS: any;
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-process-diagram',
  templateUrl: './process-diagram.component.html',
  styleUrls: ['./process-diagram.component.css']
})
export class ProcessDiagramComponent implements OnInit {

  bpmnXML: any;
  viewer: any;
  sub: any;

  constructor(private processDefinationService: ProcessDefinationServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    console.log(this.data);
    try {
      this.viewer = new BpmnJS({
        container: '#canvas'
      });
      this.processDefinationService.getProcessXMl(this.data.definitionId).subscribe(res => {
        this.viewer.importXML(res.xmlResponse);
        this.viewer.get('canvas').zoom('fit-viewport');
      });
    } catch (err) {
      console.log(err);
    }
  }
}
