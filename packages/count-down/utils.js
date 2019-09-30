export function addPrefixZero(number, length = 2) {
    return (Array(length).join('0') + number).slice(-length);
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;



export function parseTimeData(time) {
    const days = Math.floor(time / DAY);
    const hours = Math.floor((time % DAY) / HOUR);
    const minutes = Math.floor((time % HOUR) / MINUTE);
    const seconds = Math.floor((time % MINUTE) / SECOND);
    const milliseconds = Math.floor(time % SECOND);

    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds
    };
}

export function parseFormat(format, timeData) {
    const { days } = timeData;
    let { hours, minutes, seconds, milliseconds } = timeData;

    if (format.indexOf('DD') === -1) {
        hours += days * 24;
    } else {
        format = format.replace('DD', addPrefixZero(days));
    }

    if (format.indexOf('HH') === -1) {
        minutes += hours * 60;
    } else {
        format = format.replace('HH', addPrefixZero(hours));
    }

    if (format.indexOf('mm') === -1) {
        seconds += minutes * 60;
    } else {
        format = format.replace('mm', addPrefixZero(minutes));
    }

    if (format.indexOf('ss') === -1) {
        milliseconds += seconds * 1000;
    } else {
        format = format.replace('ss', addPrefixZero(seconds));
    }

    return format.replace('SSS', addPrefixZero(milliseconds, 3));
}

export function isSameSecond(time1, time2) {
    return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

let prev = Date.now();
export function raf(fn) {
    const curr = Date.now();
    const ms = Math.max(0, 16 - (curr - prev));
    const id = setTimeout(fn, ms);
    prev = curr + ms;
    return id;
}
