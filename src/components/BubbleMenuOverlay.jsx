import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

import './BubbleMenu.css';

const MENU_ITEMS = [
  {
    label: 'Home',
    href: '/',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'About',
    href: '/about',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'Services',
    href: '#services',
    ariaLabel: 'Services',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' },
    hasSubmenu: true
  },
  {
    label: 'Solutions',
    href: '#solutions',
    ariaLabel: 'Solutions',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' },
    hasSubmenu: true
  },
  {
    label: 'Resources',
    href: '#resources',
    ariaLabel: 'Resources',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' },
    hasSubmenu: true
  },
  {
    label: 'Contact',
    href: '#contact',
    ariaLabel: 'Contact',
    rotation: -8,
    hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' }
  }
];

const RESOURCES_SUBMENU = [
  {
    label: 'Blog',
    href: '/resources#insights-industry-updates',
    ariaLabel: 'Blog',
    rotation: -8,
    hoverStyles: { bgColor: '#06b6d4', textColor: '#ffffff' }
  },
  {
    label: 'Case Studies',
    href: '/resources#case-studies',
    ariaLabel: 'Case Studies',
    rotation: 8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  },
  {
    label: 'Guides & Whitepapers',
    href: '/resources#technical-papers',
    ariaLabel: 'Guides & Whitepapers',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Security Alerts',
    href: '/resources#security-updates',
    ariaLabel: 'Security Alerts',
    rotation: -8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  }
];

const SOLUTIONS_SUBMENU = [
  {
    label: 'Business Solutions',
    href: '#business-solutions',
    ariaLabel: 'Business Solutions',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' },
    hasSubmenu: true
  },
  {
    label: 'Development & Hosting',
    href: '#development-hosting',
    ariaLabel: 'Development & Hosting',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' },
    hasSubmenu: true
  },
  {
    label: 'Digital Marketing & Infrastructure',
    href: '#digital-marketing-infrastructure',
    ariaLabel: 'Digital Marketing & Infrastructure',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' },
    hasSubmenu: true
  }
];

const SERVICES_SUBMENU = [
  {
    label: 'Cybersecurity Services',
    href: '#cybersecurity-services',
    ariaLabel: 'Cybersecurity Services',
    rotation: -8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' },
    hasSubmenu: true
  },
  {
    label: 'Cloud & Infrastructure',
    href: '#cloud-infrastructure',
    ariaLabel: 'Cloud & Infrastructure',
    rotation: 8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' },
    hasSubmenu: true
  },
  {
    label: 'Managed IT Services',
    href: '#managed-it-services',
    ariaLabel: 'Managed IT Services',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' },
    hasSubmenu: true
  },
  {
    label: 'Workspace & Collaboration',
    href: '#workspace-collaboration',
    ariaLabel: 'Workspace & Collaboration',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' },
    hasSubmenu: true
  },
  {
    label: 'Data Protection & Compliance',
    href: '#data-protection-compliance',
    ariaLabel: 'Data Protection & Compliance',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' },
    hasSubmenu: true
  },
  {
    label: 'IT Consulting & Deployment',
    href: '#it-consulting-deployment',
    ariaLabel: 'IT Consulting & Deployment',
    rotation: -8,
    hoverStyles: { bgColor: '#06b6d4', textColor: '#ffffff' },
    hasSubmenu: true
  }
];

const CYBERSECURITY_ITEMS = [
  {
    label: 'Network Security',
    href: '/services#network-security',
    ariaLabel: 'Network Security',
    rotation: -8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'Endpoint Protection',
    href: '/services#endpoint-protection',
    ariaLabel: 'Endpoint Protection',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Threat Detection & SOC',
    href: '/services#threat-detection-soc',
    ariaLabel: 'Threat Detection & SOC',
    rotation: 8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'Vulnerability Management',
    href: '/services#vulnerability-management',
    ariaLabel: 'Vulnerability Management',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  },
  {
    label: 'Incident Response & Forensics',
    href: '/services#incident-response-forensics',
    ariaLabel: 'Incident Response & Forensics',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'Email & Web Security',
    href: '/services#email-web-security',
    ariaLabel: 'Email & Web Security',
    rotation: -8,
    hoverStyles: { bgColor: '#06b6d4', textColor: '#ffffff' }
  },
  {
    label: 'Security Awareness & Training',
    href: '/services#security-awareness-training',
    ariaLabel: 'Security Awareness & Training',
    rotation: 8,
    hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' }
  },
  {
    label: 'Compliance & Audit',
    href: '/services#compliance-audit',
    ariaLabel: 'Compliance & Audit (ISO / GDPR / PCI DSS / HIPAA)',
    rotation: -8,
    hoverStyles: { bgColor: '#6366f1', textColor: '#ffffff' }
  }
];

