import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, Error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');
        setLoadedUsers(responseData.users);
      }
      catch (err) { }
    };
    fetchUsers();
  }, [sendRequest]);
  
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <div className='center'>
        <LoadingSpinner />
      </div>}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
