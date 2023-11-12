// hardwareInfo.ts

import * as vscode from 'vscode';

export class MotorProperty {
    label: string;
    value: string;

    constructor(label: string, value: string) {
        this.label = label;
        this.value = value;
    }
}

export class MotorItem {
    label: string;
    properties: MotorProperty[];

    constructor(label: string, properties: MotorProperty[]) {
        this.label = label;
        this.properties = properties;
    }
}

export class SensorItem {
    label: string;
    properties: MotorProperty[];

    constructor(label: string, properties: MotorProperty[]) {
        this.label = label;
        this.properties = properties;
    }
}

export class HardwareInfoProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null> = new vscode.EventEmitter<vscode.TreeItem | undefined | null>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null> = this._onDidChangeTreeData.event;

    motors: MotorItem[];
    sensors: SensorItem[];

    constructor(motors: MotorItem[], sensors: SensorItem[]) {
        this.motors = motors;
        this.sensors = sensors;
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
        if (!element) {
            // Root level: Motors and Sensors
            return [
                new vscode.TreeItem('Motors', vscode.TreeItemCollapsibleState.Collapsed),
                new vscode.TreeItem('Sensors', vscode.TreeItemCollapsibleState.Collapsed)
            ];
        }

        if (element.label === 'Motors') {
            // Child level: Motors
            return this.motors.map(motor => new vscode.TreeItem(motor.label, vscode.TreeItemCollapsibleState.Collapsed));
        }

        if (element.label === 'Sensors') {
            // Child level: Sensors
            return this.sensors.map(sensor => new vscode.TreeItem(sensor.label, vscode.TreeItemCollapsibleState.Collapsed));
        }

        // Child level: Motor Properties or Sensor Properties
        const motor = this.motors.find(m => m.label === element.label);
        if (motor) {
            return motor.properties.map(prop => new vscode.TreeItem(`${prop.label}: ${prop.value}`, vscode.TreeItemCollapsibleState.None));
        }

        const sensor = this.sensors.find(s => s.label === element.label);
        if (sensor) {
            return sensor.properties.map(prop => new vscode.TreeItem(`${prop.label}: ${prop.value}`, vscode.TreeItemCollapsibleState.None));
        }

        return [];
    }

    resolveTreeItem(item: vscode.TreeItem): Thenable<vscode.TreeItem> {
        return Promise.resolve(item);
    }

    refresh(node?: vscode.TreeItem | null): void {
        this._onDidChangeTreeData.fire(node);
    }
}
