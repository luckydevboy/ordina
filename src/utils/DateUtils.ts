export interface Day {
  date: number;
  day: number;
  month: number;
  timestamp: number;
  dayString: string;
}

export interface JalaliDay {
  date: number;
  day: number;
  month: number;
  timestamp: number;
  dayString: string;
}

export interface JalaliDate {
  year: number;
  month: number;
  date: number;
}

export default class DateUtils {
  static oneDay: number = 60 * 60 * 24 * 1000;
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

  static jMonthsMap: string[] = [
    "Farvardin",
    "Ordibehesht",
    "Khordad",
    "Tir",
    "Mordad",
    "Shahrivar",
    "Mehr",
    "Aban",
    "Azar",
    "Dey",
    "Bahman",
    "Esfand",
  ];

  static daysMap(firstDayOfWeek = 0) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const firstPart = days.slice(firstDayOfWeek);
    const secondPart = days.slice(0, firstDayOfWeek);

    return [...firstPart, ...secondPart];
  }

  static daysShortMap(firstDayOfWeek = 0) {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const firstPart = days.slice(firstDayOfWeek);
    const secondPart = days.slice(0, firstDayOfWeek);

    return [...firstPart, ...secondPart];
  }

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
    month: number,
    firstDayOfWeek = 0
  ): {
    date: number;
    day: number;
    month: number;
    timestamp: number;
    dayString: string;
  }[] {
    let firstDay: number = new Date(year, month).getDay();
    firstDay = (firstDay - firstDayOfWeek + 7) % 7;
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
      dayString: this.daysMap()[day],
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

  static gregorianToJalali(
    gYear: number,
    gMonth: number,
    gDate: number
  ): JalaliDate {
    let gy = gYear - 1600;
    let gm = gMonth - 1;
    let gd = gDate - 1;

    let g_day_no =
      365 * gy +
      Math.floor((gy + 3) / 4) -
      Math.floor((gy + 99) / 100) +
      Math.floor((gy + 399) / 400);
    for (let i = 0; i < gm; ++i) g_day_no += this.gMonthLengths[i];
    if (gm > 1 && ((gy % 4 == 0 && gy % 100 != 0) || gy % 400 == 0))
      /* leap and after Feb */
      ++g_day_no;
    g_day_no += gd;

    let j_day_no = g_day_no - 79;

    let j_np = Math.floor(j_day_no / 12053);
    j_day_no %= 12053;

    let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);

    j_day_no %= 1461;

    if (j_day_no >= 366) {
      jy += Math.floor((j_day_no - 1) / 365);
      j_day_no = (j_day_no - 1) % 365;
    }

    let j;
    for (j = 0; j < 11 && j_day_no >= this.jMonthLengths[j]; ++j)
      j_day_no -= this.jMonthLengths[j];
    let jm = j;
    let jd = j_day_no;

    return { year: jy, month: jm + 1, date: jd + 1 };
  }

  static jalaliToGregorian(jYear: number, jMonth: number, jDate: number): Date {
    let jy = jYear - 979;
    let jm = jMonth - 1;
    let jd = jDate - 1;

    let j_day_no =
      365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);
    for (let i = 0; i < jm; ++i) j_day_no += this.jMonthLengths[i];
    j_day_no += jd;

    let g_day_no = j_day_no + 79;

    let gy = 1600 + 400 * Math.floor(g_day_no / 146097);
    g_day_no %= 146097;

    let leap = true;
    if (g_day_no >= 36525) {
      g_day_no--;
      gy += 100 * Math.floor(g_day_no / 36524);
      g_day_no %= 36524;

      if (g_day_no >= 365) g_day_no++;
      else leap = false;
    }

    gy += 4 * Math.floor(g_day_no / 1461);
    g_day_no %= 1461;

    if (g_day_no >= 366) {
      leap = false;

      g_day_no--;
      gy += Math.floor(g_day_no / 365);
      g_day_no %= 365;
    }

    let gd = g_day_no + 1;

    let gMonthLengths = leap ? this.gMonthLengthsLeap : this.gMonthLengths;

    let sal_a, sal_b;
    for (let i = 0; i < 12; ++i) {
      sal_a = gMonthLengths[i];
      if (g_day_no < sal_a) break;
      g_day_no -= sal_a;
    }
    let gm = i;
    return new Date(gy, gm, gd);
  }

  static gMonthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  static gMonthLengthsLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  static jMonthLengths = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  static isJalaliLeapYear(jYear: number): boolean {
    let jalaliYear = (jYear + 2346) % 33;
    return (
      jalaliYear % 33 === 1 ||
      jalaliYear % 33 === 5 ||
      jalaliYear % 33 === 9 ||
      jalaliYear % 33 === 13 ||
      jalaliYear % 33 === 17 ||
      jalaliYear % 33 === 22 ||
      jalaliYear % 33 === 26 ||
      jalaliYear % 33 === 30
    );
  }

  static getJalaliMonthDetails(
    year: number,
    month: number,
    firstDayOfWeek = 0
  ): JalaliDay[] {
    let firstDay: number = this.jalaliToGregorian(year, month, 1).getDay(); // Convert Jalali 1st day to Gregorian to get the day index
    firstDay = (firstDay - firstDayOfWeek + 7) % 7;
    let numberOfDays: number = this.jMonthLengths[month - 1]; // Get number of days in the Jalali month
    let monthArray: JalaliDay[] = [];
    let rows: number = 6;
    let index: number = 0;
    let cols: number = 7;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const currentDay = this.getJalaliDayDetails({
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

  static getJalaliDayDetails(args: {
    index: number;
    numberOfDays: number;
    firstDay: number;
    year: number;
    month: number;
  }): JalaliDay {
    let date: number = args.index - args.firstDay;
    let day: number = args.index % 7;
    let jalaliFirstDayOfMonth = this.gregorianToJalali(
      args.year,
      args.month,
      1
    );
    let prevJalaliMonth = jalaliFirstDayOfMonth.month - 1;
    let prevJalaliYear = jalaliFirstDayOfMonth.year;
    if (prevJalaliMonth < 1) {
      prevJalaliMonth = 12;
      prevJalaliYear--;
    }
    let prevJalaliMonthLength = this.jMonthLengths[prevJalaliMonth - 1];
    let _date: number =
      (date < 0 ? prevJalaliMonthLength + date : date % args.numberOfDays) + 1;
    let month: number = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;

    let timestamp: number = this.jalaliToTimestamp(
      args.year,
      args.month,
      _date
    );

    return {
      date: _date,
      day,
      month,
      timestamp,
      dayString: this.daysMap()[day],
    };
  }

  static jalaliToTimestamp(
    jYear: number,
    jMonth: number,
    jDate: number
  ): number {
    const gregorianDate = this.jalaliToGregorian(jYear, jMonth, jDate);

    return gregorianDate.getTime();
  }
}
