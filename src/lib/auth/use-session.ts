"use client";

import { useState, useEffect } from "react";

interface SessionState {
  authenticated: boolean;
  email: string | null;
  loading: boolean;
}

export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({
    authenticated: false,
    email: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setState({
            authenticated: !!data.authenticated,
            email: data.email ?? null,
            loading: false,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ authenticated: false, email: null, loading: false });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
