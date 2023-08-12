class Response<T> {
  error?: Error;
  payload?: T;

  constructor(error?: Error, payload?: T) {
    this.error = error;
    this.payload = payload;
  }
}

export default Response;