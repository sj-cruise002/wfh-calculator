import { Component, ViewChild, ViewEncapsulation, } from '@angular/core';
import { WfhtimetableService } from '../services/wfhtimetable.service';

@Component({
  selector: 'app-wfhcalendar',
  templateUrl: './wfhcalendar.component.html',
  styleUrls: ['./wfhcalendar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WfhcalendarComponent {
  /* Dropdwnn*/
  monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]; // This should be an enum ?
  monthSelected = this.monthNames[new Date().getMonth()];

  changeMonth(event: any) {
    const newMonthName = event.value;
    const newMonthIndex = this.monthNames.indexOf(newMonthName)

    const newDate = new Date(this.calculatorDate.getFullYear(), newMonthIndex, 1)
    this.wfhCalendar._goToDateInView(newDate, 'month')
    this.clear()
  }
  /* --- */

  static title = 'wfh-calculator';

  holidaysList: string[]
  threshold: any

  daysSelected: any[] = [];

  // @ViewChild('myname') input; 
  calculatorDate;

  constructor(private timetableService: WfhtimetableService) {
    // Called first time before the ngOnInit()
    this.calculatorDate = new Date()
    this.holidaysList = this.timetableService.getHolidaysList(this.calculatorDate.getMonth())
    this.threshold = this.timetableService.threshold
  }

  ngOnInit() {
    // Called after the constructor and called after the first ngOnChanges() 
    this.holidaysList = this.timetableService.getHolidaysList(new Date().getMonth())
  }


  @ViewChild('calendar') wfhCalendar: any;

  clear() {
    this.daysSelected = []
    this.wfhCalendar.updateTodaysDate()
  }

  isSelected = (event: any) => {
    const date = this.getDateFromEvent(event)

    let x: any = null;
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


  sundays: any[] = [];
  saturdays: any[] = [];
  // TODO: Month can be different on different calendars - this should not be the case
  filterDates = (date: Date): boolean => {
    const dateStr = this.getDateFromEvent(date)

    // Disable all Sundays
    if (this.timetableService.isSundayOff && date.getDay() == 0) {
      // Found sunday and it is not already counted
      if (this.sundays.findIndex(i => i == dateStr) < 0) {
        this.sundays.push(dateStr)
      }
      return false
    }

    // Disable all Saturdays
    if (this.timetableService.isSaturdayOff && date.getDay() == 6) {
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
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);

    return date;
  }
  calculateTotalWFODays() {
    // TODO: Make this dynamic. For now, this assumes you don't change the month, and all holidays are in same month etc etc
    const anyOneDate = new Date()

    const totalDaysInThisMonth = new Date(anyOneDate.getFullYear(), anyOneDate.getMonth() + 1, 0).getDate()
    const totalWFODays = totalDaysInThisMonth - this.saturdays.length - this.sundays.length - this.holidaysList.length

    return totalWFODays

  }

  calculateThresholdBreaker() {
    return this.calculateTotalWFODays() - this.daysSelected.length - this.calculateTotalWFODays() * this.threshold
  }
}
