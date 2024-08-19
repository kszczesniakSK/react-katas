import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectUserAge, selectUserName } from "../store/userSelectors";
import { setUserAge, setUserName } from "../store/slices/userSlice";

const UserPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>(); // Extract userId from URL
    const navigate = useNavigate();

    const userName = useSelector(selectUserName);
    const userAge = useSelector(selectUserAge);
    const dispatch = useDispatch();
  
    return (
      <div>
        <p>Displaying details for user with ID: {userId}</p>
        <h1>User Page</h1>
        <p>Name: {userName}</p>
        <p>Age: {userAge}</p>

      <button onClick={() => dispatch(setUserName('John Doe'))}>
        Set Name to John Doe
      </button>
      <button onClick={() => dispatch(setUserAge(30))}>
        Set Age to 30
      </button>
        <button onClick={() => navigate('/')}>Go Back to Home</button> {/* Navigate back to home */}
      </div>
    );
  };

  export default UserPage