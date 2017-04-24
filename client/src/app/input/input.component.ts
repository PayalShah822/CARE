import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { InputService} from '../services/input.service';
import { ManageRecordsService} from '../services/manage-records.service';

@Component({
  selector: 'app-input',
  providers: [InputService,ManageRecordsService],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  inList = "";
  exList = "";
  inArray = Array<string>();
  exArray = Array<string>();

  constructor(private inputService: InputService,private manageRecordsService: ManageRecordsService, private router: Router) {
    //this.manageRecordsService.getUpdate().subscribe(data => {});
  }

  ngOnInit() {
  }

  clear() {
    this.inList = "";
    this.exList = "";
    this.inArray = [];
    this.exArray = [];
  }

  updateTerm(value: string, a: boolean, i: number) {
    if(a === true) {
      this.inList = "";
      let tempArray = Array<string>();
      tempArray[i] = value;
      for(let j = 0; j < i; j++) {
          tempArray[j] = this.inArray[j];
      }
      for(let j = i+1; j < this.inArray.length; j++) {
          tempArray[j] = this.inArray[j];
      }
      this.inArray = tempArray;
      let k = 0;
      while(k < this.inArray.length) {
          if(this.inList === "") {
              this.inList = this.inArray[k];
          }
          else {
              this.inList = this.inList + ', ' + this.inArray[k];
          }
          k++;
      }
    }
    else {
      this.exList = "";
      let tempArray = Array<string>();
      tempArray[i] = value;
      for(let j = 0; j < i; j++) {
          tempArray[j] = this.exArray[j];
      }
      for(let j = i+1; j < this.exArray.length; j++) {
          tempArray[j] = this.exArray[j];
      }
      this.exArray = tempArray;
      let k = 0;
      while(k < this.exArray.length) {
          if(this.exList === "") {
              this.exList = this.exArray[k];
          }
          else {
              this.exList = this.exList + ', ' + this.exArray[k];
          }
          k++;
      }
    }

  }

  removeTerm(value: string, j: boolean) {
    if(j === true) {
      let i = this.inArray.indexOf(value);
      if(i!=-1) {
          this.inArray.splice(i, 1);
      }
      if(this.inArray === undefined || this.inArray.length == 0) {
          this.inList = "";
      }
      else {
          this.inList = "";
          for(let i of this.inArray) {
              if(this.inList === "") {
                  this.inList = i;
              }
              else {
                  this.inList = this.inList + ', ' + i;
              }
          }
      }
    }
    else {
      let i = this.exArray.indexOf(value);
      if(i!=-1) {
          this.exArray.splice(i, 1);
      }
      if(this.exArray === undefined || this.exArray.length == 0) {
          this.exList = "";
      }
      else {
          this.exList = "";
          for(let i of this.exArray) {
              if(this.exList === "") {
                  this.exList = i;
              }
              else {
                  this.exList = this.exList + ', ' + i;
              }
          }
      }
    }
  }

  addTerm(value: string, j: boolean) {
    if(j === true) {
      console.log("Add to inclusion: " + value);
      let splitArray = value.split(/\s*,\s*/);
      for(let i = 0; i<splitArray.length; i++) {
          if(!splitArray[i] || (splitArray[i].match(/^[\s]*$/) != null)) {
              this.inList = this.inList;
          }
          else if(splitArray[i] && this.inList === "") {
              this.inArray.push(splitArray[i]); 
              this.inList = splitArray[i];
          }
          else {
              this.inArray.push(splitArray[i]);
              this.inList = this.inList + ', ' + splitArray[i];
          }
      }
    }
    else {
      console.log("Add to exclusion: " + value);
      let splitArray = value.split(/\s*,\s*/);
      for(let i = 0; i < splitArray.length; i++) {
          if(!splitArray[i] || (splitArray[i].match(/^[\s]*$/) != null)) {
              this.exList = this.exList;
          }
          else if(splitArray[i] && this.exList === "") {
              this.exArray.push(splitArray[i]); 
              this.exList = splitArray[i];
          }
          else {
              this.exArray.push(splitArray[i]);
              this.exList = this.exList + ', ' + splitArray[i];
          }
      }
    }
  }

  submit(a: any, b: any) {
    this.inputService.getInput(a,b).subscribe(data => {
       this.router.navigateByUrl("/records");
    });
   
  }
}
