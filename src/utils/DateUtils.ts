export interface Day {
  date: number;
  day: number;
  month: number;
  timestamp: number;
  dayString: string;
}

export default class DateUtils {
  static oneDay: number = 60 * 60 * 24 * 1000;
  static daysMap: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  static monthsMap: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  static daysShortMap: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  static getYearsMap = (currentYear: number) => {
    return Array.from({ length: 21 }, (_, index) => currentYear - 10 + index);
  };

  static getTodayTimestamp(): number {
    return (
      Date.now() -
      (Date.now() % this.oneDay) +
      new Date().getTimezoneOffset() * 1000 * 60
    );
  }

  static getNumberOfDays(year: number, month: number): number {
    return 40 - new Date(year, month, 40).getDate();
  }

  static getMonthDetails(
    year: number,
    month: number
  ): {
    date: number;
    day: number;
    month: number;
    timestamp: number;
    dayString: string;
  }[] {
    let firstDay: number = new Date(year, month).getDay();
    let numberOfDays: number = this.getNumberOfDays(year, month);
    let monthArray: {
      date: number;
      day: number;
      month: number;
      timestamp: number;
      dayString: string;
    }[] = [];
    let rows: number = 6;
    let currentDay: any = null;
    let index: number = 0;
    let cols: number = 7;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = this.getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month,
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  }

  static getDayDetails(args: {
    index: number;
    numberOfDays: number;
    firstDay: number;
    year: number;
    month: number;
  }): Day {
    let date: number = args.index - args.firstDay;
    let day: number = args.index % 7;
    let prevMonth: number = args.month - 1;
    let prevYear: number = args.year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    let prevMonthNumberOfDays: number = this.getNumberOfDays(
      prevYear,
      prevMonth
    );
    let _date: number =
      (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    let month: number = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;

    let timestamp: number = new Date(
      args.year,
      args.month + month,
      _date
    ).getTime();
    return {
      date: _date,
      day,
      month,
      timestamp,
      dayString: this.daysMap[day],
    };
  }

  static getDateFromDateString(
    dateValue: string
  ): { year: number; month: number; date: number } | null {
    let dateData: number[] = dateValue.split("-").map((d) => parseInt(d, 10));
    if (dateData.length < 3) return null;

    let year: number = dateData[0];
    let month: number = dateData[1];
    let date: number = dateData[2];
    return { year, month, date };
  }

  static getDateStringFromTimestamp(timestamp: number): string {
    let dateObject: Date = new Date(timestamp);
    let month: number = dateObject.getMonth() + 1;
    let date: number = dateObject.getDate();
    return (
      dateObject.getFullYear() +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (date < 10 ? "0" + date : date)
    );
  }

  static isCurrentDay = (day: { timestamp: number }) => {
    return day.timestamp === this.getTodayTimestamp();
  };
}
