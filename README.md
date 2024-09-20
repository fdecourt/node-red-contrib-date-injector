# Date inject Node for Node-RED

A **Node-RED** node that injects the current date and time into a message, with customizable formats, operations (add/subtract time), and language support via **Day.js**. Supports advanced date formatting, localized formats, and multiple time units.
Thanks Day.js ;-)

## Features

- **Inject current date and time** into a message field.
- **Customize date format** using Day.js formatting rules (e.g., `YYYY-MM-DD`, `dddd`, etc.).
- **Add or subtract time** from the current date (e.g., `+2 days`, `-3 hours`).
- **Localization** support for multiple languages (`en`, `fr`, `es`).
- Supports **advanced date formats** with the `dayjs` library.
- Returns **error handling** if required fields (message name or format) are missing.

## Installation

Not ready yes ;-)

## Usage

1. Drag the Date Injector node into your Node-RED flow.
2. Configure the node with the following options:
- Name: A name for the node.
- Language: Select the language for the date format (English, French, Spanish, etc.).
- Message Fields: Define multiple message fields, each with a customizable format and optional time manipulation.

## Configuration Fields

- **Message Name**: The name of the message field that will store the formatted date. (e.g., `msg.start`, `msg.end`)
- **Date Format**: The format of the date, using Day.js format tokens (e.g., `YYYY-MM-DD`, `dddd`, `MMMM Do YYYY`).
- **Operation**: You can choose to add or subtract time.
- **Amount**: Specify the time units (e.g., `10s` for 10 seconds, `2h` for 2 hours). Supported units are:
  - **Y**: Year
  - **M**: Month
  - **W**: Week
  - **D**: Day
  - **h**: Hours
  - **m**: Minutes
  - **s**: Seconds

### Date Formatting Tokens

Based on Day.js : https://day.js.org/docs/en/display/format

| Format | Output                  | Description                               |
|--------|-------------------------|-------------------------------------------|
| YY     | 18                      | Two-digit year                            |
| YYYY   | 2018                    | Four-digit year                           |
| M      | 1-12                    | The month, beginning at 1                 |
| MM     | 01-12                   | The month, 2-digits                       |
| MMM    | Jan-Dec                 | The abbreviated month name                |
| MMMM   | January-December        | The full month name                       |
| D      | 1-31                    | The day of the month                      |
| DD     | 01-31                   | The day of the month, 2-digits            |
| d      | 0-6                     | The day of the week, with Sunday as 0     |
| dd     | Su-Sa                   | The min name of the day of the week       |
| ddd    | Sun-Sat                 | The short name of the day of the week     |
| dddd   | Sunday-Saturday         | The name of the day of the week           |
| H      | 0-23                    | The hour                                  |
| HH     | 00-23                   | The hour, 2-digits                        |
| h      | 1-12                    | The hour, 12-hour clock                   |
| hh     | 01-12                   | The hour, 12-hour clock, 2-digits         |
| m      | 0-59                    | The minute                                |
| mm     | 00-59                   | The minute, 2-digits                      |
| s      | 0-59                    | The second                                |
| ss     | 00-59                   | The second, 2-digits                      |
| SSS    | 000-999                 | The millisecond, 3-digits                 |
| Z      | +05:00                  | The offset from UTC, ±HH:mm               |
| ZZ     | +0500                   | The offset from UTC, ±HHmm                |
| A      | AM PM                   | AM or PM                                  |
| a      | am pm                   | am or pm                                  |
| Q      | 1-4                     | Quarter                                   |
| Do     | 1st 2nd ... 31st        | Day of Month with ordinal                 |
| k      | 1-24                    | The hour, beginning at 1                  |
| kk     | 01-24                   | The hour, 2-digits, beginning at 1        |
| X      | 1360013296              | Unix Timestamp in seconds                 |
| x      | 1360013296123           | Unix Timestamp in milliseconds            |
| w      | 1-52, 53                | Week of year (dependent on WeekOfYear plugin) |
| ww     | 01-52, 53               | Week of year, 2-digits (dependent on WeekOfYear plugin) |
| W      | 1-52, 53                | ISO Week of year (dependent on IsoWeek plugin) |
| WW     | 01-52, 53               | ISO Week of year, 2-digits (dependent on IsoWeek plugin) |
| wo     | 1st 2nd ... 52nd 53rd   | Week of year with ordinal (dependent on WeekOfYear plugin) |
| gggg   | 2017                    | Week Year (dependent on WeekYear plugin)  |
| GGGG   | 2017                    | ISO Week Year (dependent on IsoWeek plugin) |
| z      | EST                     | Abbreviated named offset (dependent on Timezone plugin) |
| zzz    | Eastern Standard Time    | Unabbreviated named offset (dependent on Timezone plugin) |

### Localized Formats

| Format | English Locale          | Sample Output                             |
|--------|-------------------------|-------------------------------------------|
| LT     | h:mm A                  | 8:02 PM                                   |
| LTS    | h:mm:ss A               | 8:02:18 PM                                |
| L      | MM/DD/YYYY              | 08/16/2018                                |
| LL     | MMMM D, YYYY            | August 16, 2018                           |
| LLL    | MMMM D, YYYY h:mm A     | August 16, 2018 8:02 PM                   |
| LLLL   | dddd, MMMM D, YYYY h:mm A| Thursday, August 16, 2018 8:02 PM         |
| l      | M/D/YYYY                | 8/16/2018                                 |
| ll     | MMM D, YYYY             | Aug 16, 2018                              |
| lll    | MMM D, YYYY h:mm A      | Aug 16, 2018 8:02 PM                      |
| llll   | ddd, MMM D, YYYY h:mm A | Thu, Aug 16, 2018 8:02 PM                 |


### Available Time Units for Calculation

| Unit  | Description        | Operation | Example | Meaning          |
|-------|--------------------|-----------|---------|------------------|
| `Y`   | Years              | Add       | `1Y`   | Add 1 year       |
| `W`   | Weeks              | Subtract  | `2W`   | Subtract 2 weeks |
| `D`   | Days               | Add       | `3D`   | Add 3 days       |
| `h`   | Hours              | Subtract  | `4h`   | Subtract 4 hours |
| `m`   | Minutes            | Add       | `30m`  | Add 30 minutes   |
| `s`   | Seconds            | Subtract  | `10s`  | Subtract 10 seconds |
