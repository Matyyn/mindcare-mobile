import { create } from "zustand";

const useStore = create((set) => ({
  //therapist related
  items: [],
  selectedItem: null,
  creditCardDetails: null,
  setcreditDetails: (creditDetails) => set(() => ({ creditDetails })),
  initializeItems: (data) => set(() => ({ items: data })),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  setSelectedItem: (item) => set(() => ({ selectedItem: item })),
  //Appointments Related
  problemDescription: "",
  setProblemDescription: (data) => set(() => ({ problemDescription: data })),

  selectedAppointmentDate: null,
  setAppointmentSelectedDate: (date) => set({ selectedAppointmentDate: date }),

  selectedAppointmentTimeIndex: null,
  setAppointmentSelectedTimeIndex: (index) =>
    set({ selectedAppointmentTimeIndex: index }),
  //Payments Related
  paymentLink: null,
  setPaymentLink: (data) => set({ paymentLink: data }),

  paymentId: null,
  setPaymentId: (data) => set({ paymentId: data }),

  totalPayments: [],
  initializePayments: (data) => set(() => ({ totalPayments: data })),
  //Journals
  journalsCount: [],
  setJournalsCount: (data) => set(() => ({ journalsCount: data })),
  //client data
  responseData: null,
  setResponseData: (data) => set({ responseData: data }),
  //Rescue Session
  rescueSessionData: {},
  setRescueSessionData: (journalTitle, questionAndAnswer) =>
    set((state) => ({
      rescueSessionData: {
        ...state.rescueSessionData,
        [journalTitle]: questionAndAnswer,
      },
    })),
  //Deep Breathing Exercises
  isDPEValue: {},
  setDPEData: (data) => set({ isDPEValue: data }),
  isFSGValue: {},
  setFSGData: (data) => set({ isFSGValue: data }),
  isUPUWValue: {},
  setUPUWData: (data) => set({ isUPUWValue: data }),
  // rescueSessionData: null,
  // setRescueSessionData: (data) => set({ rescueSessionData: data }),
  // removeItem: (itemId) =>
  //   set((state) => ({ items: state.items.filter((item) => item.id !== itemId) })),
}));

export default useStore;
