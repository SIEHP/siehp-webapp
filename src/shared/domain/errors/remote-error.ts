import { AxiosError } from "axios";

export interface RemoteError extends AxiosError<{ message: string, statusCode: number , path: string, timestamp: string, traceId: string}> {}
