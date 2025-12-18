import LogoLoop from './LogoLoop';

const PartnerSlider = () => {
  const partnerLogos = [
    { src: "/microsoft-365.png", alt: "Microsoft 365", height: 90 },
    { src: "/checkpoint.png", alt: "Check Point", height: 70 },
    { src: "/zoho.png", alt: "Zoho", height: 90 },
    { src: "/aws.png", alt: "AWS", height: 70 },
    { src: "/kaspersky.png", alt: "Kaspersky", height: 70 },
    { src: "/fortinet.png", alt: "Fortinet", height: 40 },
    { src: "/rapid7.png", alt: "Rapid7", height: 40 },
    { src: "/emsisoft.png", alt: "EMSISOFT", height: 30 },
  ];

  return (
    <section className="bg-white border-y border-gray-200 py-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <LogoLoop
          logos={partnerLogos}
          speed={80}
          direction="left"
          logoHeight={70}
          gap={48}
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
