import type { User } from '../types';

interface AuthResponse {
  user: User;
  token: string;
}

export const login = async (credentials: {email: string, password: string}): Promise<AuthResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Logging in with:', credentials);
  
  const dummyUser: User = {
    id: 'user_mamun',
    name: 'mamun',
    branch: 'SPR.SRL',
  };

  return { user: dummyUser, token: 'dummy-jwt-token-string' };
};