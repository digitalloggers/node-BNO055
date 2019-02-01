var i2c = require('i2c-bus');
var async = require('async');

// https://www.adafruit.com/datasheets/BST_BNO055_DS000_12.pdf 


var BNO055_ID                            = 0xA0;

// Page id register definition
var BNO055_PAGE_ID_ADDR                  = 0X07;

// PAGE0 REGISTER DEFINITION START
var BNO055_CHIP_ID_ADDR                  = 0x00;
var BNO055_ACCEL_REV_ID_ADDR             = 0x01;
var BNO055_MAG_REV_ID_ADDR               = 0x02;
var BNO055_GYRO_REV_ID_ADDR              = 0x03;
var BNO055_SW_REV_ID_LSB_ADDR            = 0x04;
var BNO055_SW_REV_ID_MSB_ADDR            = 0x05;
var BNO055_BL_REV_ID_ADDR                = 0X06;

// Accel data register
var BNO055_ACCEL_DATA_X_LSB_ADDR         = 0X08;
var BNO055_ACCEL_DATA_X_MSB_ADDR         = 0X09;
var BNO055_ACCEL_DATA_Y_LSB_ADDR         = 0X0A;
var BNO055_ACCEL_DATA_Y_MSB_ADDR         = 0X0B;
var BNO055_ACCEL_DATA_Z_LSB_ADDR         = 0X0C;
var BNO055_ACCEL_DATA_Z_MSB_ADDR         = 0X0D;

// Mag data register
var BNO055_MAG_DATA_X_LSB_ADDR           = 0X0E;
var BNO055_MAG_DATA_X_MSB_ADDR           = 0X0F;
var BNO055_MAG_DATA_Y_LSB_ADDR           = 0X10;
var BNO055_MAG_DATA_Y_MSB_ADDR           = 0X11;
var BNO055_MAG_DATA_Z_LSB_ADDR           = 0X12;
var BNO055_MAG_DATA_Z_MSB_ADDR           = 0X13;

// Gyro data registers
var BNO055_GYRO_DATA_X_LSB_ADDR          = 0X14;
var BNO055_GYRO_DATA_X_MSB_ADDR          = 0X15;
var BNO055_GYRO_DATA_Y_LSB_ADDR          = 0X16;
var BNO055_GYRO_DATA_Y_MSB_ADDR          = 0X17;
var BNO055_GYRO_DATA_Z_LSB_ADDR          = 0X18;
var BNO055_GYRO_DATA_Z_MSB_ADDR          = 0X19;

// Euler data registers
var BNO055_EULER_H_LSB_ADDR              = 0X1A;
var BNO055_EULER_H_MSB_ADDR              = 0X1B;
var BNO055_EULER_R_LSB_ADDR              = 0X1C;
var BNO055_EULER_R_MSB_ADDR              = 0X1D;
var BNO055_EULER_P_LSB_ADDR              = 0X1E;
var BNO055_EULER_P_MSB_ADDR              = 0X1F;

// Quaternion data registers
var BNO055_QUATERNION_DATA_W_LSB_ADDR    = 0X20;
var BNO055_QUATERNION_DATA_W_MSB_ADDR    = 0X21;
var BNO055_QUATERNION_DATA_X_LSB_ADDR    = 0X22;
var BNO055_QUATERNION_DATA_X_MSB_ADDR    = 0X23;
var BNO055_QUATERNION_DATA_Y_LSB_ADDR    = 0X24;
var BNO055_QUATERNION_DATA_Y_MSB_ADDR    = 0X25;
var BNO055_QUATERNION_DATA_Z_LSB_ADDR    = 0X26;
var BNO055_QUATERNION_DATA_Z_MSB_ADDR    = 0X27;

// Linear acceleration data registers
var BNO055_LINEAR_ACCEL_DATA_X_LSB_ADDR  = 0X28;
var BNO055_LINEAR_ACCEL_DATA_X_MSB_ADDR  = 0X29;
var BNO055_LINEAR_ACCEL_DATA_Y_LSB_ADDR  = 0X2A;
var BNO055_LINEAR_ACCEL_DATA_Y_MSB_ADDR  = 0X2B;
var BNO055_LINEAR_ACCEL_DATA_Z_LSB_ADDR  = 0X2C;
var BNO055_LINEAR_ACCEL_DATA_Z_MSB_ADDR  = 0X2D;

