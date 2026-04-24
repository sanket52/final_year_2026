import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { API_BASE, getToken, setToken, authHeaders } from "../utils/api";

const AuthContext = createContext(null);

async function requestJson(url, options, fallbackMessage) {
  let res;
  try {
    res = await fetch(url, options);
  } catch {
    throw new Error(
      "Cannot reach the server. If this is on mobile, the backend may be down, waking up on Render, or blocked by network/CORS."
    );
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || fallbackMessage);
  }

  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    // Wake the deployed backend early so auth requests are less likely
    // to hit a Render cold start when the user submits the form.
    fetch(`${API_BASE}/health`, { signal: controller.signal }).catch(() => {});

    return () => controller.abort();
  }, []);

  const loadProfile = useCallback(async () => {
    const t = getToken();
    if (!t) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        headers: authHeaders(),
      });
      if (!res.ok) {
        setToken(null);
        setUser(null);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const login = useCallback(async (email, password) => {
    const data = await requestJson(
      `${API_BASE}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
      "Login failed"
    );
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const loginAdmin = useCallback(async (username, password) => {
    const data = await requestJson(
      `${API_BASE}/api/auth/admin/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      },
      "Admin login failed"
    );
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const signup = useCallback(async (payload) => {
    const data = await requestJson(
      `${API_BASE}/api/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
      "Signup failed"
    );
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      loginAdmin,
      signup,
      logout,
      refreshProfile: loadProfile,
    }),
    [user, loading, login, loginAdmin, signup, logout, loadProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
