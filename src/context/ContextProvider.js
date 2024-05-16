//allows you to switch between different screens
import { createContext, useContext, useEffect, useReducer,  useRef, } from 'react';
import reducer from './reducer';

const initialState = { //contains all of our public values
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  profile: { open: false, file:null, photoURL:''},
  images: [],
  details:{buisnessName: '', cuisineType: '', menu: '', contactInformation: ''},
  location:{lng:0, lat:0},
  vendors:[],
};

const Context = createContext(initialState);

export const useValue = () => { //a hook so we can extract the values easily
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser){
      dispatch({type:"UPDATE_USER", payload: currentUser});
    }
  }, [])
  return (
    <Context.Provider value={{ state, dispatch,mapRef }}>{children}</Context.Provider>
  );
};

export default ContextProvider;