// Gravity data registers
var BNO055_GRAVITY_DATA_X_LSB_ADDR       = 0X2E;
var BNO055_GRAVITY_DATA_X_MSB_ADDR       = 0X2F;
var BNO055_GRAVITY_DATA_Y_LSB_ADDR       = 0X30;
var BNO055_GRAVITY_DATA_Y_MSB_ADDR       = 0X31;
var BNO055_GRAVITY_DATA_Z_LSB_ADDR       = 0X32;
var BNO055_GRAVITY_DATA_Z_MSB_ADDR       = 0X33;

// Temperature data register
var BNO055_TEMP_ADDR                     = 0X34;

// Status registers
var BNO055_CALIB_STAT_ADDR               = 0X35;
var BNO055_SELFTEST_RESULT_ADDR          = 0X36;
var BNO055_INTR_STAT_ADDR                = 0X37;

var BNO055_SYS_CLK_STAT_ADDR             = 0X38;
var BNO055_SYS_STAT_ADDR                 = 0X39;
var BNO055_SYS_ERR_ADDR                  = 0X3A;

// Unit selection register
var BNO055_UNIT_SEL_ADDR                 = 0X3B;
var BNO055_DATA_SELECT_ADDR              = 0X3C;

// Mode registers
var BNO055_OPR_MODE_ADDR                 = 0X3D;
var BNO055_PWR_MODE_ADDR                 = 0X3E;

var BNO055_SYS_TRIGGER_ADDR              = 0X3F;
var BNO055_TEMP_SOURCE_ADDR              = 0X40;

// Axis remap registers
var BNO055_AXIS_MAP_CONFIG_ADDR          = 0X41;
var BNO055_AXIS_MAP_SIGN_ADDR            = 0X42;


// SIC registers
var BNO055_SIC_MATRIX_0_LSB_ADDR         = 0X43;
var BNO055_SIC_MATRIX_0_MSB_ADDR         = 0X44;
var BNO055_SIC_MATRIX_1_LSB_ADDR         = 0X45;
var BNO055_SIC_MATRIX_1_MSB_ADDR         = 0X46;
var BNO055_SIC_MATRIX_2_LSB_ADDR         = 0X47;
var BNO055_SIC_MATRIX_2_MSB_ADDR         = 0X48;
var BNO055_SIC_MATRIX_3_LSB_ADDR         = 0X49;
var BNO055_SIC_MATRIX_3_MSB_ADDR         = 0X4A;
var BNO055_SIC_MATRIX_4_LSB_ADDR         = 0X4B;
var BNO055_SIC_MATRIX_4_MSB_ADDR         = 0X4C;
var BNO055_SIC_MATRIX_5_LSB_ADDR         = 0X4D;
var BNO055_SIC_MATRIX_5_MSB_ADDR         = 0X4E;
var BNO055_SIC_MATRIX_6_LSB_ADDR         = 0X4F;
var BNO055_SIC_MATRIX_6_MSB_ADDR         = 0X50;
var BNO055_SIC_MATRIX_7_LSB_ADDR         = 0X51;
var BNO055_SIC_MATRIX_7_MSB_ADDR         = 0X52;
var BNO055_SIC_MATRIX_8_LSB_ADDR         = 0X53;
var BNO055_SIC_MATRIX_8_MSB_ADDR         = 0X54;

// Accelerometer Offset registers
var ACCEL_OFFSET_X_LSB_ADDR              = 0X55;
var ACCEL_OFFSET_X_MSB_ADDR              = 0X56;
var ACCEL_OFFSET_Y_LSB_ADDR              = 0X57;
var ACCEL_OFFSET_Y_MSB_ADDR              = 0X58;
var ACCEL_OFFSET_Z_LSB_ADDR              = 0X59;
var ACCEL_OFFSET_Z_MSB_ADDR              = 0X5A;

// Magnetometer Offset registers
var MAG_OFFSET_X_LSB_ADDR                = 0X5B;
var MAG_OFFSET_X_MSB_ADDR                = 0X5C;
var MAG_OFFSET_Y_LSB_ADDR                = 0X5D;
var MAG_OFFSET_Y_MSB_ADDR                = 0X5E;
var MAG_OFFSET_Z_LSB_ADDR                = 0X5F;
var MAG_OFFSET_Z_MSB_ADDR                = 0X60

