import axiosInstancePromise from '../oauth2/request';
import { justDate } from './dateService';

// Define the structure of the expected data using TypeScript interfaces
interface AnimalAttributes {
  name: string;
  sex: string;
  birthdate: string;
  notes?: { value: string };
  id_tag?: { id: string }[];
  status: string;
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

// Function to map sex from 'M'/'F' to 'Male'/'Female'
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

// Generic function to fetch paginated data
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
      console.error('Error fetching paginated data:', error);
      throw error;
    }
  }

  return results;
};

// Function to fetch equipment data
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

// Function to fetch all animals
export const fetchAnimals = async () => {
  const results = await fetchPaginatedData('/api/asset/animal?sort=name');
  return results.map((item: AnimalData) => ({
    id: item.id,
    name: item.attributes.name,
    sex: mapSex(item.attributes.sex),
    birthdate: justDate(item.attributes.birthdate),
    notes: item.attributes.notes ? item.attributes.notes.value : null,
    tag: item.attributes.id_tag && item.attributes.id_tag.length > 0 ? item.attributes.id_tag[0].id : 'unknown',
    status: item.attributes.status,
  }));
};

// Function to fetch active animals
export const fetchActiveAnimals = async () => {
  const results = await fetchPaginatedData('/api/asset/animal?sort=name&filter[status]=active');
  return results.map((item: AnimalData) => ({
    id: item.id,
    name: item.attributes.name,
    sex: mapSex(item.attributes.sex),
    birthdate: justDate(item.attributes.birthdate),
    notes: item.attributes.notes ? item.attributes.notes.value : null,
    tag: item.attributes.id_tag && item.attributes.id_tag.length > 0 ? item.attributes.id_tag[0].id : 'unknown',
    status: item.attributes.status,
  }));
};

// Function to fetch archived animals
export const fetchArchivedAnimals = async () => {
  const results = await fetchPaginatedData('/api/asset/animal?sort=name&filter[status]=archived');
  return results.map((item: AnimalData) => ({
    id: item.id,
    name: item.attributes.name,
    sex: mapSex(item.attributes.sex),
    birthdate: justDate(item.attributes.birthdate),
    notes: item.attributes.notes ? item.attributes.notes.value : null,
    tag: item.attributes.id_tag && item.attributes.id_tag.length > 0 ? item.attributes.id_tag[0].id : 'unknown',
    status: item.attributes.status,
  }));
};