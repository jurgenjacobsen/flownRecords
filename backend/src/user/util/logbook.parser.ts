import { Readable } from "stream";
import * as csv from "csv-parser";

export const csvFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(csv)$/)) {
        return callback(new Error('Only CSV files are allowed!'), false);
    }
    callback(null, true);
}

export const parseCsv = (FileBuffer, userId: number) => {
    const data: any[] = [];

    return new Promise((resolve, reject) => {
        Readable.from(FileBuffer)
        .pipe(csv())
        .on('data', (row) => {
            const parsedRow = parseEntry(row, userId);
            if (!parsedRow) {
                return;
            }
            data.push(parsedRow);
        })
        .on('end', () => {
            resolve(data);
        })
        .on('error', reject);
    });
};


/* 
{
      id: number
      pilotId: number
      crewId: number[]
      createdAt: Date
      updatedAt: Date
      date: Date
      depAd: string
      arrAd: string
      offBlock: Date
      onBlock: Date
      aircraftType: string
      aircraftRegistration: string
      picName: string
      total: number
      dayTime: number
      nightTime: number
      sepVfr: number
      sepIfr: number
      meVfr: number
      meIfr: number
      picTime: number
      copilotTime: number
      multiPilotTime: number
      instructorTime: number
      dualTime: number
      simTime: number
      simInstructorTime: number
      landDay: number
      landNight: number
      rmks: string | null
      flightTrack: Prisma.JsonValue[]
      userId: number
    }
*/

/*
 * 
{
    date: '29.05.2025',
    departure_airport_name: 'LPVL',
    off_block: '10:45',
    arrival_airport_name: 'LPVL',
    on_block: '13:30',
    type_of_aircraft: '1E',
    registration: 'CS-EDU',
    name_of_pilot_in_command: 'F-DLD 24011 JGJ',
    total: '2:45',
    day: '2:45',
    night: '',
    single_engine_vfr: '2:45',
    single_engine_ifr: '',
    multi_engine_vfr: '',
    multi_engine_ifr: '',
    pilot_in_command_time: '2:45',
    co_pilot: '',
    multi_pilot: '',
    flight_instructor: '',
    dual: '',
    synthetic_training: '',
    instructor_synthetic_training: '',
    landings_day: '5',
    landings_night: '',
    remarks_and_endorsements: 'ATP(A) (Vol 5) CBTA / NAV 08 / F-DLD',
    include_in_ftl: 'true',
    if_time: ''
  }
 */

export const parseEntry = (data: any, userId: number) => {
    if(!data) {
        throw new Error('No data provided for parsing');
    }

    if(!userId) {
        throw new Error('No user ID provided for parsing');
    }

    const parsed = {
        unique: `${data.date}-${data.off_block}-${data.departure_airport_name}-${data.type_of_aircraft}-${data.registration}`,
        pilotId: userId,
        crewId: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        date: combineDateAndTime(data.date, data.off_block) || parseDate(data.date) || null,
        depAd: data.departure_airport_name || 'ZZZZ',
        arrAd: data.arrival_airport_name || 'ZZZZ',

        offBlock: combineDateAndTime(data.date, data.off_block) || null,
        onBlock: combineDateAndTime(data.date, data.on_block) || null,
        aircraftType: data.type_of_aircraft || 'ZZZZ',
        aircraftRegistration: data.registration || undefined,
        picName: data.name_of_pilot_in_command,

        total: parseTime(data.total),
        dayTime: parseTime(data.day),
        nightTime: parseTime(data.night),
        sepVfr: parseTime(data.single_engine_vfr),
        sepIfr: parseTime(data.single_engine_ifr),
        meVfr: parseTime(data.multi_engine_vfr),
        meIfr: parseTime(data.multi_engine_ifr),
        picTime: parseTime(data.pilot_in_command_time),
        copilotTime: parseTime(data.co_pilot),
        multiPilotTime: parseTime(data.multi_pilot),
        instructorTime: parseTime(data.flight_instructor),
        dualTime: parseTime(data.dual),
        simTime: parseTime(data.synthetic_training),
        simInstructorTime: parseTime(data.instructor_synthetic_training),
        landDay: parseInt(data.landings_day, 10) || 0,
        landNight: parseInt(data.landings_night, 10) || 0,
        rmks: data.remarks_and_endorsements || null,
        flightTrack: [],
    }

    if((parsed.unique.match(/undefined/g) || []).length > 1) {
        return null; 
    }
    return parsed;
}

export const parseTime = (timeString: string): number => {
    if(!timeString || typeof timeString !== 'string') {
        return 0;
    }

    const parts = timeString.split(':');
    if(parts.length !== 2) {
        return 0;
    }

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);

    if (isNaN(hours) || isNaN(minutes)) {
        return 0;
    }

    const totalHours = hours + (minutes / 60);
    return Math.round(totalHours * 1000) / 1000;
}

export const parseDate = (dateStr: string): Date | null => {
    if (!dateStr || typeof dateStr !== 'string') {
    return null;
  }

  const parts = dateStr.split('.');
  if (parts.length !== 3) {
    return null;
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
  }

  return date;
};

export const combineDateAndTime = (dateStr: string, timeStr: string): Date | null => {
    const date = parseDate(dateStr);
    if (!date || !(date instanceof Date) || !timeStr || typeof timeStr !== 'string') {
        return null;
    }

    const timeParts = timeStr.split(':');
    if (timeParts.length !== 2) {
        return null;
    }

    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    if (isNaN(hours) || isNaN(minutes)) {
        return null;
    }

    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);

    return newDate;
};