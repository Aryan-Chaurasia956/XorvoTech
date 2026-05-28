import { useEffect } from 'react';

const JsonLdSchema = () => {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      return; // Script already exists, don't add duplicate
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Corporation",
      "name": "Xorvo Technologies Private Limited",
      "alternateName": "Avinyax",
      "url": "https://avinyax.com/",
      "logo": "https://avinyax.com/xorvo_im.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "97929 08405",
        "contactType": "technical support",
        "areaServed": ["IN","US","GB","CA","CN","SA","AU"],
        "availableLanguage": ["en","Hindi"]
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61579183072232",
        "https://x.com/xorvotechno",
        "https://www.instagram.com/xorvo_tech/",
        "https://www.linkedin.com/company/xorvo-technologies-private-limited/"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default JsonLdSchema;
