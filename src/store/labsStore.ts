import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SoftwareProduct, ServicePackage } from '@/types/labs';
import { softwareProducts as initialSoftware, servicePackages as initialServices } from '@/lib/labs-data';

interface LabsState {
  softwareList: SoftwareProduct[];
  serviceList: ServicePackage[];
  addSoftware: (sw: SoftwareProduct) => void;
  updateSoftware: (id: string, updated: Partial<SoftwareProduct>) => void;
  deleteSoftware: (id: string) => void;
  toggleSoftwareStatus: (id: string) => void;
  resetSoftwareToDefault: () => void;
  getSoftwareBySlug: (slug: string) => SoftwareProduct | undefined;
}

export const useLabsStore = create<LabsState>()(
  persist(
    (set, get) => ({
      softwareList: initialSoftware,
      serviceList: initialServices,
      addSoftware: (newSoftware) => {
        set((state) => ({
          softwareList: [newSoftware, ...state.softwareList],
        }));
      },
      updateSoftware: (id, updated) => {
        set((state) => ({
          softwareList: state.softwareList.map((sw) =>
            sw.id === id ? { ...sw, ...updated } : sw
          ),
        }));
      },
      deleteSoftware: (id) => {
        set((state) => ({
          softwareList: state.softwareList.filter((sw) => sw.id !== id),
        }));
      },
      toggleSoftwareStatus: (id) => {
        set((state) => ({
          softwareList: state.softwareList.map((sw) =>
            sw.id === id ? { ...sw, isActive: !sw.isActive } : sw
          ),
        }));
      },
      resetSoftwareToDefault: () => {
        set({
          softwareList: initialSoftware,
          serviceList: initialServices,
        });
      },
      getSoftwareBySlug: (slug) => {
        return get().softwareList.find((sw) => sw.slug === slug);
      },
    }),
    {
      name: 'qxyra_labs_software_list',
    }
  )
);
