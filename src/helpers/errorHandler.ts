import axios, { AxiosError } from "axios";
import { errorResponseSchema } from "./zodSchemas";

const handleErrorResponse = (response: any) => {
    const parsedResponse = errorResponseSchema.safeParse(response.data);
    if (!parsedResponse.success) {
        return alert('An unknown error occurred');
    }
    alert(`Error occurred: ${parsedResponse.data.error}`);
};

const handleAxiosError = (error: AxiosError) => {
    if (error.response) {
        handleErrorResponse(error.response);
    } else if (error.request) {
        alert('No response was received from the server.');
    } else {
        alert('Error setting up the request: ' + error.message);
    }
};

export function handleHTTPError(error : any){
    if (axios.isAxiosError(error)) {
        handleAxiosError(error);
    } else if (error instanceof Error) {
        alert(error.message);
    } else {
        alert('An unknown error occurred.');
    }
}
