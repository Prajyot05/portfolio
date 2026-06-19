"use client";

import { useEffect, useState, ReactNode } from "react";
import { isWebGLAvailable } from "@/utils/webgl-detect";

export default function WebGLFallback({ children }: { children: ReactNode }) {
  // Start with true to match SSR and prevent hydration mismatches
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  if (hasWebGL === false) {
    return null;
  }

  return <>{children}</>;
}
