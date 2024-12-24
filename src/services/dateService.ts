// Date Utility Functions
import { IDateFilterParams } from 'ag-grid-community';

// DATE COMPARATOR FOR SORTING
export function dateComparator(date1:any, date2:any) {
    var date1Number = _monthToNum(date1);
    var date2Number = _monthToNum(date2);
  
    if (date1Number === null && date2Number === null) {
      return 0;
    }
    if (date1Number === null) {
      return -1;
    }
    if (date2Number === null) {
      return 1;
    }
  
    return date1Number - date2Number;
  }
  
  // HELPER FOR DATE COMPARISON
  function _monthToNum(date:any) {
    if (date === undefined || date === null || date.length !== 10) {
      return null;
    }
  
    var yearNumber = date.substring(6, 10);
    var monthNumber = date.substring(3, 5);
    var dayNumber = date.substring(0, 2);
  
    var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
    // 29/08/2004 => 20040829
    return result;
  }

  const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

export const filterParams: IDateFilterParams = {
  minValidDate: "2000-01-01",
  maxValidDate: tomorrow,
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    const dateAsString = cellValue;
    if (dateAsString == null) return -1;
    const dateParts = dateAsString.split("/");
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0]),
    );

    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }

    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }

    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};


// utc timestamp to date
  export function justDate(isoDateString:any) {
    const date = new Date(isoDateString);
  
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();
  
    const ieDateString = `${day}/${month}/${year}`;
    return(ieDateString);
    };