import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {

  inList = "";
  exList = "";
  inArray = Array<string>();
  exArray = Array<string>();
  params = "";

  constructor( public http: Http ) {}

  ngOnInit() {
  }

  addTerm(newIn: string): void {
      let splitArray = newIn.split(/\s*,\s*/);
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

  addTerm2(newEx: string): void {
      let splitArray = newEx.split(/\s*,\s*/);
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

  updateTerm(currentIn: string, i: number): void {
      this.inList = "";
      let tempArray = Array<string>();
      tempArray[i] = currentIn;
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
  updateTerm2(currentEx: string, i: number): void {
      this.exList = "";
      let tempArray = Array<string>();
      tempArray[i] = currentEx;
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

  removeTerm(currentIn: string): void {
      let i = this.inArray.indexOf(currentIn);
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

  removeTerm2(currentEx: string): void {
      let i = this.exArray.indexOf(currentEx);
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

  removeAll(): void {
      this.inArray = [];
      this.inList = "";
  }

  removeAll2(): void {
      this.exArray = [];
      this.exList = "";
  }

  onClear(): void {
      this.inArray = [];
      this.exArray = [];
      this.inList = "";
      this.exList = "";
  }
  onSubmit(): void {
      this.params = "?incl=" + this.inList + "&excl=" + this.exList; 
      window.location.href = <any>'http://localhost:3000/api/inclexcl' + this.params;
      console.log('localhost:3000/api/inclexcl' + this.params);
      console.log('Inclusion list: ' + this.inList);
      console.log('Exclusion list: ' + this.exList);
  }

}
