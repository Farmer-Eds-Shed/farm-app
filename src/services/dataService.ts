// This file contains functions to fetch data from the farmOS API.
import axiosInstancePromise from '../oauth2/request';
import { justDate } from './dateService';

// Define the types of the data returned by the farmOS API.
interface AnimalAttributes {
  name: string;
  sex: string;
  birthdate: string;
  notes?: { value: string };
  id_tag?: { id: string }[];
  status: string;
  data: object;
}

interface AnimalData {
  id: string;
  attributes: AnimalAttributes;
}

interface EquipmentAttributes {
  name: string;
  manufacturer: string;
  model: string;
  notes?: { value: string };
  serial_number: string;
  status: string;
}

interface EquipmentData {
  id: string;
  attributes: EquipmentAttributes;
}

interface ActivityLogData {
  id: string;
  type: string;
  attributes: ActivityAttributes;
}

interface ActivityAttributes {
  name: string;
  timestamp: string;
  notes?: { value: string };
  status: string;
}

// Map the full word
const mapSex = (sex: string): string => {
  switch (sex) {
    case 'M':
      return 'Male';
    case 'F':
      return 'Female';
    default:
      return 'Unknown';
  }
};

const mapStatus = (status: string): string => {
  switch (status) {
    case 'active':
      return 'In Herd';    
    case 'archived':
      return 'Gone';
    default:
      return 'Unknown';
  }
};

// Centralized error handling
const handleError = (error: unknown) => {
  console.error('Error:', error);
  throw error;
};

// Fetch paginated data from the farmOS API.
const fetchPaginatedData = async (initialUrl: string) => {
  let results: any[] = [];
  let currentPageUrl: string | null = initialUrl;

  while (currentPageUrl) {
    try {
      const axiosInstance = await axiosInstancePromise;
      const response: any = await axiosInstance.get(currentPageUrl);
      const data: any = response.data;

      results = results.concat(data.data);

      if (data.links && data.links.next) {
        currentPageUrl = data.links.next.href;
      } else {
        currentPageUrl = null;
      }
    } catch (error) {
      handleError(error);
    }
  }

  return results;
};

// Map animal data to a more user-friendly format.
const mapAnimalData = (item: AnimalData) => ({
  id: item.id,
  name: item.attributes.name,
  sex: mapSex(item.attributes.sex),
  birthdate: justDate(item.attributes.birthdate),
  notes: item.attributes.notes ? item.attributes.notes.value : null,
  tag: item.attributes.id_tag && item.attributes.id_tag.length > 0 ? item.attributes.id_tag[0].id : 'unknown',
  status: mapStatus(item.attributes.status),
  /*
  ##########################     IMPORTANT    ######################
  Raw data from ICBF API stored as JSON string when Asset was created via API import.
  This data may be used to display additional information about the animal.
  This data is unlikely to be available or relevant in most farmOS instances.
  */
  data: item.attributes.data ? JSON.parse(item.attributes.data as unknown as string) : null, 
});

// Map log data to a more user-friendly format.
const mapLogData = (item: ActivityLogData) => ({
  id: item.id,
  name: item.attributes.name,
  date: justDate(item.attributes.timestamp),
  notes: item.attributes.notes ? item.attributes.notes.value : null,
  status: item.attributes.status,
  type: item.type,
});

// Fetch all equipment.
export const fetchEquipment = async () => {
  const results = await fetchPaginatedData('/api/asset/equipment?sort=name');
  return results.map((item: EquipmentData) => ({
    id: item.id,
    name: item.attributes.name,
    manufacturer: item.attributes.manufacturer,
    model: item.attributes.model,
    notes: item.attributes.notes ? item.attributes.notes.value : null,
    serial: item.attributes.serial_number,
    status: item.attributes.status,
  }));
};

// Fetch all animals.
export const fetchAnimals = async () => {
  const results = await fetchPaginatedData('/api/asset/animal?sort=name');
  return results.map(mapAnimalData);
};

// Fetch animals that are currently active. (All animals that are currently on the farm.)
export const fetchActiveAnimals = async () => {
  const results = await fetchPaginatedData('/api/asset/animal?sort=name&filter[status]=active');
  return results.map(mapAnimalData);
};

// Fetch animals that have been archived. (All animals that have left the farm.)
export const fetchArchivedAnimals = async () => {
  const results = await fetchPaginatedData('/api/asset/animal?sort=name&filter[status]=archived');
  return results.map(mapAnimalData);
};

