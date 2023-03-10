import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProcessDefinationModel } from '../models/ProcessDefinationModel';
import { ProcessDefinationServiceService } from '../process-defination-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  dataSource: any
  displayedColumns = ['definitionId', 'definitionKey', 'name', 'version', 'versionTag', 'startProcess'];
  displayNoSignUp: any

  constructor(private processDefinationService: ProcessDefinationServiceService, private router: Router) {
  }


  ngOnInit() {
    this.processDefinationService.getProcessDefinations().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProcessdefinition(definitionId: string) {
    this.processDefinationService.getProcessDefinations().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

  getDecisionDefinition(definitionId: string) {
    this.processDefinationService.getDecisionDefinition().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

  getRecord(definitionId: string) {
    alert(definitionId);
  }

}
