import { create } from "zustand";

const useReloadStore = create((set) => ({
	reloadComments: false,
	setReloadComments: () =>
		set((state) => ({ reloadComments: !state.reloadComments })),
}));

export default useReloadStore;
