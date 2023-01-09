import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProcessDefinationModel } from '../models/ProcessDefinationModel';
import { ProcessDefinationServiceService } from '../process-defination-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  dataSource : any
  displayedColumns = ['definitionId', 'definitionKey', 'name', 'version', 'versionTag'];
  displayNoSignUp: any

  constructor(private processDefinationService: ProcessDefinationServiceService) {
  }

  showCard() {
    if (this.displayNoSignUp === true) {
      this.displayNoSignUp = false;
    }
    if (this.displayNoSignUp === false) {
      this.displayNoSignUp = true;
    }
  }

  ngOnInit() {
    this.processDefinationService.getProcessDefinations().subscribe(res => {
      console.log('Sample response from backend system' + res);
      this.dataSource = new MatTableDataSource(res);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
