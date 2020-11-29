import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player = new Audio;
  paused: boolean = false;
  duration: any;
  currentTime: number;

  constructor() { }

  setDuration(audio) {
    console.log(audio.duration)
    this.duration = audio.duration
  }

  playBroadcast(audio) {
    // this.setDuration(audio);
    audio.play()
  }

  pauseBroadcast(audio) {
    audio.pause()
    this.paused = true
  }

  getTime(audio) {
    this.currentTime = audio.currentTime
  }
}
