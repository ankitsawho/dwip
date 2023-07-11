import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
	persist(
		(set, get) => ({
			refreshToken: null,
			accessToken: null,
			setAccessToken: (token) => set({ accessToken: token }),
			setRefreshToken: (token) => set({ refreshToken: token }),
		}),
		{
			name: "token-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default useAuthStore;
