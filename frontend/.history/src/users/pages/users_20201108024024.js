import React,{useEffect, useState} from 'react';
import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const Users = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendRequest = async () =>{
      setIsLoading(true);
      try{
      const response = await fetch('http://localhost:5000/api/users');
      const responseData = await response.json();

      if(!response.ok){
        throw new Error(responseData.message);
      }

      setLoadedUsers(responseData.users);
      setIsLoading(false);
      }
      catch(err){
        setIsLoading(false);
        setError(err.message)
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () =>{
    setError(null);
  }

  return( 
      <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <div className='center'>
        <LoadingSpinner/>
      </div>}
      <UsersList items={loadedUsers} />
      </>
      );
};

export default Users;
