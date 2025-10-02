import type { Job, RepairFormData } from '../types';

export interface RepairSearchFilters {
  [key: string]: any;
}

const dummyJobs: Job[] = [
    {
      id: '41605',
      acceptanceNumber: '41605-2025',
      customer: { id: '1', name: 'RAFAELLA', phone: '12345' },
      createdDate: '30-09-2025 09:43',
      deviceType: 'SMARTPHONE',
      brand: 'SAMSUNG',
      model: 'A30S SM-A307F',
      currentStatus: 'IN REPAIR',
      technician: { id: '1', name: 'PHONE CARE TEK', branch: 'TUSCOLANA' },
      createdBy: { id: '2', name: 'PHONE CARE', branch: 'TUSCOLANA' },
      deliveryDate: null,
      estimatedPrice: 25,
    },
    {
      id: '41604',
      acceptanceNumber: '41604-2025',
      customer: { id: '2', name: 'GIULIANO PALESTRA', phone: '67890' },
      createdDate: '30-09-2025 09:36',
      deviceType: 'PC / ALL IN ONE',
      brand: 'APPLE',
      model: 'iMac A1418 21,5"',
      currentStatus: 'IN REPAIR',
      technician: { id: '3', name: 'ANDREAB', branch: 'SPR.SRL' },
      createdBy: { id: '3', name: 'ANDREAB', branch: 'SPR.SRL' },
      deliveryDate: null,
      estimatedPrice: 0,
    },
  ];

// Function to search/filter all acceptance jobs
export const searchAcceptances = async (filters: RepairSearchFilters): Promise<Job[]> => {
  console.log('Searching jobs with filters:', filters);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return dummyJobs;
};

// Function for the dashboard table
export const fetchMyAcceptances = async (): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return searchAcceptances({});
};

// Function to get a single repair job by its ID
export const fetchRepairById = async (id: string): Promise<Job | undefined> => {
  console.log(`Fetching job with ID: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyJobs.find(job => job.id === id);
};

// Function to create a new repair job
export const createRepair = async (data: RepairFormData): Promise<Job> => {
  console.log('Creating new repair with data:', data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newJob: Job = {
    ...data,
    id: String(Math.floor(Math.random() * 10000)),
    acceptanceNumber: `${Math.floor(Math.random() * 10000)}-2025`,
  } as Job;
  return newJob;
};

// Function to update an existing repair job
export const updateRepair = async (id: string, data: RepairFormData): Promise<Job> => {
  console.log(`Updating repair ${id} with data:`, data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { ...data, id } as Job;
};