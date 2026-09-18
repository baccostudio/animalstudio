"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Stores first-touch attribution (UTMs, referrer, landing path) for the lead form. Renders nothing. */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
