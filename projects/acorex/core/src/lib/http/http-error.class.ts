export interface IHttpError {
    message?: string;
    status?: number;
    code?: string;
    handled: boolean;
    error: any | null
}