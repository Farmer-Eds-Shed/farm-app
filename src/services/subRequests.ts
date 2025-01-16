import axios from 'axios';
import storageService from '../services/storageService';

interface RequestData {
    action: string;
    body: {
        data: {
            type: string;
            id?: string;
        };
    };
    waitFor?: string;
}

export const createSubRequests = async (req: any[]): Promise<any[]> => {
    const accessToken = await storageService.getItem('accessToken');

    const suRequest = req.map((data: any, index: any) => {
        let apiType = data.body.data.type;
        let uri = apiType.replace(/--/g, "/");

        if (data.action === "update" || data.action === "delete") {
            uri = uri + "/" + data.body.data.id;
            if (data.action === "delete") {
                data.body = {};
            }
        }


        let sub: any = {
            "requestId": "req-" + (index + 1),
            "uri": "/api/" + uri,
            "action": data.action,
            "body": JSON.stringify(data.body),
            "headers": {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                "Authorization": "Bearer " + accessToken
            }
        };

        if (data.waitFor !== undefined) {
            sub.waitfor = data.waitFor;
        }

        return sub;
    });

    return suRequest;
};

export const deleteSelectedRows = (selectedRows: any[]): any[] => {
    let req: any[] = [];

    selectedRows.forEach(log => {
        const logData = {
            "action": 'delete',
            "body": {
                "data": {
                    "type": log.type,
                    "id": log.id
                }
            }
        };
        req.push(logData);
    });
    console.log('Delete Request:', req);
    return req;
};

export const deleteLogs = async (selectedRows: any[]) => {
    try {
        const subrequests = await createSubRequests(deleteSelectedRows(selectedRows));
        console.log('Subrequests:', subrequests);

        // Send the subrequests to the Drupal API
        await axios.post('/subrequests?_format=json', { requests: subrequests });
        console.log(`Logs deleted successfully for selected rows`);
    } catch (error) {
        console.error('Error deleting logs:', error);
        throw error;
    }
};