const CLOUD_INFRASTRUCTURE_ITEMS = [
  {
    label: 'Cloud Migration',
    href: '/services#cloud-migration',
    ariaLabel: 'Cloud Migration',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'VPS Hosting',
    href: '/services#vps-hosting',
    ariaLabel: 'VPS Hosting',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'Infrastructure Design',
    href: '/services#infrastructure-design',
    ariaLabel: 'Infrastructure Design',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Hybrid & Multi-Cloud',
    href: '/services#hybrid-multi-cloud',
    ariaLabel: 'Hybrid & Multi-Cloud Management',
    rotation: -8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'Backup & Disaster Recovery',
    href: '/services#backup-disaster-recovery',
    ariaLabel: 'Backup & Disaster Recovery',
    rotation: 8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  },
  {
    label: 'Infrastructure Monitoring',
    href: '/services#infrastructure-monitoring',
    ariaLabel: 'Infrastructure Monitoring (NOC)',
    rotation: -8,
    hoverStyles: { bgColor: '#06b6d4', textColor: '#ffffff' }
  }
];

const MANAGED_IT_ITEMS = [
  {
    label: 'Monitoring & Maintenance',
    href: '/services#monitoring-maintenance',
    ariaLabel: 'Monitoring & Maintenance',
    rotation: -8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'Remote Support',
    href: '/services#remote-support',
    ariaLabel: 'Remote Support (Helpdesk & RMM)',
    rotation: 8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'Asset & Patch Management',
    href: '/services#asset-management',
    ariaLabel: 'Asset & Patch Management',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'SLA & Reporting',
    href: '/services#sla-reporting',
    ariaLabel: 'SLA & Reporting',
    rotation: -8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'IT Strategy & Budget Planning',
    href: '/services#it-strategy',
    ariaLabel: 'IT Strategy & Budget Planning',
    rotation: 8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];

const WORKSPACE_COLLABORATION_ITEMS = [
  {
    label: 'Microsoft 365',
    href: '/services#microsoft-365',
    ariaLabel: 'Microsoft 365',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  },
  {
    label: 'Zoho Workspace',
    href: '/services#zoho-workspace',
    ariaLabel: 'Zoho Workspace',
    rotation: 8,
    hoverStyles: { bgColor: '#06b6d4', textColor: '#ffffff' }
  },
  {
    label: 'Google Workspace',
    href: '/services#google-workspace',
    ariaLabel: 'Google Workspace',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Email Migration',
    href: '/services#email-migration',
    ariaLabel: 'Email Migration',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'Identity & Access',
    href: '/services#identity-access',
    ariaLabel: 'Identity & Access (SSO, MFA)',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'SaaS Backup',
    href: '/services#saas-backup',
    ariaLabel: 'SaaS Backup (M365/Google/Zoho)',
    rotation: -8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  }
];

const DATA_PROTECTION_ITEMS = [
  {
    label: 'Backup & Recovery',
    href: '/services#backup-recovery',
    ariaLabel: 'Backup & Recovery',
    rotation: -8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'DLP Data Loss Prevention',
    href: '/services#dlp-data-loss-prevention',
    ariaLabel: 'DLP (Data Loss Prevention)',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'Compliance Audits',
    href: '/services#compliance-audits',
    ariaLabel: 'Compliance Audits',
    rotation: 8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'Encryption & Key Management',
    href: '/services#encryption-key-management',
    ariaLabel: 'Encryption & Key Management',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  },
  {
    label: 'DR Planning & Testing',
    href: '/services#dr-planning-testing',
    ariaLabel: 'DR Planning & Testing',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  }
];

const IT_CONSULTING_ITEMS = [
  {
    label: 'Network Design',
    href: '/services#network-design',
    ariaLabel: 'Network Design',
    rotation: -8,
    hoverStyles: { bgColor: '#06b6d4', textColor: '#ffffff' }
  },
  {
    label: 'Application Deployment',
    href: '/services#application-deployment',
    ariaLabel: 'Application Deployment',
    rotation: 8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'CI/CD Automation',
    href: '/services#ci-cd-automation',
    ariaLabel: 'CI/CD Automation',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'Custom Applications',
    href: '/services#custom-applications',
    ariaLabel: 'Custom Applications',
    rotation: -8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Application Designing',
    href: '/services#application-designing',
    ariaLabel: 'Application Designing (UI/UX)',
    rotation: 8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  },
  {
    label: 'Deployment Automation',
    href: '/services#deployment-automation',
    ariaLabel: 'Deployment Automation',
    rotation: -8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'Monitoring & NOC Setup',
    href: '/services#monitoring-noc-setup',
    ariaLabel: 'Monitoring & NOC Setup',
    rotation: 8,
    hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' }
  },
  {
    label: 'Website Development',
    href: '/services#website-development',
    ariaLabel: 'Website Development',
    rotation: -8,
    hoverStyles: { bgColor: '#6366f1', textColor: '#ffffff' }
  },
  {
    label: 'SEO Optimization',
    href: '/services#seo-optimization',
    ariaLabel: 'SEO Optimization',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'AEO Optimization',
    href: '/services#aeo-optimization',
    ariaLabel: 'AEO (Answer Engine Optimization)',
    rotation: -8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'GEO Local SEO',
    href: '/services#geo-local-seo',
    ariaLabel: 'GEO (Local SEO)',
    rotation: 8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'CRM Implementation',
    href: '/services#crm-implementation',
    ariaLabel: 'CRM Implementation',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  },
  {
    label: 'ERP Implementation',
    href: '/services#erp-implementation',
    ariaLabel: 'ERP Implementation',
    rotation: 8,
    hoverStyles: { bgColor: '#06b6d4', textColor: '#ffffff' }
  },
  {
    label: 'HRMS Implementation',
    href: '/services#hrms-implementation',
    ariaLabel: 'HRMS Implementation',
    rotation: -8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'Network Designing',
    href: '/services#network-designing',
    ariaLabel: 'Network Designing',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  }
];

const BUSINESS_SOLUTIONS_ITEMS = [
  {
    label: 'CRM',
    href: '/solutions/crm',
    ariaLabel: 'CRM',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'ERP',
    href: '/solutions/erp',
    ariaLabel: 'ERP',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'HRMS',
    href: '/solutions/hrms',
    ariaLabel: 'HRMS',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Custom Application',
    href: '/solutions/custom-application',
    ariaLabel: 'Custom Application',
    rotation: -8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'Application Designing',
    href: '/solutions/application-designing',
    ariaLabel: 'Application Designing (UI/UX)',
    rotation: 8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];

const DEVELOPMENT_HOSTING_ITEMS = [
  {
    label: 'Website Development',
    href: '/solutions/website-development',
    ariaLabel: 'Website Development',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'App Development',
    href: '/solutions/app-development',
    ariaLabel: 'App Development',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'VPS Hosting',
    href: '/solutions/vps-hosting',
    ariaLabel: 'VPS Hosting',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Cloud Services',
    href: '/solutions/cloud-services',
    ariaLabel: 'Cloud Services',
    rotation: -8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'Deployment Automation',
    href: '/solutions/deployment-automation',
    ariaLabel: 'Deployment Automation',
    rotation: 8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];

const DIGITAL_MARKETING_ITEMS = [
  {
    label: 'SEO Optimization',
    href: '/solutions/seo',
    ariaLabel: 'SEO Optimization',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'AEO Optimization',
    href: '/solutions/aeo',
    ariaLabel: 'AEO (Answer Engine Optimization)',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'GEO Local SEO',
    href: '/solutions/geo',
    ariaLabel: 'GEO (Local SEO)',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Monitoring NOC',
    href: '/solutions/monitoring',
    ariaLabel: 'Monitoring (NOC)',
    rotation: -8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'Network Designing',
    href: '/solutions/network-designing',
    ariaLabel: 'Network Designing',
    rotation: 8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];

export default function BubbleMenuOverlay({ isOpen, onClose }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [submenuType, setSubmenuType] = useState(null); // 'resources' or 'solutions'
  const [showThirdLevel, setShowThirdLevel] = useState(false);
  const [thirdLevelType, setThirdLevelType] = useState(null); // 'business', 'development', or 'digital'
  const navigate = useNavigate();

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const handleItemClick = (item) => {
    if (item.hasSubmenu) {
      if (item.href === '#resources') {
        setSubmenuType('resources');
        setShowSubmenu(true);
      } else if (item.href === '#solutions') {
        setSubmenuType('solutions');
        setShowSubmenu(true);
      } else if (item.href === '#services') {
        setSubmenuType('services');
        setShowSubmenu(true);
      } else if (item.href.startsWith('#')) {
        // Third level submenu
        const type = item.href.includes('cybersecurity') ? 'cybersecurity' :
                   item.href.includes('cloud-infrastructure') ? 'cloud' :
                   item.href.includes('managed-it') ? 'managed' :
                   item.href.includes('workspace-collaboration') ? 'workspace' :
                   item.href.includes('data-protection') ? 'data' :
                   item.href.includes('it-consulting') ? 'consulting' :
                   item.href.includes('business') ? 'business' :
                   item.href.includes('development') ? 'development' : 
                   item.href.includes('digital') ? 'digital' :
                   item.href.includes('cloud') ? 'cloud' :
                   item.href.includes('managed') ? 'managed' :
                   item.href.includes('workspace') ? 'workspace' :
                   item.href.includes('data') ? 'data' : 'consulting';
        setThirdLevelType(type);
        setShowThirdLevel(true);
      }
    } else {
      onClose();
      if (item.href.startsWith('/')) {
        navigate(item.href);
      } else if (item.href === '#contact') {
        navigate('/?contact=true');
      }
    }
  };

  const handleBackClick = () => {
    if (showThirdLevel) {
      setShowThirdLevel(false);
      setThirdLevelType(null);
    } else {
      setShowSubmenu(false);
      setSubmenuType(null);
    }
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isOpen) {
      setShowOverlay(true);
      gsap.set(overlay, { display: 'flex' });
      
      if (showThirdLevel) {
        // Animate out second level, then animate in third level
        gsap.killTweensOf([...bubbles, ...labels]);
        gsap.to(labels, {
          y: 24,
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power3.in'
        });
        gsap.to(bubbles, {
          scale: 0,
          duration: 0.2,
          ease: 'power3.in',
          onComplete: () => {
            // Reset and animate third level items
            gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
            gsap.set(labels, { y: 24, autoAlpha: 0 });
            
            bubbles.forEach((bubble, i) => {
              const delay = i * 0.12 + gsap.utils.random(-0.05, 0.05);
              const tl = gsap.timeline({ delay });

              tl.to(bubble, {
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.5)'
              });
              if (labels[i]) {
                tl.to(
                  labels[i],
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: 'power3.out'
                  },
                  `-=${0.5 * 0.9}` 
                );
              }
            });
          }
        });
      } else if (showSubmenu) {
        // Animate out main menu, then animate in submenu
        gsap.killTweensOf([...bubbles, ...labels]);
        gsap.to(labels, {
          y: 24,
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power3.in'
        });
        gsap.to(bubbles, {
          scale: 0,
          duration: 0.2,
          ease: 'power3.in',
          onComplete: () => {
            // Reset and animate submenu items
            gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
            gsap.set(labels, { y: 24, autoAlpha: 0 });
            
            bubbles.forEach((bubble, i) => {
              const delay = i * 0.12 + gsap.utils.random(-0.05, 0.05);
              const tl = gsap.timeline({ delay });

              tl.to(bubble, {
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.5)'
              });
              if (labels[i]) {
                tl.to(
                  labels[i],
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: 'power3.out'
                  },
                  `-=${0.5 * 0.9}` 
                );
              }
            });
          }
        });
      } else {
        // Initial menu animation
        gsap.killTweensOf([...bubbles, ...labels]);
        gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
        gsap.set(labels, { y: 24, autoAlpha: 0 });

        bubbles.forEach((bubble, i) => {
          const delay = i * 0.12 + gsap.utils.random(-0.05, 0.05);
          const tl = gsap.timeline({ delay });

          tl.to(bubble, {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.5)'
          });
          if (labels[i]) {
            tl.to(
              labels[i],
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.5,
                ease: 'power3.out'
              },
              `-=${0.5 * 0.9}` 
            );
          }
        });
      }
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
          setShowSubmenu(false);
          setShowThirdLevel(false);
          setSubmenuType(null);
          setThirdLevelType(null);
        }
      });
    }
  }, [isOpen, showOverlay, showSubmenu, showThirdLevel]);

  if (!isOpen && !showOverlay) return null;

  return (
    <div
      ref={overlayRef}
      className="bubble-menu-items fixed"
      aria-hidden={!isOpen}
    >
      <ul className="pill-list" role="menu" aria-label="Menu links">
        {showThirdLevel ? (
          <>
            {/* Back button for third level */}
            <li role="none" className="pill-col">
              <button
                role="menuitem"
                aria-label="Back to solutions menu"
                className="pill-link"
                style={{
                  '--item-rot': '0deg',
                  '--pill-bg': '#6b7280',
                  '--pill-color': '#ffffff',
                  '--hover-bg': '#4b5563',
                  '--hover-color': '#ffffff'
                }}
                ref={el => {
                  if (el) bubblesRef.current[0] = el;
                }}
                onClick={handleBackClick}
              >
                <span
                  className="pill-label"
                  ref={el => {
                    if (el) labelRefs.current[0] = el;
                  }}
                >
                  ← Back
                </span>
              </button>
            </li>
            {/* Third level items */}
            <>
              {/* Visit Service button */}
              <li role="none" className="pill-col">
                <button
                  role="menuitem"
                  aria-label={`Visit ${thirdLevelType === 'cybersecurity' ? 'Cybersecurity Services' :
                    thirdLevelType === 'cloud' ? 'Cloud & Infrastructure' :
                    thirdLevelType === 'managed' ? 'Managed IT Services' :
                    thirdLevelType === 'workspace' ? 'Workspace & Collaboration' :
                    thirdLevelType === 'data' ? 'Data Protection & Compliance' :
                    thirdLevelType === 'consulting' ? 'IT Consulting & Deployment' : 'Service'} Page`}
                  className="pill-link"
                  style={{
                    '--item-rot': '0deg',
                    '--pill-bg': '#10b981',
                    '--pill-color': '#ffffff',
                    '--hover-bg': '#059669',
                    '--hover-color': '#ffffff'
                  }}
                  ref={el => {
                    if (el) bubblesRef.current[0] = el;
                  }}
                  onClick={() => {
                    onClose();
                    const serviceAnchor = thirdLevelType === 'cybersecurity' ? '#cybersecurity-hero' :
                                          thirdLevelType === 'cloud' ? '#cloud-migration' :
                                          thirdLevelType === 'managed' ? '#managed-it-hero' :
                                          thirdLevelType === 'workspace' ? '#workspace-hero' :
                                          thirdLevelType === 'data' ? '#data-protection-hero' :
                                          thirdLevelType === 'consulting' ? '#it-consulting-hero' :
                                          thirdLevelType === 'business' ? '#business-solutions' :
                                          thirdLevelType === 'development' ? '#development-hosting' :
                                          thirdLevelType === 'digital' ? '#digital-marketing-infrastructure' : 
                                          (thirdLevelType === 'business' || thirdLevelType === 'development' || thirdLevelType === 'digital' ? '#solutions' : '#services');
                    const basePath = (thirdLevelType === 'business' || thirdLevelType === 'development' || thirdLevelType === 'digital') ? '/solutions' : '/services';
                    navigate(`${basePath}${serviceAnchor}`);
                  }}
                >
                  <span
                    className="pill-label"
                    ref={el => {
                      if (el) labelRefs.current[0] = el;
                    }}
                  >
                    Visit {thirdLevelType === 'cybersecurity' ? 'Cybersecurity Services' :
                           thirdLevelType === 'cloud' ? 'Cloud & Infrastructure' :
                           thirdLevelType === 'managed' ? 'Managed IT Services' :
                           thirdLevelType === 'workspace' ? 'Workspace & Collaboration' :
                           thirdLevelType === 'data' ? 'Data Protection & Compliance' :
                           thirdLevelType === 'consulting' ? 'IT Consulting & Deployment' :
                           thirdLevelType === 'business' ? 'Business Solutions' :
                           thirdLevelType === 'development' ? 'Development & Hosting' :
                           thirdLevelType === 'digital' ? 'Digital Marketing & Infrastructure' : 'Service'}
                  </span>
                </button>
              </li>
              {/* Solution items */}
              {(thirdLevelType === 'business' ? BUSINESS_SOLUTIONS_ITEMS :
                thirdLevelType === 'development' ? DEVELOPMENT_HOSTING_ITEMS :
                thirdLevelType === 'digital' ? DIGITAL_MARKETING_ITEMS :
                thirdLevelType === 'cybersecurity' ? CYBERSECURITY_ITEMS :
                thirdLevelType === 'cloud' ? CLOUD_INFRASTRUCTURE_ITEMS :
                thirdLevelType === 'managed' ? MANAGED_IT_ITEMS :
                thirdLevelType === 'workspace' ? WORKSPACE_COLLABORATION_ITEMS :
                thirdLevelType === 'data' ? DATA_PROTECTION_ITEMS :
                IT_CONSULTING_ITEMS).map((item, idx) => (
                <li key={idx} role="none" className="pill-col">
                  <button
                    role="menuitem"
                    aria-label={item.ariaLabel || item.label}
                    className="pill-link"
                    style={{
                      '--item-rot': `${item.rotation ?? 0}deg`,
                      '--pill-bg': '#ffffff',
                      '--pill-color': '#111111',
                      '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                      '--hover-color': item.hoverStyles?.textColor || '#111111'
                    }}
                    ref={el => {
                      if (el) bubblesRef.current[idx + 1] = el;
                    }}
                    onClick={() => {
                      onClose();
                      navigate(item.href);
                    }}
                  >
                    <span
                      className="pill-label"
                      ref={el => {
                        if (el) labelRefs.current[idx + 1] = el;
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </>
          </>
        ) : showSubmenu ? (
          <>
            {/* Back button for submenu */}
            <li role="none" className="pill-col">
              <button
                role="menuitem"
                aria-label="Back to main menu"
                className="pill-link"
                style={{
                  '--item-rot': '0deg',
                  '--pill-bg': '#6b7280',
                  '--pill-color': '#ffffff',
                  '--hover-bg': '#4b5563',
                  '--hover-color': '#ffffff'
                }}
                ref={el => {
                  if (el) bubblesRef.current[0] = el;
                }}
                onClick={handleBackClick}
              >
                <span
                  className="pill-label"
                  ref={el => {
                    if (el) labelRefs.current[0] = el;
                  }}
                >
                  ← Back
                </span>
              </button>
            </li>
            {/* Visit Resources button - only show for Resources submenu */}
            {submenuType === 'resources' && (
              <li role="none" className="pill-col">
                <button
                  role="menuitem"
                  aria-label="Visit Resources Page"
                  className="pill-link"
                  style={{
                    '--item-rot': '0deg',
                    '--pill-bg': '#8b5cf6',
                    '--pill-color': '#ffffff',
                    '--hover-bg': '#7c3aed',
                    '--hover-color': '#ffffff'
                  }}
                  ref={el => {
                    if (el) bubblesRef.current[1] = el;
                  }}
                  onClick={() => {
                    onClose();
                    navigate('/resources');
                  }}
                >
                  <span
                    className="pill-label"
                    ref={el => {
                      if (el) labelRefs.current[1] = el;
                    }}
                  >
                    Visit Resources
                  </span>
                </button>
              </li>
            )}
            {/* Visit Solutions button - only show for Solutions submenu */}
            {submenuType === 'solutions' && (
              <li role="none" className="pill-col">
                <button
                  role="menuitem"
                  aria-label="Visit Solutions Page"
                  className="pill-link"
                  style={{
                    '--item-rot': '0deg',
                    '--pill-bg': '#10b981',
                    '--pill-color': '#ffffff',
                    '--hover-bg': '#059669',
                    '--hover-color': '#ffffff'
                  }}
                  ref={el => {
                    if (el) bubblesRef.current[1] = el;
                  }}
                  onClick={() => {
                    onClose();
                    navigate('/solutions');
                  }}
                >
                  <span
                    className="pill-label"
                    ref={el => {
                      if (el) labelRefs.current[1] = el;
                    }}
                  >
                    Visit Solutions
                  </span>
                </button>
              </li>
            )}
            {/* Visit Services button - only show for Services submenu */}
            {submenuType === 'services' && (
              <li role="none" className="pill-col">
                <button
                  role="menuitem"
                  aria-label="Visit Services Page"
                  className="pill-link"
                  style={{
                    '--item-rot': '0deg',
                    '--pill-bg': '#f59e0b',
                    '--pill-color': '#ffffff',
                    '--hover-bg': '#d97706',
                    '--hover-color': '#ffffff'
                  }}
                  ref={el => {
                    if (el) bubblesRef.current[1] = el;
                  }}
                  onClick={() => {
                    onClose();
                    navigate('/services');
                  }}
                >
                  <span
                    className="pill-label"
                    ref={el => {
                      if (el) labelRefs.current[1] = el;
                    }}
                  >
                    Visit Services
                  </span>
                </button>
              </li>
            )}
            {/* Submenu items */}
            {(submenuType === 'resources' ? RESOURCES_SUBMENU : 
              submenuType === 'services' ? SERVICES_SUBMENU : 
              SOLUTIONS_SUBMENU).map((item, idx) => (
              <li key={idx} role="none" className="pill-col">
                <button
                  role="menuitem"
                  aria-label={item.ariaLabel || item.label}
                  className="pill-link"
                  style={{
                    '--item-rot': `${item.rotation ?? 0}deg`,
                    '--pill-bg': '#ffffff',
                    '--pill-color': '#111111',
                    '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                    '--hover-color': item.hoverStyles?.textColor || '#111111'
                  }}
                  ref={el => {
                    if (el) bubblesRef.current[idx + (submenuType === 'solutions' || submenuType === 'services' ? 2 : submenuType === 'resources' ? 2 : 1)] = el;
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  <span
                    className="pill-label"
                    ref={el => {
                      if (el) labelRefs.current[idx + (submenuType === 'solutions' || submenuType === 'services' ? 2 : submenuType === 'resources' ? 2 : 1)] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </>
        ) : (
          /* Main menu items */
          MENU_ITEMS.map((item, idx) => (
            <li key={idx} role="none" className="pill-col">
              <button
                role="menuitem"
                aria-label={item.ariaLabel || item.label}
                className="pill-link"
                style={{
                  '--item-rot': `${item.rotation ?? 0}deg`,
                  '--pill-bg': '#ffffff',
                  '--pill-color': '#111111',
                  '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                  '--hover-color': item.hoverStyles?.textColor || '#111111'
                }}
                ref={el => {
                  if (el) bubblesRef.current[idx] = el;
                }}
                onClick={() => handleItemClick(item)}
              >
                <span
                  className="pill-label"
                  ref={el => {
                    if (el) labelRefs.current[idx] = el;
                  }}
                >
                  {item.label}
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
