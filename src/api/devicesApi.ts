// src/api/devicesApi.ts

export interface DeviceModel {
  id: string;
  name: string;
}

export const fetchDeviceModels = async (): Promise<DeviceModel[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const dummyModels: DeviceModel[] = [
    { id: 'model_iphone14', name: 'iPhone 14' },
    { id: 'model_iphone14_pro', name: 'iPhone 14 Pro' },
    { id: 'model_s23', name: 'Samsung Galaxy S23' },
    { id: 'model_s23_ultra', name: 'Samsung Galaxy S23 Ultra' },
    { id: 'model_pixel7', name: 'Google Pixel 7' },
  ];

  return dummyModels;
};