import LogoLoop from './LogoLoop';

const PartnerSlider = () => {
  const partnerLogos = [
    { src: "/microsoft-365.png", alt: "Microsoft 365", height: 90 },
    { src: "/checkpoint.png", alt: "Check Point", height: 70 },
    { src: "/zoho.png", alt: "Zoho", height: 90 },
    { src: "/aws.png", alt: "AWS", height: 70 },
    { src: "/kaspersky.png", alt: "Kaspersky", height: 70 },
    { src: "/fortinet.png", alt: "Fortinet", height: 60 },
    { src: "/rapid7.png", alt: "Rapid7", height: 60 },
    { src: "/emsisoft.png", alt: "EMSISOFT", height: 50 },
    { src: "/partner logo/adobe-2.svg", alt: "Adobe", height: 60 },
    { src: "/partner logo/apple-13.svg", alt: "Apple", height: 60 },
    { src: "/partner logo/aruba-networks.svg", alt: "Aruba Networks", height: 60 },
    { src: "/partner logo/crowdstrike-1.svg", alt: "CrowdStrike", height: 60 },
    { src: "/partner logo/d-link.svg", alt: "D-Link", height: 60 },
    { src: "/partner logo/dell-2.svg", alt: "Dell", height: 60 },
    { src: "/partner logo/eset-logo.svg", alt: "ESET", height: 60 },
    { src: "/partner logo/hp-5.svg", alt: "HP", height: 60 },
    { src: "/partner logo/lenovo-2.svg", alt: "Lenovo", height: 60 },
    { src: "/partner logo/palo-alto-networks-1.svg", alt: "Palo Alto", height: 60 },
    { src: "/partner logo/sophos-logo.svg", alt: "Sophos", height: 60 },
    { src: "/partner logo/trellix.svg", alt: "Trellix", height: 60 },
    { src: "/partner logo/veeam-3.svg", alt: "Veeam", height: 60 },
  ];

  return (
    <section className="bg-white border-y border-gray-200 py-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <LogoLoop
          logos={partnerLogos}
          speed={80}
          direction="left"
          logoHeight={70}
          gap={32}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Our trusted partners"
        />
      </div>
    </section>
  );
};

export default PartnerSlider;
