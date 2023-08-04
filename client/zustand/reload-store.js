import { create } from "zustand";

const useReloadStore = create((set) => ({
	reloadComments: false,
	setReloadComments: () =>
		set((state) => ({ reloadComments: !state.reloadComments })),
	reloadPosts: false,
	setReloadPosts: () => set((state) => ({ reloadPosts: !state.reloadPosts })),
}));

export default useReloadStore;
