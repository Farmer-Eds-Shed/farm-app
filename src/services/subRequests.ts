// Subrequests service to create subrequests for the farmOS API
import axiosInstancePromise from '../oauth2/request';
import storageService from '../services/storageService';


export const createSubRequests = async (req: any[]): Promise<any[]> => {
    const accessToken = await storageService.getItem('accessToken');

    const suRequest = req.map((data: any, index: any) => {
        let apiType = data.body.data.type;
        let uri = apiType.replace(/--/g, "/");

        if (data.action === "update" || data.action === "delete") {
            uri = uri + "/" + data.body.data.id;
            if (data.action === "delete") {
                delete data['body'];
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
    return req;
};

export const deleteLogs = async (selectedRows: any[]) => {
    try {
        const subrequests = await createSubRequests(deleteSelectedRows(selectedRows));
        console.log('Subrequests:', subrequests);

        // Send the subrequests to the Drupal API
        const axiosInstance = await axiosInstancePromise;
        await axiosInstance.post('/subrequests?_format=json', subrequests );
        console.log(`Logs deleted successfully for selected rows`);
    } catch (error) {
        console.error('Error deleting logs:', error);
        throw error;
    }
};