import { BASE, withBase } from "@/lib/base";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "T&H Restaurant New Asian",
  robots: { index: false, follow: true },
  alternates: { canonical: "/de/" },
  other: { google: "notranslate" },
};

/**
 * "/" has no page of its own: it forwards to the German site, or to the Czech one when the
 * visitor chose it before or uses a Czech/Slovak browser. Visitors can switch with DE | CZ.
 */
const script = `(function(){var b='${BASE}',t='/de/';try{var s=localStorage.getItem('th-locale');if(s==='cz'||s==='de'){t='/'+s+'/'}else{var l=(navigator.language||'').toLowerCase();if(l.indexOf('cs')===0||l.indexOf('sk')===0)t='/cz/'}}catch(e){}location.replace(b+t+location.hash)})();`;

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" translate="no">
      <head>
        <script dangerouslySetInnerHTML={{ __html: script }} />
        <noscript>
          <meta httpEquiv="refresh" content={`0; url=${withBase("/de/")}`} />
        </noscript>
      </head>
      <body style={{ background: "#060a22" }}>{children}</body>
    </html>
  );
}
