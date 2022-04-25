import create from 'zustand'
import { persist } from 'zustand/middleware' 

const useIDStore = create(
    // persist(
    (set, get) => ({
        truckID: '',
        password: '',
        driver: {},
        saveTruckID: (truckID) => set(state => ({ ...state, truckID })),
        saveDriver: (driver) => set(state => ({ ...state, driver })),
    }), {
        name: 'Donations'
    }
)
// )

export default useIDStore;