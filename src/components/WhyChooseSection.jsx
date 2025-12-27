import { CheckCircle2, ArrowRight } from "lucide-react";
import SplitText from './SplitText';
import LazyImage from './LazyImage';

const WhyChooseSection = () => {
  const reasons = [
    "End-to-end IT integration and management",
    "Scalable, secure, and future-ready solutions",
    "Expertise across cybersecurity, cloud, and networking",
    "Proven delivery with minimal downtime and maximum ROI"
  ];

  const clients = [
    { src: "/sgt-university.png", alt: "SGT University" },
    { src: "/pw.png", alt: "Physics Wallah" },
    { src: "/uniqlo.png", alt: "Uniqlo" }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-white">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_50%)]"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[size:50px_50px]"></div>

      <div className="relative z-10">
        {/* Why Choose Xorvo Section - Full Width */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div>
            <div className="text-center mb-8">
              <SplitText 
                text="WHY CHOOSE "
                tag="h2"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 inline"
                delay={60}
                duration={0.7}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40, scale: 0.8 }}
                to={{ opacity: 1, y: 0, scale: 1 }}
                threshold={0.2}
                rootMargin="-50px"
                textAlign="center"
                style={{ fontFamily: "'Rostex', 'Arial Black', sans-serif" }}
              />
              {' '}
              <SplitText 
                text="XORVO"
                tag="span"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent inline ml-1 md:ml-2"
                delay={80}
                duration={0.9}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 60, rotationY: 180 }}
                to={{ opacity: 1, y: 0, rotationY: 0 }}
                threshold={0.2}
                rootMargin="-50px"
                textAlign="center"
                style={{ fontFamily: "'Rostex', 'Arial Black', sans-serif" }}
              />
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg">
              <ul className="space-y-4 mb-8">
                {reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-base md:text-lg">{reason}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-2 text-accent font-semibold text-lg">
                <ArrowRight className="h-5 w-5" />
                <p>Partner with Xorvo Technologies. Power your business with smarter IT.</p>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Our Clients Section - Full Width */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "'Rostex', 'Arial Black', sans-serif" }}>
              OUR <span className="text-accent">CLIENTS</span>
            </h2>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className="group relative bg-gray-50 border border-gray-200 rounded-xl p-8 hover:bg-white hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:scale-105 flex items-center justify-center h-[140px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative w-full h-full flex items-center justify-center">
                      <LazyImage 
                        src={client.src} 
                        alt={client.alt}
                        className="max-w-full max-h-[100px] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        placeholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 80'%3E%3Crect width='120' height='80' fill='%23f3f4f6'/%3E%3C/svg%3E"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
    </section>
  );
};

export default WhyChooseSection;
