import { UserContext } from "react";
import Usercontext from "./components/UserContext";

function UserDetails() {
  const UserData = useContext(UserContext);
  
  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;