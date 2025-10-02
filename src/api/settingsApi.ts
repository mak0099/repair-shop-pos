import type { Branch } from '../types';

export const fetchBranches = async (): Promise<Branch[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const dummyBranches: Branch[] = [
    { id: 'branch1', name: 'SPR.SRL Main', address: '123 Main Street' },
    { id: 'branch2', name: 'PHONE CARE TUSCOLANA', address: '456 Tuscolana Avenue' },
  ];

  return dummyBranches;
};