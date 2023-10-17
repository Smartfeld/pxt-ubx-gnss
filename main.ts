
//% color="#ff78f1" icon="\uf3c5" block="GNSS uBlox"
namespace UBX_GNSS {

    const DEVICE_ADDR = 0x42

    //%blockId=gnss_reg
    //%block="Read GNSS Module Register"
    export function readRegister(reg: GNSS_REG) {
        pins.i2cWriteNumber(DEVICE_ADDR, reg, NumberFormat.Int8LE, true)
        let val = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, false)
        return val
    }

    //%blockId=latitude
    //%block="Latitude"
    export function getLatitude() {
        pins.i2cWriteNumber(DEVICE_ADDR, GNSS_REG.I2C_LAT_1, NumberFormat.Int8LE, true)
        let LAT_1 = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, true)
        let LAT_2 = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, false)
        return LAT_1 + LAT_2 / 100
    }

    //%blockId=longitude
    //%block="Longitude"
    export function getLongitude() {
        pins.i2cWriteNumber(DEVICE_ADDR, GNSS_REG.I2C_LON_1, NumberFormat.Int8LE, true)
        let LON_1 = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, true)
        let LON_2 = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, false)
        return LON_1 + LON_2 / 100
    }

    //%blockId=altiutude
    //%block="Altitude"
    export function getAltitude() {
        pins.i2cWriteNumber(DEVICE_ADDR, GNSS_REG.I2C_ALT_H, NumberFormat.Int8LE, true)
        let ALT_H = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, true)
        let ALT_L = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, false)
        return (ALT_H << 8) | ALT_L
    }

    //%blockId=time
    //%block="Time"
    export function getTime() {
        pins.i2cWriteNumber(DEVICE_ADDR, GNSS_REG.I2C_HOUR, NumberFormat.Int8LE, true)
        let hh = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, true)
        let mm = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, true)
        let ss = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, false)
        return hh + ":" + mm + ":" + ss
    }

    //%blockId=date
    //%block="Date"
    export function getDate() {
        pins.i2cWriteNumber(DEVICE_ADDR, GNSS_REG.I2C_YEAR_H, NumberFormat.Int8LE, true)
        let Y_H = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, true)
        let Y_L = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, true)
        let MM = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, true)
        let DD = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, false)
        return ((Y_H << 8) | Y_L) + "/" + MM + "/" + DD
    }


}