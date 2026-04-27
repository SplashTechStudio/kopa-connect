import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useMember } from "@/context/MemberContext";

export const RequireAuth = ({ children, admin = false }: { children: ReactNode; admin?: boolean }) => {
  const { member } = useMember();
  if (!member) return <Navigate to="/verify" replace />;
  if (admin && !member.isAdmin) return <Navigate to="/app" replace />;
  return <>{children}</>;
};
