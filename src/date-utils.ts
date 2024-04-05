export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export enum MonthName {
    "January" = 1,
    "February" = 2,
    "March" = 3,
    "April" = 4,
    "May" = 5,
    "June" = 6,
    "July" = 7,
    "August" = 8,
    "September" = 9,
    "October" = 10,
    "November" = 11,
    "December" = 12,
}

export const getDaysInMonth = (month: MonthNumber, year: number) => {
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
                return 29;
            }
            return 28;
        default:
            throw new Error(`Invalid month: ${month}`);
    }
};

