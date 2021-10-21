import { useReducer } from "react";
import { DataState } from "domain/DataState";

enum ACTIONS {
  LOAD_DATA,
  SET_LOADING,
  SET_ERROR,
}

interface IBaseAction {
  type: ACTIONS;
}
interface ILoadDataAction<DataType> extends IBaseAction {
  type: ACTIONS.LOAD_DATA;
  data: DataType;
}
interface ISetLoadingAction extends IBaseAction {
  type: ACTIONS.SET_LOADING;
}
interface ISetErrorAction extends IBaseAction {
  type: ACTIONS.SET_ERROR;
  error: string;
}

type actions<DataType> =
  | ILoadDataAction<DataType>
  | ISetErrorAction
  | ISetLoadingAction;

function createReducer<DataType>() {
  return (state: DataState<DataType>, action: actions<DataType>) => {
    let newState: DataState<DataType> = {
      loading: false,
    };

    switch (action.type) {
      case ACTIONS.LOAD_DATA:
        newState.data = action.data;
        break;
      case ACTIONS.SET_LOADING:
        newState.loading = true;
        break;
      case ACTIONS.SET_ERROR:
        newState.error = action.error;
      default:
        break;
    }
    return newState;
  };
}

export function useFBData<DataType>() {
  const reducer = createReducer<DataType>();
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: undefined,
  });

  const loadData = (data: DataType) => {
    dispatch({
      type: ACTIONS.LOAD_DATA,
      data: data,
    });
  };
  const setLoading = () => {
    dispatch({
      type: ACTIONS.SET_LOADING,
    });
  };
  const setErrorMessage = (errorMessage?: string) => {
    dispatch({
      type: ACTIONS.SET_ERROR,
      error: errorMessage ?? "Error loading data",
    });
  };

  return { ...state, loadData, setLoading, setErrorMessage };
}
