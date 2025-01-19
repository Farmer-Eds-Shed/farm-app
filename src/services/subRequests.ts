// Code to create subrequests for batch operations
import axios from 'axios';
import axiosInstancePromise from '../oauth2/request';
import storageService from '../services/storageService';

interface RequestData {
    action: 'create' | 'update' | 'delete';
    body?: {
        data: {
            type: string;
            id?: string;
        };
    };
    waitFor?: string;
}

interface SubRequest {
    requestId: string;
    uri: string;
    action: string;
    body?: string;
    headers: {
        Accept: string;
        'Content-Type': string;
        Authorization: string;
    };
    waitfor?: string;
}

export const createSubRequests = async (req: RequestData[]): Promise<SubRequest[]> => {
    const accessToken = await storageService.getItem('accessToken');

    const suRequest = req.map((data, index) => {
        let uri = data.body ? data.body.data.type.replace(/--/g, "/") : '';

        if (data.action === "update" || data.action === "delete") {
            if (data.body && data.body.data.id) {
                uri += `/${data.body.data.id}`;
            }
            if (data.action === "delete") {
                delete data.body;
            }
        }

        const sub: SubRequest = {
            requestId: `req-${index + 1}`,
            uri: `/api/${uri}`,
            action: data.action,
            headers: {
                Accept: "application/vnd.api+json",
                'Content-Type': "application/vnd.api+json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: data.body ? JSON.stringify(data.body) : undefined,
        };

        if (data.waitFor !== undefined) {
            sub.waitfor = data.waitFor;
        }
        return sub;
    });

    return suRequest;
};

export const deleteSelectedRows = (selectedRows: { type: string; id: string }[]): RequestData[] => {
    return selectedRows.map(log => ({
        action: 'delete',
        body: {
            data: {
                type: log.type,
                id: log.id,
            },
        },
    }));
};

export const deleteLogs = async (selectedRows: { type: string; id: string }[]) => {
    try {
        const subrequests = await createSubRequests(deleteSelectedRows(selectedRows));
        console.log('Subrequests:', subrequests);

        const axiosInstance = await axiosInstancePromise;
        await axiosInstance.post('/subrequests?_format=json', subrequests);
        console.log('Logs deleted successfully for selected rows');
    } catch (error) {
        console.error('Error deleting logs:', error);
        if (axios.isAxiosError(error)) {
            // Handle Axios errors
            console.error('Axios error:', error.response?.data);
        } else {
            // Handle other errors
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};