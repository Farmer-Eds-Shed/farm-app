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

export const createSubRequests = async (req:any): Promise<any[]> => {
    // Retrieve the request array from the message

    const accessToken = await storageService.getItem('accessToken');

    // Create the sub-requests using map
    const suRequest = req.map((data:any, index:any) => {
        // Determine the API type and create the URI
        let apiType = data.body.data.type;
        let uri = apiType.replace(/--/g, "/");

        // Append the ID to the URI if the action is 'update' or 'delete'
        if (data.action === "update" || data.action === "delete") {
            uri = uri + "/" + data.body.data.id;
        }

        // Create the sub-request object
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

        // Add the waitFor property if it exists
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

    return req;
};