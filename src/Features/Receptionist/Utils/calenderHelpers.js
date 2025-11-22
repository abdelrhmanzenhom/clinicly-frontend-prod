export const isDoctorAvailable = (date, doctor) => {
    const doctorWorkingDays = doctor?.availableDays || [];
    const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const day = weekDays[date.getDay()];
    return doctorWorkingDays.includes(day);
};

export const areDatesEqual = (date1, date2) => {
    return date1?.getTime() === date2?.getTime()
}