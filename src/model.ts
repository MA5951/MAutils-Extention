// src/model.ts
export enum ItemType {
  Category,
  Type,
}

export interface Item {
  id: string;
  label: string;
  description?: string;
  type: ItemType;
  children?: Item[];
  markdownPath?: string;
}

export const data: Item[] = [
  {
    id: 'sensors',
    label: 'Sensors',
    type: ItemType.Category,
    children: [
      {
        id: 'sensor1',
        label: 'Sensor 1',
        type: ItemType.Type,
        description: 'Sensor 1 specification',
        markdownPath: 'frcSpecification/sensor/sensor1.md',
      },
      // Add more sensor types as needed
    ],
  },
  {
    id: 'motors',
    label: 'Motors',
    type: ItemType.Category,
    children: [
      {
        id: 'motor1',
        label: 'Motor 1',
        type: ItemType.Type,
        description: 'Motor 1 specification',
        markdownPath: 'frcSpecification/motor/motor1.md',
      },
      // Add more motor types as needed
    ],
  },
  // Add more categories as needed
];
