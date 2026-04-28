import { create } from 'zustand';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  status: 'Critical' | 'Stable' | 'Recovering';
  lastVisit: string;
  bloodType: string;
}

// Mock initial data
const initialPatients: Patient[] = [
  { id: 'P-1001', name: 'Eleanor Vance', age: 42, gender: 'Female', diagnosis: 'Hypertension', status: 'Stable', lastVisit: '2023-10-12', bloodType: 'O+' },
  { id: 'P-1002', name: 'James Holden', age: 34, gender: 'Male', diagnosis: 'Acute Bronchitis', status: 'Recovering', lastVisit: '2023-10-15', bloodType: 'A-' },
  { id: 'P-1003', name: 'Amos Burton', age: 45, gender: 'Male', diagnosis: 'Trauma', status: 'Critical', lastVisit: '2023-10-18', bloodType: 'AB+' },
  { id: 'P-1004', name: 'Naomi Nagata', age: 29, gender: 'Female', diagnosis: 'Anemia', status: 'Stable', lastVisit: '2023-09-22', bloodType: 'B+' },
  { id: 'P-1005', name: 'Chrisjen Avasarala', age: 68, gender: 'Female', diagnosis: 'Osteoarthritis', status: 'Stable', lastVisit: '2023-10-01', bloodType: 'O-' },
];

interface PatientState {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  fetchPatientRecords: () => Promise<void>;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  isLoading: false,
  error: null,
  fetchPatientRecords: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ patients: initialPatients, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch patient records.', isLoading: false });
    }
  }
}));
