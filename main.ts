//% color="#ff78f1" icon="\uf3c5" block="GNSS uBlox"
namespace UBX_GNSS {

    const DEVICE_ADDR = 0x42

    //%blockId=addChecksum
    //%block="Add UBX Checksum to %buffer"
    export function addChecksum(buffer: Buffer, n: Number): Buffer {
        
        let CK_A = 0
        let CK_B = 0
        for(let i=0; i < n; i++)
        {
            CK_A = CK_A + buffer[i]
            CK_B = CK_B + CK_A
        }
        return buffer.concat(Buffer.fromArray([CK_A, CK_B]))
    }

    //%blockId=getBufferLength
    //%block="Get Buffer length"
    export function getBufferLength() {
        pins.i2cWriteNumber(DEVICE_ADDR, 0xFD, NumberFormat.Int8LE, true)
        let len_h = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, true)
        let len_l = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, false)
        return ((len_h << 8) | len_l)
    }



    //%blockId=time
    //%block="Time"
    export function getTime() {
        pins.i2cWriteNumber(DEVICE_ADDR, 0xf0, NumberFormat.Int8LE, true)
        let hh = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, true)
        let mm = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, true)
        let ss = pins.i2cReadNumber(DEVICE_ADDR, NumberFormat.UInt8LE, false)
        return hh + ":" + mm + ":" + ss
    }



}
