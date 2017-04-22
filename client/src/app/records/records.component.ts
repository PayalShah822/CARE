import { Component, OnInit } from '@angular/core';
import { ManageRecordsService, EllipsisPipe, Record } from '../services/manage-records.service';

@Component({
  selector: 'app-records',
  providers: [ManageRecordsService],
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  recordsArray: Record[];
  selectedRecord: Record;

  constructor(private manageRecordsService: ManageRecordsService) { }

  ngOnInit() {
    this.getRecords();
  }

  getRecords() {
    this.manageRecordsService.getRecords()
      .subscribe(
        records => {
          this.recordsArray = records;
          this.recordsArray = this.recordsArray.sort((a:any, b:any) => b.grade - a.grade);
          let i = 0;
          while(i < this.recordsArray.length) {
            if(this.recordsArray[i].grade === 0) {
              this.recordsArray.splice(i);
            }
            i++;
          }
        },
        err => {console.log(err);})
  }

  onSelect(record: Record) {
    this.selectedRecord = record;
  }

  replaceAll(content: string) {
    return content.replace(/<br>|<mark>|<\/mark>/g, ' ');
  }
}
