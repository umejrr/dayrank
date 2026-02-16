import {
  useContext,
  useReducer,
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext(null);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));

    if (stored) {
      setUser(stored);
      setAuth(true);
      dispatch({ type: "LOGIN", payload: stored });
    }
  }, []);

  console.log(state);

  return (
    <AuthContext.Provider value={{ state, dispatch, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
