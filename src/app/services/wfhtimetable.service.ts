import { Injectable } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class WfhtimetableService {

  private holidaysList = [
    "2024-07-10",
    "2024-07-11",
    "2024-07-24",
    "2024-07-31",
  ]

  private holidaysMonthMap;

  public isSundayOff = true;
  public isSaturdayOff = true;
  public threshold = 0.5 // Percentage

  constructor() {
    this.holidaysMonthMap = new Map<number, string[]>();
    this.generateHolidaysMonthMap()
  }


  getHolidaysList(monthId: number) {
    // Months are 0-indexed. January = 0, December = 11
    return this.holidaysMonthMap.get(monthId) || []
  }

  generateHolidaysMonthMap() {
    // Assign each month as no holidays (default)
    for (const _i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
      this.holidaysMonthMap.set(_i, [])
    }

    for (const dateStr of this.holidaysList) {
      const _d = new Date(dateStr)
      const _m = _d.getMonth()

      const _h = this.holidaysMonthMap.get(_m) || []
      _h.push(dateStr)
      this.holidaysMonthMap.set(_m, _h)
    }

  }
}
