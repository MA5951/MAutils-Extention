import { HardwareInfoProvider, MotorItem, SensorItem, HardwareProperty } from './functions/hardwareInfo';

export const motors: MotorItem[] = [
    new MotorItem('Motor1', [
        new HardwareProperty('rpm', '1000'),
        new HardwareProperty('voltage', '12')
    ]),
    new MotorItem('Motor2', [
        new HardwareProperty('rpm', '2000'),
        new HardwareProperty('voltage', '16')
    ])
    // Add other motors...
];

export const sensors: SensorItem[] = [
    new SensorItem('Sensor1', [
        new HardwareProperty('property1', 'value1'),
        new HardwareProperty('property2', 'value2')
    ])
    // Add other sensors...
];