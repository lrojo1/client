import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/vendor';

export const createVendor = async (vendor, currentUser, dispatch, setPage) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url, body: vendor, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'The vendor has been added successfully',
      },
    });
    dispatch({ type: 'RESET_VENDOR' });
    setPage(0);
  }

  dispatch({ type: 'END_LOADING' });
};

export const getVendors = async (dispatch) => {
  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_VENDORS', payload: result });
  }
};
