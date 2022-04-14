import create from 'zustand'
import { persist } from 'zustand/middleware' 

const useIDStore = create(
    // persist(
    (set, get) => ({
        truckID: '',
        password: '',
        saveTruckID: (truckID) => set(state => ({ ...state, truckID })),
    }), {
        name: 'Donations'
    }
)
// )

export default useIDStore;