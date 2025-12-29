import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="group relative h-[120px] lg:h-[140px] xl:h-[160px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out hover:z-10 hover:h-[350px] lg:hover:h-[400px] xl:hover:h-[450px] hover:shadow-2xl"
                  onMouseEnter={(e) => {
                    const parent = e.currentTarget.parentElement;
                    const siblings = Array.from(parent.children).filter(child => child !== e.currentTarget);
                    siblings.forEach(sibling => {
                      sibling.style.transform = 'scale(0.92)';
                      sibling.style.opacity = '0.6';
                      sibling.style.filter = 'blur(1px)';
                    });
                  }}
                  onMouseLeave={(e) => {
                    const parent = e.currentTarget.parentElement;
                    const siblings = Array.from(parent.children).filter(child => child !== e.currentTarget);
                    siblings.forEach(sibling => {
                      sibling.style.transform = 'scale(1)';
                      sibling.style.opacity = '1';
                      sibling.style.filter = 'blur(0px)';
                    });
                  }}
                >
                  {/* Dynamic background images with color overlays */}
                  <div 
                    className="absolute inset-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    style={{
                      backgroundImage: index === 0 ? "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop')" :
                                    index === 1 ? "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop')" :
                                    index === 2 ? "url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop')" :
                                    "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  
                  {/* Color gradient overlays that change on hover */}
                  <div className="absolute inset-0 transition-all duration-700" 
                       style={{
                         background: index === 0 ? 'linear-gradient(135deg, rgba(114,124,171,0.85) 0%, rgba(114,124,171,0.75) 50%, rgba(114,124,171,0.85) 100%)':
                                     index === 1 ? 'linear-gradient(135deg, rgba(114,124,171,0.85) 0%, rgba(114,124,171,0.75) 50%, rgba(114,124,171,0.85) 100%)':
                                     index === 2 ? 'linear-gradient(135deg, rgba(114,124,171,0.85) 0%, rgba(114,124,171,0.75) 50%, rgba(114,124,171,0.85) 100%)':
                                     'linear-gradient(135deg, rgba(114,124,171,0.85) 0%, rgba(114,124,171,0.75) 50%, rgba(114,124,171,0.85) 100%)'
                       }}
                  />
                  
                  {/* Animated gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                       style={{
                         background: index === 0 ? 'linear-gradient(135deg, rgba(114,124,171,0.95) 0%, rgba(114,124,171,0.85) 50%, rgba(114,124,171,0.95) 100%)':
                                     index === 1 ? 'linear-gradient(135deg, rgba(114,124,171,0.95) 0%, rgba(114,124,171,0.85) 50%, rgba(114,124,171,0.95) 100%)':
                                     index === 2 ? 'linear-gradient(135deg, rgba(114,124,171,0.95) 0%, rgba(114,124,171,0.85) 50%, rgba(114,124,171,0.95) 100%)':
                                     'linear-gradient(135deg, rgba(114,124,171,0.95) 0%, rgba(114,124,171,0.85) 50%, rgba(114,124,171,0.95) 100%)'
                       }}
                  />
                  
                  {/* Content container */}
                  <div className="relative h-full p-6 flex flex-col justify-center text-white group-hover:p-8 transition-all duration-700 overflow-hidden">
                    {/* Initial state - Compact (only shows when not hovered) */}
                    <div className="flex flex-col items-center justify-center text-center group-hover:hidden animate-fadeIn h-full">
                      <h3 className="text-2xl font-bold leading-tight">
                        {index === 0 ? "IT Integration" :
                         index === 1 ? "Secure Solutions" :
                         index === 2 ? "Expert Services" :
                         "Proven Results"}
                      </h3>
                    </div>
                    
                    {/* Expanded state - Full content (only shows when hovered) */}
                    <div className="hidden group-hover:block h-full animate-fadeIn">
                      <div className="flex flex-col h-full justify-between">
                        {/* Title stays visible in expanded state */}
                        <div className="text-center mb-2">
                          <h3 className="text-2xl font-bold leading-tight text-center">
                            {index === 0 ? "IT Integration" :
                             index === 1 ? "Secure Solutions" :
                             index === 2 ? "Expert Services" :
                             "Proven Results"}
                          </h3>
                          {/* Decorative line */}
                          <div className={`w-16 h-1 mx-auto rounded-full opacity-80`}
                               style={{
                                 backgroundColor: 'rgb(114, 124, 171)'
                               }} />
                        </div>
                        
                        <div>
                          <p className="text-base text-white/90 leading-relaxed text-left">
                            {index === 0 && "Complete IT infrastructure management with enterprise-grade security. We handle everything from network setup to 24/7 monitoring and maintenance."}
                            {index === 1 && "Scalable cloud solutions that grow with your business. Future-ready architecture ensuring seamless expansion and technological advancement."}
                            {index === 2 && "Expert cybersecurity protection and advanced networking solutions. Certified professionals safeguard your digital assets with cutting-edge technology."}
                            {index === 3 && "Proven delivery excellence with maximum ROI guarantee. Minimal downtime, optimized performance, and measurable business results."}
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 text-base text-white/80 text-left">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2`}
                                 style={{
                                   backgroundColor: 'white'
                                 }} />
                            <span>
                              {index === 0 && "24/7 System Monitoring"}
                              {index === 1 && "Auto-Scaling Infrastructure"}
                              {index === 2 && "Advanced Threat Protection"}
                              {index === 3 && "Performance Optimization"}
                            </span>
                          </div>
                          <div className="flex items-start gap-3 text-base text-white/80 text-left">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2`}
                                 style={{
                                   backgroundColor: 'white'
                                 }} />
                            <span>
                              {index === 0 && "Enterprise Security"}
                              {index === 1 && "Cloud Migration Support"}
                              {index === 2 && "Compliance Management"}
                              {index === 3 && "Cost Efficiency"}
                            </span>
                          </div>
                          <div className="flex items-start gap-3 text-base text-white/80 text-left">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2`}
                                 style={{
                                   backgroundColor: 'white'
                                 }} />
                            <span>
                              {index === 0 && "Seamless Integration"}
                              {index === 1 && "Zero Downtime Deployment"}
                              {index === 2 && "Real-time Analytics"}
                              {index === 3 && "Guaranteed Uptime"}
                            </span>
                          </div>
                        </div>  
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Section */}
            <div className="text-center animate-fadeInUp">
              <Link to="/?contact=true&partner=true" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-accent via-accent/90 to-accent/80 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:from-accent hover:to-accent/90 backdrop-blur-sm border border-white/20 cursor-pointer">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-white" />
                </div>
                <span>Partner with Xorvo Technologies. Power your business with smarter IT.</span>
              </Link>
            </div>
          </div>
          </div>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInUp {
            from { 
              opacity: 0;
              transform: translateY(30px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
          
          .animate-slideUp {
            animation: slideUp 0.7s ease-out;
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out;
          }
        `}</style>

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

        {/* Client Reviews Section - Full Width */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "'Rostex', 'Arial Black', sans-serif" }}>
              CLIENT <span className="text-accent">REVIEWS</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Review 1 */}
              <div className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  
                  {/* Review Content */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    "We are abundantly happy with Xorvo team service and support from the last one year. Your support is excellent and more accessible. The Implementation of Fortinet and Aruba networks served us to achieve our work more smoothly."
                  </p>
                  
                  {/* Client Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Vivek Patil</h4>
                      <p className="text-gray-600">Sr. Network Engineer</p>
                      <p className="text-accent font-medium">HCIN Network Private Limited</p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  
                  {/* Review Content */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    "The service and support of the Xorvo Team are awesome and we have been engaged with Xorvo for the last 2 years. Always ready to support us anytime with a suitable Solution. Great to have worked with WebVeer."
                  </p>
                  
                  {/* Client Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">IT Team</h4>
                      <p className="text-gray-600">Technology Department</p>
                      <p className="text-accent font-medium">Simpolo Vitrifed Pvt Ltd.</p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
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
