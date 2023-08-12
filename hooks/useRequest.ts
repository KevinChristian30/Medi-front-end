import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Response from "../models/utility/Response";

const useRequest = async <T> (config: AxiosRequestConfig<any>) => {
  let response: Response<T> = new Response<T>();

  try {
    const payload: AxiosResponse = await axios(config);

    response.payload = payload.data;
  } catch (error: any) {
    response.error = error;
  }

  return response;
};

export default useRequest;