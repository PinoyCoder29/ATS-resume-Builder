"use client";

import { useEffect } from "react";

// Bootstrap's JS (for collapse/dropdown/etc.) touches `window`, so it can
// only be imported on the client. This tiny component is the reusable way
// to do that once, from the root layout, without turning the whole app
// into a client component.
export default function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}
