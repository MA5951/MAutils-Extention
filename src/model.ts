// src/model.ts
export enum ItemType {
  Category = 'category',
  Type = 'type',
}

export interface Item {
  id: string;
  label: string;
  description?: string;
  type: ItemType;
  children?: Item[];
}

export const data: Item[] = [
  {
    id: 'sensors',
    label: 'Sensors',
    type: ItemType.Category,
    children: [
      { id: 'sensor1', label: 'Sensor 1', type: ItemType.Type, description: 'Sensor 1 specification' },
      { id: 'sensor2', label: 'Sensor 2', type: ItemType.Type, description: 'Sensor 2 specification' },
      // Add more sensor types as needed
    ],
  },
  {
    id: 'motors',
    label: 'Motors',
    type: ItemType.Category,
    children: [
      { id: 'motor1', label: 'Motor 1', type: ItemType.Type, description: 'Motor 1 specification' },
      { id: 'motor2', label: 'Motor 2', type: ItemType.Type, description: 'Motor 2 specification' },
      // Add more motor types as needed
    ],
  },
  // Add more categories as needed
];
