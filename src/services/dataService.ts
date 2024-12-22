// src/services/dataService.ts
import axiosInstancePromise from '../oauth2/request';

export const fetchEquipment = async () => {
    try {
      const axiosInstance = await axiosInstancePromise;
      const response = await axiosInstance.get('/api/asset/equipment');
      // Extract necessary fields from the response
      console.log(response.data.data)
      const extractedData = response.data.data.map((item: any) => ({
        id: item.id,
        name: item.attributes.name,
        manufacturer: item.attributes.manufacturer,
        model: item.attributes.model,
        notes: item.attributes.notes ? item.attributes.notes.value : null, //value may not exist
        serial: item.attributes.serial_number,
        status: item.attributes.status,
        // Add more fields as needed
      }));
      return extractedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };