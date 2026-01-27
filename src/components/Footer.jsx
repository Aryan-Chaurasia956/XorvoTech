import { Linkedin, Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  // Map Solution footer items to anchors on the Solutions page
  const solutionFooterMap = {
    "Managed Detection and Response": "/solutions#unified-security-performance-ops",
    "Cloud Detection and Response": "/solutions#network-security",
    "Managed Risk": "/solutions#monitoring-automation",
    "Cloud Security Posture Management": "/solutions#cloud-enablement",
    "Managed Security Awareness": "/solutions#network-security",
    "Incident Response": "/solutions#unified-security-performance-ops",
  };

  // Map Services footer items to dedicated service pages
  const servicesFooterMap = {
    "Cybersecurity Services": "/cybersecurity-services",
    "Cloud & Infrastructure": "/cloud-infrastructure-services",
    "Managed IT Services": "/managed-it-services",
    "Workspace & Collaboration": "/workspace-collaboration-services",
    "Data Protection & Compliance": "/data-protection-compliance-services",
    "IT Consulting & Deployment": "/it-consulting-deployment-services"
  };
  const footerLinks = {
    Solutions: [
      "Managed Detection and Response",
      "Cloud Detection and Response",
      "Managed Risk",
      "Cloud Security Posture Management",
      "Managed Security Awareness",
      "Incident Response"
    ],
    Services: [
      "Cybersecurity Services",
      "Cloud & Infrastructure",
      "Managed IT Services",
      "Workspace & Collaboration",
      "Data Protection & Compliance",
      "IT Consulting & Deployment"
    ],
    Partners: [
      "Become a Partner",
      "Contact Us"
    ],
    Resources: [
      "Blog",
      "Case Studies",
      "Webinars"
    ]
  };

  return (
    <footer className="bg-white border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Contact Information Column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img
                src="/aviynax.png"
                alt="Xorvo Technologies"
                className="h-8 w-auto"
                onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                loading="lazy"
                decoding="async"
              />
            </div>
            
            {/* Contact Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="tel:+919792908405" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  +91 97929 08405
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:tech@avinyax.com" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  tech@avinyax.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold">Registered Office:</p>
                  <p className="text-xs">403 B Wing, Vakola Bridge, Santacruz, Mumbai MH – 400055</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold">Corporate Office:</p>
                  <p className="text-xs">Majestic Signia, 1st Floor, Plot No. A-27, Sector 62 Noida UP- 201309</p>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/xorvo-technologies-private-limited/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/xorvo_tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61579183072232"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/xorvotechno"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <img
                  src="/twitter-logo.png"
                  alt="Xorvo Twitter"
                  className="h-5 w-5 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            links.length > 0 && (
              <div key={title}>
                <h3 className="font-bold text-foreground mb-4">{title === "Partners" ? "Partners & Company" : title}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      {title === "Partners" && (link === "Become a Partner" || link === "Contact Us") ? (
                        <Link
                          to={link === "Become a Partner" ? "/?contact=true&partner=true" : "/?contact=true"}
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          {link}
                        </Link>
                      ) : title === "Company" && link === "Contact Us" ? (
                        <Link
                          to="/?contact=true"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          {link}
                        </Link>
                      ) : title === "Solutions" ? (
                        <Link
                          to={solutionFooterMap[link] || "/solutions"}
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          {link}
                        </Link>
                      ) : title === "Services" ? (
                        <Link
                          to={servicesFooterMap[link] || "/services-overview"}
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          {link}
                        </Link>
                      ) : (
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          {link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Xorvo Technologies Pvt Ltd All Rights Reserved
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              to="/privacy-policy"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
