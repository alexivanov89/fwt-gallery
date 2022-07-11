import { useEffect, useReducer } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface IState {
  data: [] | any[];
  isLoading: Boolean;
  error: null | string;
}

enum Actions {
  INIT = 'INIT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

interface IAction {
  type: keyof typeof Actions;
  payload?: any;
}

const initialState: IState = {
  data: [],
  isLoading: false,
  error: null,
};

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case Actions.INIT:
      return { ...state, isLoading: true, error: null };
    case Actions.SUCCESS:
      return { ...state, isLoading: false, error: null, data: action.payload };
    case Actions.ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const useAxiosFetch = (api: any, dependencies: any[] = []) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: Actions.INIT });
      try {
        const response = await api();
        dispatch({ type: Actions.SUCCESS, payload: response.data });
      } catch (e: any) {
        dispatch({ type: Actions.ERROR, payload: e?.error });
      }
    };

    fetch();
  }, dependencies);

  return state;
};
