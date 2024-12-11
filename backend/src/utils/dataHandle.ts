import { FlightRecordData } from "./types"

import { XMLParser } from 'fast-xml-parser';
import XLSX from "xlsx";

function fileHandle(ext:string, fileBuffer: Buffer): any {
    switch (ext) {
        // For Excel files exported from FlownRecords Logbook template
        case '.xlsx' :
        case '.xls' : {
            try {
                let workbook = XLSX.read(fileBuffer, { 
                    type: 'buffer',
                    cellDates: true,
                });
                let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
                    range: 1     
                });
                let parsedData = XLSXparseData(sheetData) ? XLSXparseData(sheetData) : { message: 'Error parsing Excel file' };
                return parsedData;
            } catch (e) {
                console.log(e);
                return { message: 'Error parsing Excel file' };
            }
        }
        break;

        // For XML files exported from FlightLogger Logbook
        case '.xml' : {
            try {
                let p = new XMLParser();
                let xmlData = p.parse(fileBuffer)

                if(xmlData?.objects?.object?.flights?.flight) {
                    xmlData = xmlData.objects.object.flights.flight;
                    return FlightLoggerParseData(xmlData);
                } else {
                    return { message: 'Invalid XML file' };
                }
            } catch(e) {
                console.log(e);
                return { message: 'Error parsing XML file' };
            }
        }
        break;

        return {
            message: 'Invalid file format'
        }
    }
}


// FlownRecords Excel format parser
const XLXSpropParseMap: any = {
    'Flight Date': 'flightDate',
    'Departure': 'departure',
    'Off Block': 'offBlock',
    'On Block': 'onblock',
    'Destination': 'destination',
    'Aircraft Type': 'aircraftType',
    'Registration': 'aircraftReg',
    'Callsign': 'callsign',
    'Name of PIC': 'picName',
    'Flight Rules': 'flightRules',
    'Mission Type': 'missionType',
    'My Role': 'role',
    'Flight Instructor': 'flightInstructor',
    'Total Time': 'totalTime',
    'Night Time': 'nightTime',
    'SEP VFR': 'sepVFR',
    'SEP IFR': 'sepIFR',
    'MEP VFR': 'mepVFR',
    'MEP IFR': 'mepIFR',
    'PIC': 'picTime',
    'Co-Pilot': 'coPilot',
    'Multi-Pilot': 'multiPilot',
    'Dual': 'dual',
    'Synthetic Training': 'syntheticTraining',
    'Instructor Synthetic Training': 'instructorSyntheticTraining',
    'Night Landings': 'nightLandings',
    'Day Landings': 'dayLandings',
    'Remarks': 'rmks'
};

// FlightLogger XML format parser
const XMLpropParseMap: any = {
    'date': 'flightDate',
    'departure-airport-name': 'departure',
    'off-block': 'offBlock',
    'arrival-airport-name': 'destination',
    'on-block': 'onBlock',
    'type-of-aircraft': 'aircraftType',
    'registration': 'aircraftReg',
    'name-of-pilot-in-command': 'picName',
    'total': 'totalTime',
    'day': 'dayTime',
    'night': 'nightTime',
    'single-engine-vfr': 'sepVFR',
    'single-engine-ifr': 'sepIFR',
    'multi-engine-vfr': 'mepVFR',
    'multi-engine-ifr': 'mepIFR',
    'pilot-in-command-time': 'picTime',
    'co-pilot': 'coPilot',
    'multi-pilot': 'multiPilot',
    'flight-instructor': 'flightInstructor',
    'dual': 'dual',
    'synthetic-training': 'syntheticTraining',
    'instructor-synthetic-training': 'instructorSyntheticTraining',
    'landings-day': 'dayLandings',
    'landings-night': 'nightLandings',
    'remarks-and-endorsements': 'rmks',
    'include-in-ftl': '',
    'if-time': ''
};

function XLSXparseData(data: any): FlightRecordData[] {
    
    return data.map((i: any) => {
        let renamedItem: any = {};
        for (let key in i) {
            if (XLXSpropParseMap[key]) {
                renamedItem[XLXSpropParseMap[key]] = i[key];
            }
        }
        return renamedItem;
    });
}

function FlightLoggerParseData(data: any): FlightRecordData[] {
    return data.map((i: any) => {
        let renamedItem: any = {};
        for (let key in i) {
            if (XMLpropParseMap[key]) {
                renamedItem[XMLpropParseMap[key]] = i[key];
            }
        }
        return renamedItem;
    });
}

export { XLSXparseData, fileHandle };