// Gyroscope Offset register s
var GYRO_OFFSET_X_LSB_ADDR               = 0X61;
var GYRO_OFFSET_X_MSB_ADDR               = 0X62;
var GYRO_OFFSET_Y_LSB_ADDR               = 0X63;
var GYRO_OFFSET_Y_MSB_ADDR               = 0X64;
var GYRO_OFFSET_Z_LSB_ADDR               = 0X65;
var GYRO_OFFSET_Z_MSB_ADDR               = 0X66;

// Radius registers
var ACCEL_RADIUS_LSB_ADDR                = 0X67;
var ACCEL_RADIUS_MSB_ADDR                = 0X68;
var MAG_RADIUS_LSB_ADDR                  = 0X69;
var MAG_RADIUS_MSB_ADDR                  = 0X6A;



var BNO055 = module.exports = function(options) {
  var options = options || {};
  options.device = options.device || '/dev/i2c-1';
  options.debug = options.debug || false;

  var address = BNO055.ADDRESS_A;
  if ('address' in options)
    address = options.address;

  var bus;
  if ('bus' in options)
    bus = options.bus;
  else
    bus = parseInt(options.device.match(new RegExp("^/dev/i2c-([0-9]*)"))[1]);

  var i2cbus = i2c.openSync(bus);
  this.wire = {
    i2cbus: i2cbus,
    readBytes: function(addr, count, callback) {
      var buffer = Buffer.alloc(count);
      return this.i2cbus.readI2cBlock(this.address, addr, count, buffer, function(err, bytesRead, buffer) { return callback(err, err?null:Array.prototype.slice.call(buffer, 0));});
    },
    writeBytes: function(addr, bytes, callback) {
      if (bytes && bytes.length == 1)
        return this.i2cbus.writeByte(this.address, addr, bytes[0], callback);
      else {
        var buffer = Buffer.from(bytes || []);
        return this.i2cbus.writeI2cBlock(this.address, addr, buffer.length, buffer, callback);
      }
    },
    address: address
  }

  this.options = options;
};

// I2C addresses
BNO055.ADDRESS_A                         = 0x28;
BNO055.ADDRESS_B                         = 0x29;

// Power modes
BNO055.POWER_MODE_NORMAL                 = 0X00;
BNO055.POWER_MODE_LOWPOWER               = 0X01;
BNO055.POWER_MODE_SUSPEND                = 0X02;

// Operation mode settings
BNO055.OPERATION_MODE_CONFIG             = 0X00;
BNO055.OPERATION_MODE_ACCONLY            = 0X01;
BNO055.OPERATION_MODE_MAGONLY            = 0X02;
BNO055.OPERATION_MODE_GYRONLY            = 0X03;
BNO055.OPERATION_MODE_ACCMAG             = 0X04;
BNO055.OPERATION_MODE_ACCGYRO            = 0X05;
BNO055.OPERATION_MODE_MAGGYRO            = 0X06;
BNO055.OPERATION_MODE_AMG                = 0X07;
BNO055.OPERATION_MODE_IMUPLUS            = 0X08;
BNO055.OPERATION_MODE_COMPASS            = 0X09;
BNO055.OPERATION_MODE_M4G                = 0X0A;
BNO055.OPERATION_MODE_NDOF_FMC_OFF       = 0X0B;
BNO055.OPERATION_MODE_NDOF               = 0X0C;

// Axis remap values
BNO055.AXIS_REMAP_X                         = 0x00;
BNO055.AXIS_REMAP_Y                         = 0x01;
BNO055.AXIS_REMAP_Z                         = 0x02;
BNO055.AXIS_REMAP_POSITIVE                  = 0x00;
BNO055.AXIS_REMAP_NEGATIVE                  = 0x01;

/* See datasheet pg. 24 */
BNO055.orientation = function(xRemap, yRemap, zRemap, xDirection, yDirection, zDirection) {
  var axis_map = xRemap | (yRemap<<2) | (zRemap<<4);
  var axis_signs = xDirection | (yDirection<<1) | (zDirection<<1);

  return [axis_map, axis_signs];
}

BNO055.DEFAULT_ORIENTATION = BNO055.orientation(BNO055.AXIS_REMAP_X, BNO055.AXIS_REMAP_Y, BNO055.AXIS_REMAP_Z, BNO055.AXIS_REMAP_POSITIVE, BNO055.AXIS_REMAP_POSITIVE, BNO055.AXIS_REMAP_POSITIVE);

BNO055.prototype.beginNDOF = function(cb) {
  this.begin(BNO055.OPERATION_MODE_NDOF, cb);
}

