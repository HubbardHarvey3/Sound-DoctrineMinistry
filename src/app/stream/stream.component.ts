import { Component, OnInit, Injectable, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { VimeModule } from '@vime/angular';


//import the service
import { ApiService } from "../services/api.service";
import { PlayerService } from '../services/player.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css'],
  // inserted to avoid the error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
  changeDetection: ChangeDetectionStrategy.Default
})

export class StreamComponent implements OnInit {

  messages: any = [];
  monthVar = "";
  currentMonth: Date
  monthArray: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", 'December'];
  selector: string = ""


  //In order to bring in a service, you initialize as an argument in the constructor as shown below
  constructor(
    private player: VimeModule,
    private cd: ChangeDetectorRef,
    public _authService: AuthService,
    public _player: PlayerService,
    private svc: ApiService
  ) { }

  // Grab the JSON Data
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
    // inserted to avoid the error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    this.cd.detectChanges()
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
