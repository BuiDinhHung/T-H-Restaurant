export default function Root() {
  return (
    <p style={{ fontFamily: "system-ui", color: "#e8c879", textAlign: "center", marginTop: "40vh" }}>
      <a href={withBase("/de/")} style={{ color: "inherit" }}>Deutsch</a> · <a href={withBase("/cz/")} style={{ color: "inherit" }}>Čeština</a>
    </p>
  );
}

import { withBase } from "@/lib/base";