// Not stored in database, used to handle loading & error states
export interface DataState<T> {
  loading: boolean;
  error?: string;
  data?: T;
}
