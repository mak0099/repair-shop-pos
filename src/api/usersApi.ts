import type { User } from '../types';

export const fetchUsers = async (): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const dummyUsers: User[] = [
    { id: 'user_mamun', name: 'mamun', branch: 'SPR.SRL', roles: ['Administrator', 'Technician'] },
    { id: 'user_andreab', name: 'ANDREAB', branch: 'SPR.SRL', roles: ['Technician'] },
    { id: 'user_franco', name: 'FRANCO FRONTDESK', branch: 'SPR.SRL', roles: ['Executive'] },
  ];

  return dummyUsers;
};