BNO055.prototype.begin = function(mode, cb) {
  var self = this;
  var startupRoutines = [
    function throwAwayCommand(callback) {
      self.wire.writeBytes(BNO055_PAGE_ID_ADDR, 0, function(err) {
        callback(null,true); // eat any errors by setting callback's first param to null
      });
    },
    function configMode(callback) {
      self.setModeConfig(callback);
    },
    function pageZero(callback) {
      self.wire.writeBytes(BNO055_PAGE_ID_ADDR, 0, function(err) {
        callback(err,true);
      });
    },
    function validateChipIdentifier(callback) {
      self.validateChipIdentifier(callback);
    },
    function resetChip(callback) {
      self.reset(callback);
    },
    function normalPower(callback) {
      self.wire.writeBytes(BNO055_PWR_MODE_ADDR, [BNO055.POWER_MODE_NORMAL], function(err) {
        callback(err, true);
      })
    },
    function internalOscillator(callback) {
      self.wire.writeBytes(BNO055_SYS_TRIGGER_ADDR, [0x0], function(err) {
        callback(err, true);
      })
    }
  ];

  if ( self.options.orientation ) {
    startupRoutines.push(
      function initializeOrientation(callback) {
        self.wire.writeBytes(BNO055_AXIS_MAP_CONFIG_ADDR, self.options.orientation, callback);
      }
    );
  }

  // if an initial calibration has been supplied, write it before entering operating mode  
  if ( self.options.calibration ) {
    startupRoutines.push(
      function initializeCalibration(callback) {
        self.writeVector(ACCEL_OFFSET_X_LSB_ADDR, self.options.calibration, callback);
      }
    );
  }

  startupRoutines.push(function normalOperationMode(callback) {
    self.setMode(mode, callback)
  });

  async.series(startupRoutines, function(err, res) {
    cb(err, true);
  });
}

BNO055.prototype.validateChipIdentifier = function(cb) {
  this.wire.readBytes(BNO055_CHIP_ID_ADDR, 1, function(err, res) {
    if (err) {
      return cb(err);
    }
    if (res.toString('hex') != BNO055_ID.toString(16)) {
      return cb(new Error("Chip ID check failed, returned " + res.toString('hex')));
    }

    cb(null, true);
  });
}

BNO055.prototype.readVector = function(register, count, cb) {
  var result = [];
  this.wire.readBytes(register, count*2, function(err, res) {
    if (err) {
      return cb(err);
    }
    for (var i=0; i<count; i++) {
      result[i] = ((res[i*2+1] << 8) | res[i*2]) & 0xFFFF;
      if (result[i] > 32767) result[i] -= 65536;
    }
    cb(null, result);
  });
}

BNO055.prototype.writeVector = function(register, data, cb) {
  var bytes = [];
  for (var i=0; i<data.length; i++) {
    bytes.push(data[i] & 0xFFFF);
    bytes.push( (data[i]>>8) & 0xFFFF );
  }
  this.wire.writeBytes(register, bytes, cb);
};

BNO055.prototype.getTemperature = function(cb) {
  this.wire.readBytes(BNO055_TEMP_ADDR, 1, function(err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, res[0]);
  });
}

/*
  3 indicates fully calibrated; 0 indicates not calibrated
*/
BNO055.prototype.getCalibrationStatus = function(cb) {
  this.wire.readBytes(BNO055_CALIB_STAT_ADDR, 1, function(err, res) {
    if (err) {
      return cb(err);
    }
    var calib = res[0];
    cb(null, {
        systemStatus: (calib&0xC0)>>6,
        gyroStatus: (calib&0x30)>>4,
        accelerometerStatus: (calib&0x0C)>>2,
        magnetometerStatus: (calib&0x03)
      });
  });
}

BNO055.prototype.getCalibrationData = function(cb) {
  var self = this;
  var lastMode = this.primaryMode;

  var calibrationData = null;

  async.series([
    function configMode(callback) {
      self.setModeConfig(callback);
    },
    function readCalibrationData(callback) {
      self.readVector(ACCEL_OFFSET_X_LSB_ADDR, 11, function(err, res) {
        if (err) {
          return cb(err);
        }
        calibrationData = res;
        callback(null, true);
      });      
    },
    function primaryMode(callback) {
      self.setMode(lastMode, callback);
    }
  ], function(err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, calibrationData);
  });
}

