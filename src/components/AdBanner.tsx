import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <div className="flex justify-center overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ 
          display: "block",
          margin: "0",
          padding: "0",
          minHeight: "90px"
        }}
        data-ad-client="ca-pub-1578209603604474"
        data-ad-slot="9698255604"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
