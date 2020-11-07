import { Component, OnInit, Injectable } from '@angular/core';



//import the service
import { ApiService } from "../api.service";




@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  messages: any = [];
  audio = new Audio;
  monthVar = "";
  currentMonth: Date
  monthArray: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", 'December'];
  selector: string = ""

  //In order to bring in a service, you initialize as an argument in the constructor as shown below
  constructor(private svc: ApiService) { }

  filterSubmit(month) {
    this.svc.getConfig().subscribe(data => {
      // the json file Name filled is the name of the audio file
      //it is used as the src in the audio tag
      //the title, is the data that will be displayed above each audio tag.
      this.messages = data;
    })
  }

  // Sets current month, then requests the messages.json to fillout the month with audio files.
  ngOnInit(): void {
    this.setSelect()
    this.filterSubmit(this.monthVar);
  }

  // Function loops through monthArray and finds a match with currentMonth.  Sets selector to string version
  // of current month.
  // remember the monthArray is zero based as is getMonth()
  setSelect() {
    this.currentMonth = new Date()
    for (let i = 0; i <= this.monthArray.length; i++) {
      if (this.currentMonth.getMonth() === i) {
        this.selector = this.monthArray[i]
      }
    }
  }
}
