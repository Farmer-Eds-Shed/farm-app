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

  export const fetchAnimals = async () => {
    try {
      const axiosInstance = await axiosInstancePromise;
      const response = await axiosInstance.get('/api/asset/animal');
      // Extract necessary fields from the response
      console.log(response.data.data)
      const extractedData = response.data.data.map((item: any) => ({
        id: item.id,
        name: item.attributes.name,
        sex: item.attributes.sex,
        birthdate: irishTime(item.attributes.birthdate),
        notes: item.attributes.notes ? item.attributes.notes.value : null, //value may not exist
        tag: item.attributes.id_tag[0].id,
        status: item.attributes.status,
        // Add more fields as needed
      }));
      return extractedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };



export function irishTime(isoDateString:any) {
  const date = new Date(isoDateString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getUTCFullYear();

  const ieDateString = `${day}/${month}/${year}`;
  console.log(ieDateString); // Outputs: 07/02/2024
  return(ieDateString);
  };