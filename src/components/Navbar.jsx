import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BubbleMenuOverlay from "./BubbleMenuOverlay";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveSection, setMobileActiveSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  
  // Check if we're on a page with hero section
  const hasHeroSection = ['/', '/services', '/solutions', '/resources'].includes(location.pathname);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100); // Change to white after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Determine if navbar should be transparent
  const isTransparent = hasHeroSection && !isScrolled;

  // Map Services columns to their corresponding new service pages
  const servicesAnchorMap = {
    'Cybersecurity Services': '/cybersecurity-services',
    'Cloud & Infrastructure': '/cloud-infrastructure-services',
    'Managed IT Services': '/managed-it-services',
    'Workspace & Collaboration': '/workspace-collaboration-services',
    'Data Protection & Compliance': '/data-protection-compliance-services',
    'IT Consulting & Deployment': '/it-consulting-deployment-services',
  };

  // Map individual services to their corresponding new service pages and card IDs
  const individualServiceMap = {
    // Cybersecurity Services
    'Network Security': { page: '/cybersecurity-services', anchor: '#network-security' },
    'Endpoint Protection': { page: '/cybersecurity-services', anchor: '#endpoint-protection' },
    'Threat Detection & SOC': { page: '/cybersecurity-services', anchor: '#threat-detection-soc' },
    'Vulnerability Management': { page: '/cybersecurity-services', anchor: '#vulnerability-management' },
    'Incident Response & Forensics': { page: '/cybersecurity-services', anchor: '#incident-response-forensics' },
    'Email & Web Security': { page: '/cybersecurity-services', anchor: '#email-web-security' },
    'Security Awareness & Training': { page: '/cybersecurity-services', anchor: '#security-awareness-training' },
    'Compliance & Audit (ISO / GDPR / PCI DSS / HIPAA)': { page: '/cybersecurity-services', anchor: '#compliance-audit' },
    
    // Cloud & Infrastructure
    'Cloud Migration': { page: '/cloud-infrastructure-services', anchor: '#cloud-migration' },
    'VPS Hosting': { page: '/cloud-infrastructure-services', anchor: '#vps-hosting' },
    'Infrastructure Design': { page: '/cloud-infrastructure-services', anchor: '#infrastructure-design' },
    'Hybrid & Multi-Cloud Management': { page: '/cloud-infrastructure-services', anchor: '#hybrid-multi-cloud' },
    'Backup & Disaster Recovery': { page: '/cloud-infrastructure-services', anchor: '#backup-disaster-recovery' },
    'Infrastructure Monitoring (NOC)': { page: '/cloud-infrastructure-services', anchor: '#infrastructure-monitoring' },
    
    // Managed IT Services
    'Monitoring & Maintenance': { page: '/managed-it-services', anchor: '#monitoring-maintenance' },
    'Remote Support (Helpdesk & RMM)': { page: '/managed-it-services', anchor: '#remote-support' },
    'Asset & Patch Management': { page: '/managed-it-services', anchor: '#asset-management' },
    'SLA & Reporting': { page: '/managed-it-services', anchor: '#sla-reporting' },
    'IT Strategy & Budget Planning': { page: '/managed-it-services', anchor: '#it-strategy' },
    
    // Workspace & Collaboration
    'Microsoft 365': { page: '/workspace-collaboration-services', anchor: '#microsoft-365' },
    'Zoho Workspace': { page: '/workspace-collaboration-services', anchor: '#zoho-workspace' },
    'Google Workspace': { page: '/workspace-collaboration-services', anchor: '#google-workspace' },
    'Email Migration': { page: '/workspace-collaboration-services', anchor: '#email-migration' },
    'Identity & Access (SSO, MFA)': { page: '/workspace-collaboration-services', anchor: '#identity-access' },
    'SaaS Backup (M365/Google/Zoho)': { page: '/workspace-collaboration-services', anchor: '#saas-backup' },
    
    // Data Protection & Compliance
    'Backup & Recovery': { page: '/data-protection-compliance-services', anchor: '#backup-recovery' },
    'DLP (Data Loss Prevention)': { page: '/data-protection-compliance-services', anchor: '#dlp' },
    'Compliance Audits': { page: '/data-protection-compliance-services', anchor: '#compliance-audits' },
    'Encryption & Key Management': { page: '/data-protection-compliance-services', anchor: '#encryption-key' },
    'DR Planning & Testing': { page: '/data-protection-compliance-services', anchor: '#dr-planning' },
    
    // IT Consulting & Deployment
    'Network Design': { page: '/it-consulting-deployment-services', anchor: '#network-designing' },
    'Application Deployment': { page: '/it-consulting-deployment-services', anchor: '#application-deployment' },
    'CI/CD Automation': { page: '/it-consulting-deployment-services', anchor: '#ci-cd-automation' },
    'Custom Applications': { page: '/it-consulting-deployment-services', anchor: '#custom-applications' },
    'Application Designing (UI/UX)': { page: '/it-consulting-deployment-services', anchor: '#application-designing' },
    'Deployment Automation': { page: '/it-consulting-deployment-services', anchor: '#deployment-automation' },
    'Monitoring & NOC Setup': { page: '/it-consulting-deployment-services', anchor: '#monitoring-noc-setup' },
    'Website Development': { page: '/it-consulting-deployment-services', anchor: '#website-development' },
    'SEO Optimization': { page: '/it-consulting-deployment-services', anchor: '#seo-optimization' },
    'AEO (Answer Engine Optimization)': { page: '/it-consulting-deployment-services', anchor: '#aeo-optimization' },
    'GEO (Local SEO)': { page: '/it-consulting-deployment-services', anchor: '#geo-local-seo' },
    'CRM Implementation': { page: '/it-consulting-deployment-services', anchor: '#crm-implementation' },
    'ERP Implementation': { page: '/it-consulting-deployment-services', anchor: '#erp-implementation' },
    'HRMS Implementation': { page: '/it-consulting-deployment-services', anchor: '#hrms-implementation' },
    'Network Designing': { page: '/it-consulting-deployment-services', anchor: '#network-designing' },
    
    // Resources
    'Blog': { page: '/resources', anchor: '#insights-industry-updates' },
    'Case Studies': { page: '/resources', anchor: '#case-studies' },
    'Guides & Whitepapers': { page: '/resources', anchor: '#technical-papers' },
    'Security Alerts': { page: '/resources', anchor: '#security-updates' },
  };

  // Map Solutions columns to anchors on /solutions
  const solutionsAnchorMap = {
    'Business Solutions': '#business-solutions',
    'Development & Hosting': '#development-hosting',
    'Digital Marketing & Infrastructure': '#digital-marketing-infrastructure',
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const navItems = [
    {
      name: "Resources",
      columns: [
        {
          title: "Resources",
          items: [
            "Blog",
            "Case Studies",
            "Guides & Whitepapers",
            "Security Alerts",
          ],
        },
      ],
    },
    {
      name: "Solutions",
      columns: [
        {
          title: "Business Solutions",
          items: [
            { name: "CRM", path: "/solutions/crm" },
            { name: "ERP", path: "/solutions/erp" },
            { name: "HRMS", path: "/solutions/hrms" },
            { name: "Custom Application", path: "/solutions/custom-application" },
            { name: "Application Designing (UI/UX)", path: "/solutions/application-designing" },
          ],
        },
        {
          title: "Development & Hosting",
          items: [
            { name: "Website Development", path: "/solutions/website" },
            { name: "App Development", path: "/solutions/app" },
            { name: "VPS Hosting", path: "/solutions/vps-hosting" },
            { name: "Cloud Services", path: "/solutions/cloud" },
            { name: "Deployment Automation", path: "/solutions/deployment" },
          ],
        },
        {
          title: "Digital Marketing & Infrastructure",
          items: [
            { name: "SEO Optimization", path: "/solutions/seo" },
            { name: "AEO (Answer Engine Optimization)", path: "/solutions/aeo" },
            { name: "GEO (Local SEO)", path: "/solutions/geo" },
            { name: "Monitoring (NOC)", path: "/solutions/monitoring" },
            { name: "Network Designing", path: "/solutions/network-designing" },
          ],
        },
      ],
    },
    {
      name: "Services",
      columns: [
        {
          title: "Cybersecurity Services",
          items: [
            "Network Security",
            "Endpoint Protection",
            "Threat Detection & SOC",
            "Vulnerability Management",
            "Incident Response & Forensics",
            "Email & Web Security",
            "Security Awareness & Training",
            "Compliance & Audit (ISO / GDPR / PCI DSS / HIPAA)",
          ],
        },
        {
          title: "Cloud & Infrastructure",
          items: [
            "Cloud Migration",
            "VPS Hosting",
            "Infrastructure Design",
            "Hybrid & Multi-Cloud Management",
            "Backup & Disaster Recovery",
            "Infrastructure Monitoring (NOC)",
          ],
        },
        {
          title: "Managed IT Services",
          items: [
            "Monitoring & Maintenance",
            "Remote Support (Helpdesk & RMM)",
            "Asset & Patch Management",
            "SLA & Reporting",
            "IT Strategy & Budget Planning",
          ],
        },
        {
          title: "Workspace & Collaboration",
          items: [
            "Microsoft 365",
            "Zoho Workspace",
            "Google Workspace",
            "Email Migration",
            "Identity & Access (SSO, MFA)",
            "SaaS Backup (M365/Google/Zoho)",
          ],
        },
        {
          title: "Data Protection & Compliance",
          items: [
            "Backup & Recovery",
            "DLP (Data Loss Prevention)",
            "Compliance Audits",
            "Encryption & Key Management",
            "DR Planning & Testing",
          ],
        },
        {
          title: "IT Consulting & Deployment",
          items: [
            "Network Design",
            "Application Deployment",
            "CI/CD Automation",
            "Custom Applications",
            "Application Designing (UI/UX)",
            "Deployment Automation",
            "Monitoring & NOC Setup",
            "Website Development",
            "SEO Optimization",
            "AEO (Answer Engine Optimization)",
            "GEO (Local SEO)",
            "CRM Implementation",
            "ERP Implementation",
            "HRMS Implementation",
            "Network Designing",
          ],
        },
      ],
    },

  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md relative transition-colors duration-300 bg-white/95 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16 sm:h-20 relative">
            {/* TODO: make a new component for logo */}
            {/* Logo - Responsive */}
            <Link to="/" className="absolute left-0 flex items-center gap-2 sm:gap-4 cursor-pointer">
              <img
                src="/xorvo_im.png"
                alt="Logo"
                className="h-10 sm:h-12 w-auto transition-all"
                onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                loading="lazy"
                decoding="async"
              />
              <div className="h-10 sm:h-12 w-px bg-black"></div>
              <img
                src="/logo_xorvo1.png"
                alt="Xorvo Technologies"
                className="h-12 sm:h-14 md:h-16 w-auto"
                onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                loading="lazy"
                decoding="async"
              />
            </Link>

            {/* Navigation Items - Centered on Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  onMouseEnter={() => {
                    // Clear any existing timeout
                    if (dropdownTimeoutRef.current) {
                      clearTimeout(dropdownTimeoutRef.current);
                      dropdownTimeoutRef.current = null;
                    }
                    setActiveDropdown(item.name);
                  }}
                  onMouseLeave={(e) => {
                    // Only close if not moving to the dropdown
                    const relatedTarget = e.relatedTarget;
                    if (!relatedTarget || !relatedTarget.closest('.mega-menu-dropdown')) {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setActiveDropdown(null);
                        dropdownTimeoutRef.current = null;
                      }, 100);
                    }
                  }}
                >
                  <Button
                    variant="nav"
                    className="text-black hover:text-blue-600 text-base md:text-lg"
                    onClick={() => {
                      setActiveDropdown(null);
                      if (item.name === 'Resources') {
                        navigate('/resources');
                      }
                      if (item.name === 'Services') {
                        navigate('/services-overview');
                      }
                      if (item.name === 'Solutions') {
                        navigate('/solutions');
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                </div>
              ))}

              <Button
                variant="nav"
                className="text-black hover:text-blue-600 text-base md:text-lg"
                onClick={() => navigate('/about')}
              >
                About Us
              </Button>

              <Button
                variant="nav"
                className="text-black hover:text-blue-600 text-base md:text-lg"
                onClick={() => {
                  navigate('/?contact=true');
                }}
              >
                Contact
              </Button>
            </div>

            {/* Mobile Menu Button - Shows on Mobile & Tablet */}
            <div className="lg:hidden absolute right-0 flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="transition-colors p-2 active:scale-95 transition-transform text-gray-800 hover:text-[#001f3f]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown - Outside main navbar container */}
      {activeDropdown && (
        <div
          className="mega-menu-dropdown hidden lg:block fixed top-16 sm:top-20 left-0 right-0 z-[60] max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => {
            // Clear any existing timeout when entering dropdown
            if (dropdownTimeoutRef.current) {
              clearTimeout(dropdownTimeoutRef.current);
              dropdownTimeoutRef.current = null;
            }
            setActiveDropdown(activeDropdown);
          }}
          onMouseLeave={(e) => {
            // Add a small delay to prevent accidental closing
            const relatedTarget = e.relatedTarget;
            if (!relatedTarget || !relatedTarget.closest('.mega-menu-dropdown')) {
              dropdownTimeoutRef.current = setTimeout(() => {
                setActiveDropdown(null);
                dropdownTimeoutRef.current = null;
              }, 150);
            }
          }}
        >
          <div className="bg-black/95 backdrop-blur-sm border-t border-cyan-500/20 shadow-2xl min-h-[200px]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                {navItems
                  .find((item) => item.name === activeDropdown)
                  ?.columns.map((column, idx) => (
                    <div key={idx} className="space-y-5">
                      <Link 
                        to={activeDropdown === 'Services' ? servicesAnchorMap[column.title] || '/cybersecurity-services' : 
                             activeDropdown === 'Solutions' ? `/solutions${solutionsAnchorMap[column.title] || ''}` : 
                             activeDropdown === 'Resources' ? '/resources' : 
                             '#'}
                        onClick={() => setActiveDropdown(null)}
                        className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 hover:text-cyan-300 transition-colors duration-200 cursor-pointer"
                      >
                        {column.title}
                      </Link>
                      <ul className="space-y-3">
                        {column.items.map((subItem, subIdx) => {
                          const isHighlighted = column.highlightLast && subIdx === column.items.length - 1;
                          // Handle both string and object items
                          const itemName = typeof subItem === 'string' ? subItem : subItem.name;
                          const itemPath = typeof subItem === 'string' ? '#' : subItem.path;
                          const individualServiceAnchor = individualServiceMap[itemName] || '';
                          
                          // For Services dropdown, use individual service anchor; for Solutions, use solutions anchor; for Resources, use resources anchor
                          const finalPath = activeDropdown === 'Services' ? individualServiceAnchor ? `${individualServiceAnchor.page}${individualServiceAnchor.anchor}` : servicesAnchorMap[column.title] || '/cybersecurity-services' :
                                          activeDropdown === 'Solutions' ? `/solutions${solutionsAnchorMap[column.title] || ''}` : 
                                          activeDropdown === 'Resources' ? `/resources${individualServiceMap[itemName]?.anchor || ''}` :
                                          itemPath;

                          return (
                            <li key={subIdx}>
                              <Link
                                to={finalPath}
                                className={`block text-white hover:text-cyan-400 transition-colors duration-200 ${isHighlighted ? 'text-cyan-400 font-medium' : ''
                                  }`}
                                onClick={() => setActiveDropdown(null)}
                              >
                                {itemName}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu - Shows on Mobile & Tablet */}
      {mobileMenuOpen && (
        <>
          {/* Bubble Menu Overlay for Mobile */}
          <div className="lg:hidden md:hidden">
            <BubbleMenuOverlay
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            />
          </div>
          
          {/* Traditional Mobile Menu for Tablet */}
          <div className="hidden lg:hidden md:block bg-white border-t border-border animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-border/50 last:border-0">
                <button
                  onClick={() => setMobileActiveSection(mobileActiveSection === item.name ? null : item.name)}
                  className="w-full flex items-center justify-between py-4 text-black font-medium hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </button>

                {/* Mobile Submenu */}
                {mobileActiveSection === item.name && (
                  <div className="pb-4 space-y-4 sm:space-y-6">
                    {item.columns.map((column, idx) => (
                      <div key={idx} className="space-y-2 sm:space-y-3">
                        <h4 className="text-blue-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                          {column.title}
                        </h4>
                        <ul className="space-y-2 pl-3 sm:pl-4">
                          {column.items.map((subItem, subIdx) => {
                            const isHighlighted = column.highlightLast && subIdx === column.items.length - 1;
                            // Handle both string and object items
                            const itemName = typeof subItem === 'string' ? subItem : subItem.name;
                            const itemPath = typeof subItem === 'string' ? '#' : subItem.path;

                            return (
                              <li key={subIdx}>
                                <Link
                                  to={item.name === 'Solutions' ? `/solutions${solutionsAnchorMap[column.title] || ''}` : 
                                       item.name === 'Services' ? `/services${servicesAnchorMap[column.title] || ''}` : 
                                       item.name === 'Resources' ? `/resources${individualServiceMap[itemName] || ''}` : 
                                       itemPath}
                                  className={`block text-sm sm:text-base py-2 transition-colors active:scale-95 ${isHighlighted
                                      ? 'text-blue-600 font-medium'
                                      : 'text-gray-700 hover:text-black'
                                    }`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {itemName}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Additional Menu Items for Mobile */}
            <div className="border-t border-border/50 pt-4 space-y-2">
              <button
                onClick={() => {
                  navigate('/about');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-black font-medium hover:text-blue-600 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => {
                  navigate('/?contact=true');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-black font-medium hover:text-blue-600 transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Logo for Mobile */}
            <div className="py-4 mt-4 border-t border-border/50">
              <div className="flex items-center">
                <img
                  src="/logo_xorvo1.png"
                  alt="Xorvo logo"
                  className="h-8 sm:h-9 w-auto object-contain"
                  onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
