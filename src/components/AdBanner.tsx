import { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdBanner() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setLoaded(true);
      } catch (e) {
        console.error("Adsense error:", e);
      }
    }, 800); // Reklam gəlməyə başlamazdan əvvəl kiçik gecikmə
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center overflow-hidden">
      {loaded && (
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            margin: "0 auto",
            padding: "0",
            minHeight: "0"
          }}
          data-ad-client="ca-pub-1578209603604474"
          data-ad-slot="9698255604"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      )}
    </div>
  );
}
