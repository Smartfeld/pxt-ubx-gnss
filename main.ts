//% color="#ff78f1" icon="\uf3c5" block="GNSS uBlox"
namespace UBLOX_GNSS {

    const DEVICE_ADDR = 0x42
    const MAX_RETRY = 30

    let data_valid: boolean = false
    let utc_time: number = 0
    let utc_date: number = 0
    let gps_fix: number = -1

    let north: boolean = true
    let east: boolean = true

    let latitude: number = 0
    let longitude: number = 0
    let speed: number = 0
    let altitude: number = 0




    //%blockID=getMessage
    //%block="Get NMEA message"
    export function getNMEAMessage() {
        let line = ''
        let rx_byte = 0xff
        let fail_cnt = 0

        do {
            rx_byte = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, false)
            fail_cnt++
        } while ((rx_byte != 0x24) && (fail_cnt < MAX_RETRY))       // Dollar sign, start of line

        if (fail_cnt >= MAX_RETRY) {
            return '1'
        }
        line = ''   // Dump content


        while (rx_byte != 0x0A) {
            rx_byte = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, false)

            if (rx_byte == 0x24) {       // Dollar sign, start of line
                line = ''   // Dump content
            }

            if ((rx_byte == 0x0A) || (rx_byte == 0x0D)) {  // Line feed, end of line  

            } else {
                line = line + String.fromCharCode(rx_byte)
            }

            if (rx_byte == 0xff) {
                fail_cnt++
                if (fail_cnt >= MAX_RETRY) {
                    return '1'
                }
            } else {
                fail_cnt = 0
            }
        }
        return line
    }


    //%blockID=getDegrees
    //%block="Get degrees of %coord"
    export function getDegrees(coord: number) {
        let deg = Math.floor(coord / 100)
        let min = coord - (deg * 100)
        return deg + (min / 60.0)
    }


    //%blockID=parser
    //%block="Parse %nmea"
    export function parseNMEA(nmea: String) {
        let fields = nmea.split(',')

        if (fields[0] == "$GNGGA") {
            utc_time = parseFloat(fields[1])
            latitude = parseFloat(fields[2])
            north = (fields[3] == 'N')
            if(fields[3] == 'S'){
                latitude = latitude * -1.0
            }
            longitude = parseFloat(fields[4])
            east = (fields[5] == 'E')
            if(fields[5] == 'W'){
                longitude = longitude * -1.0
            }
            gps_fix = parseInt(fields[6])
            altitude = parseFloat(fields[9])
            data_valid = (gps_fix > 0)
        }

        else if (fields[0] == ("$GNRMC")) {
            utc_time = parseFloat(fields[1])

            latitude = parseFloat(fields[3])
            longitude = parseFloat(fields[5])

            north = (fields[4] == 'N')
            north = (fields[6] == 'E')
            data_valid = (fields[2] == 'A')
        }

        else {

        }

    }

    //%blockID=loc_min2deg
    //%block="Location %min min to degrees "
    export function loc_min2deg(input: number) {
        let deg = Math.floor(input / 100)
        let min = input - (deg * 100)
        return deg + (min / 60.0)
    }

    //%blockID=isDataValid
    //%block="Is data valid?"
    export function isValid() {
        return data_valid
    }

    //%blockID=getLatitude
    //%block="Get Latitude"
    export function getLatitude() {
        return getDegrees(latitude)
    }

    //%blockID=getLongitude
    //%block="Get Longitude"
    export function getLongitude() {
        return getDegrees(longitude)
    }

    //%blockID=getSpeed
    //%block="Get Speed"
    export function getSpeed() {
        return speed
    }

    //%blockID=getUTCTime
    //%block="Get UTCTime"
    export function getUTCTime() {
        return utc_time
    }

    //%blockID=getUTCDate
    //%block="Get UTCDate"
    export function getUTCDate() {
        return utc_date
    }

    //%blockID=getNorth
    //%block="Get nNorth"
    export function getNorth() {
        return north
    }

    //%blockID=getEast
    //%block="Get East"
    export function getEast() {
        return east
    }

    //%blockID=getAltitude
    //%block="Get Altitude"
    export function getAltitude() {
        return altitude
    }


    //%blockID=getGPSFix
    //%block="Get GPS Fix"
    export function getGPSFix() {
        return gps_fix
    }

}
