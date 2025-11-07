import { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdBanner() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setReady(true);
        } else {
          console.log("AdSense not active yet — safe mode");
        }
      } catch {
        // Silent in review mode
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center overflow-hidden">
      {ready && (
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
