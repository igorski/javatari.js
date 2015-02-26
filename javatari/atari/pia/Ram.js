/**
 * Created by ppeccin on 20/11/2014.
 */

function Ram() {

    function init() {
        // RAM comes totally random at creation
        for (var i = bytes.length - 1; i >= 0; i--) {
            bytes[i] = (Math.random() * 256) | 0;
        }
    }

    this.powerOn = function() {
    };

    this.powerOff = function() {
    };

    this.read = function(address) {
        return bytes[address & ADDRESS_MASK];
    };

    this.write = function(address, val) {
        bytes[address & ADDRESS_MASK] = val;
    };

    this.powerFry = function() {
        var variance = 1 - FRY_VARIANCE + 2 * Math.random() * FRY_VARIANCE;
        // Randomly put "0" in bits on the ram
        var fryZeroBits = variance * FRY_ZERO_BITS;
        for (var i = 0; i < fryZeroBits; i++)
            bytes[(Math.random() * 128) | 0] &= ((Math.random() * 256) | 0);
        // Randomly put "1" in bits on the ram
        var fryOneBits = variance * FRY_ONE_BITS;
        for (i = 0; i < fryOneBits; i++)
            bytes[(Math.random() * 128) | 0] |= (0x01 << ((Math.random() * 8) | 0));
    };


    // Savestate  -------------------------------------------

    this.saveState = function() {
        return {
            b: btoa(Util.uInt8ArrayToByteString(bytes))
        };
    };

    this.loadState = function(state) {
        bytes = Util.byteStringToUInt8Array(atob(state.b));
    };


    // Variables  -------------------------------------------

    var bytes = new Array(128);

    var ADDRESS_MASK = 0x007f;

    var FRY_ZERO_BITS = 120;        // Quantity of bits to change
    var FRY_ONE_BITS = 25;
    var FRY_VARIANCE = 0.3;


    init();

}