export enum Status {
  OK = 'OK',
  EXISTS = 'EXISTS',
  ACTIVE = 'ACTIVE',
}

export interface ResponseStatus {
  status: Status;
}

export interface Response {
  data: ResponseStatus;
  message?: string;
}
