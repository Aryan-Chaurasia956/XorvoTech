import { useEffect } from "react";
 

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      
      {/* About Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover filter brightness-75"
          src="/aboutus2.jpg"
          alt="About Us background"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 text-center drop-shadow-lg">
              About Xorvo Technologies
            </h1>
            
            {/* Full Content */}
            <div className="space-y-6 text-base md:text-lg text-white leading-relaxed drop-shadow-md">
              <p>
                At Xorvo Technologies, we help organizations build secure, connected, and high-performing digital environments. 
                Our mission is to simplify technology so your business can focus on growth while we manage, protect, and optimize 
                everything behind the scenes.
              </p>

              <p>
                We deliver end-to-end IT, networking, cloud, and cybersecurity solutions that are reliable, scalable, and tailored 
                to your business goals. From securing your infrastructure to managing your cloud systems, we combine trusted 
                enterprise technologies with expert support to keep your operations running smoothly and securely — 24/7.
              </p>

              <p>
                As a trusted partner, we work with global leaders such as <strong className="highlight-stripe">Fortinet, Check Point, AWS, Sophos, Palo Alto Networks, 
                and Microsoft Defender</strong> to offer premium paid solutions designed for enterprises that require high-end performance, 
                compliance, and advanced threat protection.
              </p>

              <p>
                At the same time, we also deploy and manage open-source tools and applications for businesses that prefer flexible, 
                cost-effective, and customizable solutions. Whether it's open-source or licensed software, our engineers ensure both 
                are configured, integrated, and secured to deliver maximum reliability and value.
              </p>

              <p>
                We setup, provide licensing, and manage seamless migrations for <strong className="highlight-stripe">Microsoft 365, Zoho, and Google Workspace</strong> — 
                ensuring smooth transitions, complete data integrity, and zero downtime during your digital transformation.
              </p>

              <p>
                In networking, we design, deploy, and manage infrastructure built on technologies from <strong className="highlight-stripe">Aruba, Cisco, Juniper, 
                D-Link, and Ubiquiti</strong>, supported by our <strong className="highlight-stripe">24×7 Network Operations Center (NOC)</strong> for proactive monitoring, 
                real-time troubleshooting, and performance optimization.
              </p>

              <p>
                Additionally, we offer <strong className="highlight-stripe">VPS and dedicated server deployment, cloud hosting, and custom application deployment 
                services</strong> — bringing together the reliability of paid enterprise systems and the flexibility of open-source 
                environments to create a secure, scalable, and high-performance IT ecosystem for your business.
              </p>
            </div>
          </div>
        </div>
      </section>
 
    </div>
  );
};

export default About;
