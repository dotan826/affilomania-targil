import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ROCKET_SECONDS = "rocket-seconds-"; // constant
  ROCKET_MINUTES = "rocket-minutes-"; // constant

  constructor() {

  }

  ngOnInit(): void {

    // Check if page reloaded - if yes, get last known minutes/seconds values
    if(window.localStorage.getItem(this.ROCKET_SECONDS + "0")){
      this.minutes[0] = Number(window.localStorage.getItem(this.ROCKET_MINUTES + "0"));
      this.seconds[0] = Number(window.localStorage.getItem(this.ROCKET_SECONDS + "0"));
    }
    if(window.localStorage.getItem(this.ROCKET_SECONDS + "1")){
      this.minutes[1] = Number(window.localStorage.getItem(this.ROCKET_MINUTES + "1"));
      this.seconds[1] = Number(window.localStorage.getItem(this.ROCKET_SECONDS + "1"));
    }
    if(window.localStorage.getItem(this.ROCKET_SECONDS + "2")){
      this.minutes[2] = Number(window.localStorage.getItem(this.ROCKET_MINUTES + "2"));
      this.seconds[2] = Number(window.localStorage.getItem(this.ROCKET_SECONDS + "2"));
    }

    this.startTimer(0); // start timer when enter/reload
    this.startTimer(1); // start timer when enter/reload
    this.startTimer(2); // start timer when enter/reload

  }

  // minutes: number = 4; // Minutes
  // seconds: number = 59; // Seconds
  // timer: any = null; // Timer Interval
  minutes: number[] = [4, 4, 4]; // Minutes
  seconds: number[] = [59, 59, 59]; // Seconds
  timer: any[] = [null, null, null]; // Timer Interval

  // Start timer
  startTimer = (timerID: number) => {
    // do something...
    window.localStorage.setItem(this.ROCKET_MINUTES + timerID, String(this.minutes[timerID]));

    this.timer[timerID] = setInterval(()=>{

      // Update seconds (Local + Browser)
      this.seconds[timerID] = this.seconds[timerID] - 1;
      window.localStorage.setItem(this.ROCKET_SECONDS + timerID, String(this.seconds[timerID]));

      if (this.seconds[timerID] < 0) {
        this.seconds[timerID] = 59;

        // Update minutes (Local + Browser)
        this.minutes[timerID] = this.minutes[timerID] - 1;
        window.localStorage.setItem(this.ROCKET_MINUTES + timerID, String(this.minutes[timerID]));

        if (this.minutes[timerID] < 0) { // stop ! and show alert...
          window.alert("You missed the last rocket to mars!");
          clearInterval(this.timer[timerID]);
          this.minutes[timerID] = 0;
          this.seconds[timerID] = 0;
          window.localStorage.removeItem(this.ROCKET_MINUTES + timerID);
          window.localStorage.removeItem(this.ROCKET_SECONDS + timerID);
        }
      }
    }, 1000);
  }

  // Reset timer and start again
  resetTimer = (timerID: number) => {
    clearInterval(this.timer[timerID]);
    window.localStorage.removeItem(this.ROCKET_MINUTES + timerID);
    window.localStorage.removeItem(this.ROCKET_SECONDS + timerID);
    this.minutes[timerID] = 4;
    this.seconds[timerID] = 59;
    this.startTimer(timerID);
  }

}
