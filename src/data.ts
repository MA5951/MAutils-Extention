import { HardwareInfoProvider, MotorItem, SensorItem, HardwareProperty } from './functions/hardwareInfo';

export const motors: MotorItem[] = [
    new MotorItem('Falcon 500', [
        new HardwareProperty('Max RPM', '6380'),
        new HardwareProperty('Stall Torque (Nm)', '4.69'),
        new HardwareProperty('Stall Current', '257A'),
        new HardwareProperty('Free Current', '1.5A'),
        new HardwareProperty('Peak Power', '929W'),
        new HardwareProperty('Kv rpm/V', '541'),
        new HardwareProperty('Encoder Steps Pre Rotation', '2048'),
        new HardwareProperty('Nominal Voltage', '12')
    ]),
    new MotorItem('Kraken X60', [
        new HardwareProperty('Max RPM', '6000'),
        new HardwareProperty('Stall Torque (Nm)', '7.09'),
        new HardwareProperty('Stall Current', '366A'),
        new HardwareProperty('Free Current', '2A'),
        new HardwareProperty('Peak Power', '1108W'),
        new HardwareProperty('Kv rpm/V', 'NA'),
        new HardwareProperty('Encoder Steps Pre Rotation', 'NA'),
        new HardwareProperty('Nominal Voltage', '12')
    ]),
    new MotorItem('Neo V1.1', [
        new HardwareProperty('Max RPM', '5820'),
        new HardwareProperty('Stall Torque (Nm)', '2.6'),
        new HardwareProperty('Stall Current', '105A'),
        new HardwareProperty('Free Current', '1.8A'),
        new HardwareProperty('Peak Power', '406W'),
        new HardwareProperty('Kv rpm/V', '473'),
        new HardwareProperty('Encoder Steps Pre Rotation', '42'),
        new HardwareProperty('Nominal Voltage', '12')
    ]),
    new MotorItem('MiniNeo', [
        new HardwareProperty('Max RPM', '11000 '),
        new HardwareProperty('Stall Torque (Nm)', '0.97'),
        new HardwareProperty('Stall Current', '100 A'),
        new HardwareProperty('Free Current', '1.4A'),
        new HardwareProperty('Peak Power', '279'),
        new HardwareProperty('Kv rpm/V', '917 '),
        new HardwareProperty('Encoder Steps Pre Rotation', '42'),
        new HardwareProperty('Nominal Voltage', '12')
    ]),
    new MotorItem('NeoVortex', [
        new HardwareProperty('Max RPM', '6784'),
        new HardwareProperty('Stall Torque (Nm)', '3.6'),
        new HardwareProperty('Stall Current', '211A'),
        new HardwareProperty('Free Current', '3.6A'),
        new HardwareProperty('Peak Power', '640W'),
        new HardwareProperty('Kv rpm/V', '565'),
        new HardwareProperty('Encoder Steps Pre Rotation', 'NA'),
        new HardwareProperty('Nominal Voltage', '12')
    ])
    // Add other motors...
];

export const sensors: SensorItem[] = [
    new SensorItem('REV Magnetic Limit Switch', [
        new HardwareProperty('Sensor Type', 'Digital, Active-low'),
        new HardwareProperty('Voltage Range', '3.3V - 5.0V'),
        new HardwareProperty('Typical Trigger Distances', 'Top: 10mm Side: 5mm'),
    ]),
    new SensorItem('REV 2m Distance Sensor', [
        new HardwareProperty('Sensor Type', 'I2C'),
        new HardwareProperty('Voltage Range', '3.3V - 5.0V'),
        new HardwareProperty('I2C Address', '0x52'),
        new HardwareProperty('Measurement Range', '5cm - 200cm'),
        new HardwareProperty('Measurement Resolution', '1mm'),
        new HardwareProperty('Field of View', '25°')
    ]),
    new SensorItem('REV Color Sensor V3', [
        new HardwareProperty('Sensor Type', 'I2C'),
        new HardwareProperty('Voltage Range', '3.3V - 5.0V'),
        new HardwareProperty('I2C Address', '0x52'),
        new HardwareProperty('Measurement channels', 'Red, Green, Blue, Alpha, and Proximity'),
        new HardwareProperty('Proximity Sensor Range', '1cm - 10cm')
    ]), 
    new SensorItem('REV Through Bore Encoder', [
        new HardwareProperty('Sensor Type', 'ABI / SPI / SSI'),
        new HardwareProperty('Voltage Range', '3.3V - 5.0V'),
        new HardwareProperty('Ticks Pre Rotation', '8192'),
        new HardwareProperty('Maximum Rotation Speed (RPM)', '10000'),
    ]),
    new SensorItem('CTRE CANcoder', [
        new HardwareProperty('Sensor Type', 'CAN bus'),
        new HardwareProperty('Voltage Range', '6V - 16V'),
        new HardwareProperty('Ticks Pre Rotation', '4096'),
        new HardwareProperty('Maximum Rotation Speed (RPM)', '15000'),
    ]),
    new SensorItem('CTRE Pigeon 2.0', [
        new HardwareProperty('Sensor Type', 'CAN bus'),
        new HardwareProperty('Voltage Range', '6V - 28V'),
        new HardwareProperty('Gyroscope Range (dps)', '125 - 2000'),
        new HardwareProperty('Gyroscope Resolution', '16 bits'),
        new HardwareProperty('Accelerometer Range', '+/- 8g'),
        new HardwareProperty('Accelerometer Resolution', '16 bits'),
    ]),
    new SensorItem('CTRE SRX Mag Encoder', [
        new HardwareProperty('Sensor Type', 'PWM / Quadrature'),
        new HardwareProperty('Voltage Range', '3.7V - 6V'),
        new HardwareProperty('Ticks Pre Rotation', '1024 / 4096'),
        new HardwareProperty('Maximum Rotation Speed (RPM)', '15000'),
    ]),  // Add other sensors...
    // Add other sensors...
];