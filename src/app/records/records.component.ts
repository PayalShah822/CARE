import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { ManagerService} from '../manager.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit {

  public inRecords;
  public exRecords;
  public selectedRecord;

  constructor(private managerService: ManagerService) { }

  ngOnInit() {
    this.getRecords();
  }

  onSelect(inRecord: any) {
    this.selectedRecord = inRecord;
  }

  getRecords() {
    this.managerService.getRecords().subscribe(
      data => {
        this.inRecords = data[0],
        this.exRecords = data[1]
      }
    );
  }

}
