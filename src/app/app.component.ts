import {
  Component,
  ViewEncapsulation,
} from "@angular/core";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'wfh-calculator';

  daysSelected: any[] = [];
  event: any;
  isSelected = (event: any) => {
    let x: any = null;  //bad solution
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    x = this.daysSelected.find(x => x == date) ? "selected" : null;
    return x;
  };

  select(event: any, calendar: any) {
    const date = this.getDateFromEvent(event)
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);

    calendar.updateTodaysDate();
  }

  holidaysList = [
    "2024-01-15",
    "2024-01-26"
  ]
  sundays: any[] = [];
  saturdays: any[] = [];
  // TODO: Month can be different on different calendars - this should not be the case
  filterDates = (date: Date): boolean => {
    // Disable all Sundays
    const dateStr = this.getDateFromEvent(date)
    if (date.getDay() == 0) {
      // Found sunday and it is not already counted
      if (this.sundays.findIndex(i => i == dateStr) < 0) {
        this.sundays.push(dateStr)
      }
      return false
    }
    // Disable all Saturdays
    if (date.getDay() == 6) {
      // Found saturday and it is not already counted
      if (this.saturdays.findIndex(i => i == dateStr) < 0) {
        this.saturdays.push(dateStr)
      }
      return false
    }
    // Disable if it is a holiday

    const dateIndex = this.holidaysList.findIndex(i => i == dateStr)
    if (dateIndex >= 0) {
      return false
    }
    return true
  }
  getDateFromEvent(event: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return date;
  }
  calculateTotalWFODays() {
    // TODO: Make this dynamic. For now, this assumes you don't change the month, and all holidays are in same month etc etc
    var anyOneDate = null;
    if (this.daysSelected.length != 0) {
      anyOneDate = new Date(this.daysSelected[0])
    }
    else {
      anyOneDate = new Date()
    }
    const totalDaysInThisMonth = new Date(anyOneDate.getFullYear(), anyOneDate.getMonth() + 1, 0).getDate()
    const totalWFODays = totalDaysInThisMonth - this.saturdays.length - this.sundays.length - this.holidaysList.length

    return totalWFODays

  }
  threshold: number = 0.5 // Percentage

  calculate() {
    return this.calculateTotalWFODays() - this.daysSelected.length
  }

  constructor() {
    // Called first time before the ngOnInit()
  }

  ngOnInit() {
    // Called after the constructor and called  after the first ngOnChanges() 
  }

}
