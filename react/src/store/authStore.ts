import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  user: { id: string; role: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")!) : null,
  login: (token) => {
    localStorage.setItem("token", token);
    set({ token, user: jwtDecode(token) });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));