// Fetch animals that have died. (Currently, this is determined by the presence of a 'death_date' in the animal's data field.)
export const fetchDeadAnimals = async () => {
  const results = await fetchPaginatedData('/api/asset/animal?sort=name&filter[status]=archived');
  const animalsDied = results
    .filter(animal => animal.attributes.data && typeof animal.attributes.data === 'string' && animal.attributes.data.includes('death_date'));
  return animalsDied.map(mapAnimalData);
};

// Fetch animals that have been sold. (Currently, this is determined by the absence of a 'death_date' in the animal's data field.)
export const fetchSoldAnimals = async () => {
  const results = await fetchPaginatedData('/api/asset/animal?sort=name&filter[status]=archived');
  const animalsSold = results
    .filter(animal => animal.attributes.data && typeof animal.attributes.data === 'string' && !animal.attributes.data.includes('death_date'));
  return animalsSold.map(mapAnimalData);
};

// Fetch animals that have been purchased. (Currently, this is determined by the presence of a 'total_movements' in the animal's data field.)
export const fetchPurchasedAnimals = async () => {
  const results = await fetchPaginatedData('/api/asset/animal?sort=name');
  const animalsPurchased = results
    .filter(animal => animal.attributes.data && typeof animal.attributes.data === 'string' && !animal.attributes.data.includes(',"total_movements":0,'));
  return animalsPurchased.map(mapAnimalData);
};

// Fetch animals that have been born. (Currently, this is determined by the absence of a 'total_movements' in the animal's data field.)
export const fetchHomeBredAnimals = async () => {
  const results = await fetchPaginatedData('/api/asset/animal?sort=name');
  const animalsHome = results
    .filter(animal => animal.attributes.data && typeof animal.attributes.data === 'string' && animal.attributes.data.includes(',"total_movements":0,'));
  return animalsHome.map(mapAnimalData);
};

// Fetch activity logs for a specific animal.
export const fetchActivityLogs = async (id: string) => {
  const results = await fetchPaginatedData(`/api/log/activity?sort=name&filter[asset.id]=${id}`);
  return results.map(mapLogData);
};

export const fetchBirthLogs = async (id: string) => {
  const results = await fetchPaginatedData(`/api/log/birth?sort=name&filter[asset.id]=${id}`);
  return results.map(mapLogData);
};

export const fetchObservationLogs = async (id: string) => {
  const results = await fetchPaginatedData(`/api/log/observation?sort=name&filter[asset.id]=${id}`);
  return results.map(mapLogData);
};

export const fetchMedicalLogs = async (id: string) => {
  const results = await fetchPaginatedData(`/api/log/medical?sort=name&filter[asset.id]=${id}`);
  return results.map(mapLogData);
};

export const fetchHarvestLogs = async (id: string) => {
  const results = await fetchPaginatedData(`/api/log/harvest?sort=name&filter[asset.id]=${id}`);
  return results.map(mapLogData);
};

// Fetch maintenance logs for a specific equipment.
export const fetchMaintenanceLogs = async (id: string) => {
  const results = await fetchPaginatedData(`/api/log/maintenance?sort=name&filter[asset.id]=${id}`);
  return results.map(mapLogData);
};

export const fetchEquipmentLogs = async (id: string) => {
  const results = await fetchPaginatedData(`/api/log/activity?sort=name&filter[asset.id]=${id}`);
  return results.map(mapLogData);
};

export const fetchAllCompleteLogs = async () => {
  const results = await fetchPaginatedData('/api/log/activity?sort=name&filter[status]=done');
  return results.map(mapLogData);
};

export const fetchAllIncompleteLogs = async () => {
  const results = await fetchPaginatedData('/api/log/activity?sort=name&filter[status]=pending');
  return results.map(mapLogData);
};

// Post a new log.
export const postLog = async (logData: { data: { type: string; [key: string]: any } }) => {
  try {
    const axiosInstance = await axiosInstancePromise;
    const logType = logData.data.type.replace(/--/g, '/');
    await axiosInstance.post(`/api/${logType}`, logData);
  } catch (error) {
    handleError(error);
  }
};

// Patch an existing log.
export const patchLog = async (logData: { data: { type: string; id: string; [key: string]: any } }) => {
  try {
    const axiosInstance = await axiosInstancePromise;
    const logType = logData.data.type.replace(/--/g, '/');
    await axiosInstance.patch(`/api/${logType}/${logData.data.id}`, logData);
  } catch (error) {
    handleError(error);
  }
};