BNO055.prototype.getSystemStatus = function(cb) {
  var self = this;
  var selfTestResult;
  var systemStatus;
  var systemErr;

  var lastMode = this.primaryMode;

  async.waterfall([
    function configMode(callback) {
      self.setModeConfig(callback);
    },
    function readTrigger(mode, callback) {
      self.wire.readBytes(BNO055_SYS_TRIGGER_ADDR, 1, callback);
    },
    function writeTrigger(trigger, callback) {
      self.wire.writeBytes(BNO055_SYS_TRIGGER_ADDR, [trigger | 0x1], callback);
    },
    function wait(callback) {
      setTimeout(callback, 1000);
    },
    function readSelfTest(callback) {
      self.wire.readBytes(BNO055_SELFTEST_RESULT_ADDR, 1, function(err, res) {
        selfTestResult = res;
        callback(err);
      });
    },
    function primaryMode(callback) {
      self.setMode(lastMode, callback);
    },
    function readSystemStatus(mode, callback) {
      self.wire.readBytes(BNO055_SYS_STAT_ADDR, 1, function(err, res) {
        systemStatus = res;
        callback(err);
      });
    },
    function readSystemError(callback) {
      self.wire.readBytes(BNO055_SYS_ERR_ADDR, 1, function(err, res) {
        systemErr = res;
        callback(err);
      });
    }
    
  ], function(err,res) {
    if (err) {
      return cb(err);
    }
    cb(null, {selfTestResult: selfTestResult.toString('binary'), systemStatus: systemStatus, systemErr: systemErr});
  });
}


BNO055.prototype.getMagnetometer = function(cb) {
  this.readVector(BNO055_MAG_DATA_X_LSB_ADDR, 3, function(err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, {x: res[0] / 16.0, y: res[1] / 16.0, z: res[2] / 16.0 });
  });
}

BNO055.prototype.getAccelerometer = function(cb) {
  this.readVector(BNO055_ACCEL_DATA_X_LSB_ADDR, 3, function(err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, {x: res[0] / 100.0, y: res[1] / 100.0, z: res[2] / 100.0 });
  });
}

BNO055.prototype.getLinearAcceleration = function(cb) {
  this.readVector(BNO055_LINEAR_ACCEL_DATA_X_LSB_ADDR, 3, function(err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, {x: res[0] / 100.0, y: res[1] / 100.0, z: res[2] / 100.0 });
  });
}

BNO055.prototype.getGravity = function(cb) {
  this.readVector(BNO055_GRAVITY_DATA_X_LSB_ADDR, 3, function(err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, {x: res[0] / 100.0, y: res[1] / 100.0, z: res[2] / 100.0 });
  });
}

BNO055.prototype.getGyroscope = function(cb) {
  this.readVector(BNO055_GYRO_DATA_X_LSB_ADDR, 3, function(err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, {x: res[0] / 900.0, y: res[1] / 900.0, z: res[2] / 900.0 });
  });
}

BNO055.prototype.getQuaternion = function(cb) {
  this.readVector(BNO055_QUATERNION_DATA_W_LSB_ADDR, 4, function(err, res) {
    if (err) {
      return cb(err);
    }
    var scale = (1.0 / (1<<14));
    cb(null, {w: res[0] * scale, x: res[1] * scale, y: res[2] * scale, z: res[3] * scale });
  });
}

BNO055.prototype.getEuler = function(cb) {
  this.readVector(BNO055_EULER_H_LSB_ADDR, 3, function(err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, {heading: res[0]/16.0, roll: res[1]/16.0, pitch: res[2]/16.0});
  });
}

BNO055.prototype.getMode = function(cb) {
  this.wire.readBytes(BNO055_OPR_MODE_ADDR, 1, function(err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, res);
  });
}

BNO055.prototype.setMode = function(mode, cb) {
  this.primaryMode = mode;
  this.wire.writeBytes(BNO055_OPR_MODE_ADDR, [mode], function(err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, mode);
  });
}

BNO055.prototype.setModeConfig = function(cb) {
  this.setMode(BNO055.OPERATION_MODE_CONFIG, cb);
}

BNO055.prototype.setModeNDOF = function(cb) {
  this.setMode(BNO055.OPERATION_MODE_NDOF, cb);
}

BNO055.prototype.reset = function(cb) {
  this.wire.writeBytes(BNO055_SYS_TRIGGER_ADDR, [0x20], function(err) {
    setTimeout(function(){
      cb(err, true);
    }, 650);
  });
}
