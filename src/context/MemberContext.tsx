import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Member } from "@/lib/api";
import { DEMO_ADMIN, DEMO_MEMBER } from "@/lib/demo-data";

interface MemberContextValue {
  member: Member | null;
  setMember: (m: Member | null) => void;
  signInDemo: (asAdmin?: boolean) => void;
  signOut: () => void;
}

const MemberContext = createContext<MemberContextValue | null>(null);
const STORAGE_KEY = "kopa-we:member";

export const MemberProvider = ({ children }: { children: ReactNode }) => {
  const [member, setMemberState] = useState<Member | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMemberState(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const setMember = (m: Member | null) => {
    setMemberState(m);
    if (m) localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo<MemberContextValue>(
    () => ({
      member,
      setMember,
      signInDemo: (asAdmin = false) => setMember(asAdmin ? DEMO_ADMIN : DEMO_MEMBER),
      signOut: () => setMember(null),
    }),
    [member],
  );

  return <MemberContext.Provider value={value}>{children}</MemberContext.Provider>;
};

export const useMember = () => {
  const ctx = useContext(MemberContext);
  if (!ctx) throw new Error("useMember must be used inside <MemberProvider>");
  return ctx;
};
