import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import UsersList from "../components/UsersList";
import { useHttpClient } from "../../shared/hooks/useHttpClient-hook";

import { UserModel } from "../models/user.model";

interface ResponseUserData {
  users: UserModel[];
}

function Users(): React.ReactElement {
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState<UserModel[] | []>();

  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      try {
        const responseData = await sendRequest<ResponseUserData>({
          url: `${process.env.REACT_APP_SERVER_URL}/users/`,
        });
        setLoadedUsers(() => responseData.users);
      } catch (error: any) {
        console.log(error);
      }
    }

    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
    </>
  );
}

export default Users;
