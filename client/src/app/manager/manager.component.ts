import { Component, OnInit, ChangeDetectorRef, Pipe } from '@angular/core';
import { ManageRecordsService, Record, EllipsisPipe } from '../services/manage-records.service';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
/*have to delete and edit each record individually -> in future you could fill each out or select multiple and
  then delete or edit. Also, right now you can't cancel once you start editing. Do something for that. Also need
  to fix that if you click edit for multiple rows, changes all the values. */


@Component({
  selector: 'app-manager',
  providers: [ManageRecordsService],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  recordsArray: Record[];
  recordForm: FormGroup;
  editForm: FormGroup;
  editing = false;
  formerName: string;
  formerContent: string;
  formerGrade: number;

  constructor(private manageRecordsService: ManageRecordsService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.recordForm = fb.group({
      'name': [null, Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],
      'content': [null, Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])]
    }),
    this.editForm = fb.group({
      'editName': [null, Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],
      'editContent': [null, Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])]
    })
  }

  ngOnInit() {
    this.getRecords();
  }

  getRecords() {
    this.manageRecordsService.getRecords()
      .subscribe(
        records => {
          this.recordsArray = records;
          this.recordsArray = this.recordsArray.sort((a:any, b:any) => b.grade - a.grade);
        },
        err => {console.log(err);})
  }

  edit(record: Record) {
    if(this.editing === false) {
      record.editMode = !record.editMode;
      this.editing = true;
      this.formerName = record.name;
      this.formerContent = record.content;
      this.formerGrade = record.grade;
      this.cdr.detectChanges();
    }
  }

  cancel(record: Record, i: number) {
    this.recordsArray[i] = new Record(this.formerName, this.formerContent, this.formerGrade);
    this.formerName = "";
    this.formerContent = "";
    this.formerGrade = 0;
    record.editMode = !record.editMode;
    this.editing = false;
    this.cdr.detectChanges();
  }

  submit(value: any) {
    this.manageRecordsService.addRecord(value).subscribe(data => {
      alert('The record has been submitted');
      location.reload();
    });
  }

  update(value: any, record: Record) {
    let newRecord = new Record(value.editName, value.editContent, 0);
    this.manageRecordsService.updateRecord(newRecord).subscribe(data => {
      console.log('The record has been updated');
      record.editMode = !record.editMode;
      this.editing = false;
      this.cdr.detectChanges();
    })
  }

  delete(record: Record) {
    this.manageRecordsService.deleteRecord(record).subscribe(data => {
      alert('The record has been deleted');
      location.reload();
    })
  }

  replaceAll(content: string) {
    return content.replace(/<br>|<mark>|<\/mark>/g, ' ');
  }

  updateRecords() {
    this.manageRecordsService.getUpdate().subscribe(data => {
    location.reload();
    })
  }

}
