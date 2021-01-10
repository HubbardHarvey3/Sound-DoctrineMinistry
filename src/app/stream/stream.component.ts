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
  messagesFound: any = [];
  searchBoolean: boolean = false;
  monthVar: string = "";
  currentMonth: Date
  monthArray: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", 'December', "All"];
  selector: string = ""
  searchString: string;
  listRequest: string;
  clickedIndex: number;
  isNoResults: boolean = false;


  //In order to bring in a service, you initialize as an argument in the constructor as shown below
  constructor(
    private player: VimeModule,
    private cd: ChangeDetectorRef,
    public _authService: AuthService,
    public _player: PlayerService,
    private svc: ApiService
  ) { }

  // Grab the JSON Data
  filterSubmit(searchParam: string) {
    // Reset messages and messagesFound to clean up data load
    this.messages = []
    this.messagesFound = []
    this.isNoResults = false
    // This calls the JSON data from the Node Server
    this.svc.getConfig().subscribe((data: any = []) => {
      // If search is blank, then return everything
      if (searchParam == undefined) {
        this.messagesFound = data
      }
      // add the element to messagesFound if searchParam is in the title
      else {
        data.forEach(element => {
          if (element.title.includes(searchParam)) {
            this.messagesFound.push(element)
          }
        });
      }
      // check for results.  Flip bool to true if there are no results ///to notify the user
      if (this.messagesFound.length === 0) {
        this.isNoResults = true
      } else {
        this.isNoResults = false
      }
    })
  }

  // Sets current month, then requests the messages.json to fillout the month with audio files.
  ngOnInit(): void {
    this.setSelect()
    // inserted to avoid the error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    this.cd.detectChanges()
  }

  // Function loops through monthArray and finds a match with currentMonth.  Sets selector to string version
  // of current month.
  // remember the monthArray is zero based as is getMonth()
  setSelect() {
    const d: Date = new Date();
    this.selector = this.monthArray[d.getMonth()];
  }
  search(eventData: string) {
    this.messagesFound = [];
    // this.searchBoolean = true;
    this.filterSubmit(eventData);
  }
  clearSearch() {
    // this.searchBoolean = false;
    this.isNoResults = false
    this.messagesFound = [];
    this.clickedIndex = null
    // this.messages = [];
    // this.filterSubmit(this.monthVar);
  }

  // sets the index of the clicked element to a var that 
  // can be used to compare the clicked index with the current index and load
  // the player.  See line 43 in component HTML
  load(index) {
    this.clickedIndex = index
  }

}
