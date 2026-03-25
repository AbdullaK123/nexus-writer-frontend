import React from "react";

export interface AuthWrapperProps {
  children: React.ReactNode
  redirectTo?: string;
  requireAuth?: boolean;
}
