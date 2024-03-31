import React, { Fragment, useState } from "react";
import { Listbox } from "@headlessui/react";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { cx } from "class-variance-authority";

import "../output.css";
import DateUtils, { Day } from "../utils/DateUtils";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type Props = {
  onChange?: (day: number) => void;
  firstDayOfWeek?:
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";
};

const DatePicker = ({ onChange, firstDayOfWeek }: Props) => {
  const [selectedDay, setSelectedDay] = useState<number>();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth());

  const firstDayOfWeekIndex = days.findIndex((day) => day === firstDayOfWeek);

  const monthDetails = DateUtils.getMonthDetails(
    year,
    month,
    firstDayOfWeekIndex
  );

  const setYearHandler = (offset: number) => {
    setYear((prevYear) => prevYear + offset);
    setMonthDetails(year + offset, month);
  };

  const setMonthHandler = (offset: number) => {
    let newMonth = month + offset;
    if (newMonth === -1) {
      setYear((prevYear) => prevYear - 1);
      newMonth = 11;
    } else if (newMonth === 12) {
      setYear((prevYear) => prevYear + 1);
      newMonth = 0;
    }
    setMonth(newMonth);
    setMonthDetails(year, newMonth);
  };

  const setMonthDetails = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  const handleDayClick = (day: Day) => {
    setSelectedDay(day.timestamp);
    if (onChange) {
      onChange(day.timestamp);
    }
  };

  return (
    <div className="font-nunito rounded-lg border border-slate-100 dark:border-none shadow-sm p-4 w-80 bg-white dark:bg-gray-700">
      {/* Navigator */}
      <div className="flex items-center justify-between">
        {/* previous month button */}
        <ChevronLeftIcon
          className="w-4 h-4 text-gray-800 dark:text-white cursor-pointer"
          onClick={() => setMonthHandler(-1)}
        />
        <div className="relative space-x-1">
          {/* year selector */}
          <Listbox value={year} onChange={setYear}>
            <Listbox.Button className="text-gray-800 dark:text-white font-semibold">
              {year}
            </Listbox.Button>
            <Listbox.Options className="max-h-56 overflow-y-auto space-y-1 absolute bg-white rounded-lg border border-slate-100 shadow-sm dark:border-gray-800 dark:shadow-gray-800 p-4 dark:bg-gray-700">
              {DateUtils.getYearsMap(currentYear).map((year) => (
                <Listbox.Option key={year} value={year}>
                  {({ selected, active }) => (
                    <div
                      className={cx(
                        "flex items-center gap-x-1 cursor-pointer",
                        active
                          ? "text-blue-500"
                          : "text-gray-800 dark:text-white"
                      )}
                    >
                      {year}
                      {selected && (
                        <CheckIcon className="w-4 h-4 flex-shrink-0" />
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>

          <span className="text-gray-800 dark:text-white">/</span>

          {/* month selector */}
          <Listbox value={month} onChange={setMonth}>
            <Listbox.Button className="text-gray-800 dark:text-white font-semibold">
              {DateUtils.monthsMap[month]}
            </Listbox.Button>
            <Listbox.Options className="max-h-56 overflow-y-auto space-y-1 absolute bg-white dark:border-gray-800 dark:shadow-gray-800 rounded-lg border border-slate-100 shadow-sm p-4 dark:bg-gray-700">
              {Array.from(Array(12), (_, x) => x).map((month) => (
                <Listbox.Option key={month} value={month} as={Fragment}>
                  {({ selected, active }) => (
                    <div
                      className={cx(
                        "flex items-center gap-x-1 cursor-pointer",
                        active
                          ? "text-blue-500"
                          : "text-gray-800 dark:text-white"
                      )}
                    >
                      {DateUtils.monthsMap[month]}
                      {selected && (
                        <CheckIcon className="w-4 h-4 flex-shrink-0" />
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        {/* next month button */}
        <ChevronRightIcon
          className="w-4 h-4 text-gray-800 dark:text-white cursor-pointer"
          onClick={() => setMonthHandler(1)}
        />
      </div>

      {/* Days of week */}
      <div className="flex items-center justify-center mt-4 mb-2">
        {DateUtils.daysShortMap(firstDayOfWeekIndex).map((day) => (
          <div
            key={day}
            className="w-10 text-center text-gray-500 dark:text-white/80"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days of month */}
      <div className="flex flex-wrap justify-center">
        {monthDetails.map((day, index) => (
          <div
            key={index}
            className={cx([
              "w-10 h-10 flex items-center text-gray-800 dark:text-white font-medium justify-center rounded-lg hover:bg-gray-200 dark:hover:text-gray-500 cursor-pointer text-center",
              DateUtils.isCurrentDay(day) &&
                "border border-gray-500 dark:border-gray-300",
              selectedDay === day.timestamp &&
                "bg-gray-400 dark:bg-gray-800 text-white hover:bg-gray-500 hover:dark:bg-gray-900 hover:dark:text-white",
            ])}
            onClick={() => handleDayClick(day)}
          >
            {day.date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
