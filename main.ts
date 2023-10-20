//% color="#ff78f1" icon="\uf3c5" block="GNSS uBlox"
namespace UBLOX_GNSS {

    const DEVICE_ADDR = 0x42

    let data_valid: boolean = false
    let utc_time: number = 0
    let utc_date: number = 0

    let north: boolean = true
    let east: boolean = true

    let latitude: number = 0
    let longitude: number = 0
    let speed: number = 0


    //%blockID=getMessage
    //%block="Get NMEA message"
    export function getNMEAMessage(){
        let line = ''
        let rx_byte = 0xff

        while (rx_byte != 0x0A){
            rx_byte = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, false)

            if (rx_byte == 0x24){       // Dollar sign, start of line
                line = ''   // Dump content
            }
            
            if ((rx_byte == 0x0A) || (rx_byte == 0x0D)){  // Line feed, end of line  

            } else {
                line = line + String.fromCharCode(rx_byte)
            }
        }
        return line
    }

    //%blockID=parser
    //%block="Parse %nmea"
    export function parseNMEA(nmea: String){
        let fields = nmea.split(',')
        if(fields[0].includes("RMC")){
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

    //%blockID=isDataValid
    //%block="Is data valid?"
    export function isValid() {
        return data_valid
    }

    //%blockID=getLatitude
    //%block="Get Latitude"
    export function getLatitude(){
        return latitude
    }

    //%blockID=getLongitude
    //%block="Get Longitude"
    export function getLongitude() {
        return longitude
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




}
