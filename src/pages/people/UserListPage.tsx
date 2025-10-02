import React from 'react';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { fetchUsers } from '../../api/usersApi';
import { DataTable } from '../../components/common/DataTable';
import type { Column } from '../../components/common/DataTable';
import type { User } from '../../types';

const UserListPage = () => {
  const { data: users, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const columns: Column<User>[] = [
    { id: 'name', label: 'Name', render: (row) => <Link to={`/people/users/${row.id}`}>{row.name}</Link> },
    { id: 'branch', label: 'Branch' },
    { id: 'roles', label: 'Roles', render: (row) => row.roles?.join(', ') },
  ];

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error fetching users: {error.message}</Alert>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>Users</Typography>
        <Button component={Link} to="/people/users/new" variant="contained">
          Add New User
        </Button>
      </Box>
      <DataTable data={users || []} columns={columns} defaultSortBy="name" />
    </Box>
  );
};

export default UserListPage;