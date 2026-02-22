import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Sample blog posts data - same as in Blog component
const samplePosts = [
  {
    id: 1,
    title: "Getting Started with Cloud Migration",
    description: "Learn the essential steps and best practices for migrating your infrastructure to the cloud. This comprehensive guide covers planning, execution, and optimization strategies.",
    category: "Cloud",
    pubDate: "2024-01-15",
    readTime: "5 min read",
    heroImage: "/pexels-divinetechygirl-1181354.jpg",
    slug: "getting-started-cloud-migration",
    content: `
# Getting Started with Cloud Migration

Cloud migration has become a critical initiative for businesses looking to modernize their infrastructure and improve scalability. In this comprehensive guide, we'll walk you through the essential steps and best practices for a successful cloud migration journey.

## Understanding Cloud Migration

Cloud migration is the process of moving digital assets — such as data, applications, and IT processes — from on-premises infrastructure to cloud infrastructure. This transition offers numerous benefits including cost savings, improved scalability, and enhanced security.

## Key Benefits of Cloud Migration

### 1. Cost Optimization
- Reduced hardware maintenance costs
- Pay-as-you-go pricing models
- Lower energy consumption

### 2. Scalability and Flexibility
- Easy resource scaling based on demand
- Rapid deployment of new services
- Global reach with cloud providers

### 3. Enhanced Security
- Built-in security features
- Regular security updates
- Compliance certifications

## Planning Your Cloud Migration

### Assessment Phase
Before migrating, conduct a thorough assessment of:
- Current infrastructure and applications
- Data dependencies and relationships
- Compliance requirements
- Performance requirements

### Migration Strategy
Choose the right migration approach:
- **Rehost**: Lift and shift to the cloud
- **Replatform**: Make minor optimizations for the cloud
- **Refactor**: Re-architect applications for cloud-native
- **Replace**: Replace with cloud-native solutions

## Best Practices for Successful Migration

### 1. Start Small
Begin with non-critical applications to build experience and confidence.

### 2. Ensure Data Security
Implement proper encryption and access controls throughout the migration process.

### 3. Monitor Performance
Continuously monitor application performance and user experience during and after migration.

### 4. Plan for Rollback
Have a clear rollback strategy in case issues arise during migration.

## Common Challenges and Solutions

### Data Transfer Bottlenecks
- Use cloud-native data transfer services
- Schedule transfers during off-peak hours
- Implement data compression

### Application Compatibility
- Test applications thoroughly in the cloud environment
- Plan for necessary modifications
- Consider containerization for better portability

### Cost Management
- Set up budget alerts
- Regularly review resource usage
- Optimize resource allocation

## Conclusion

Cloud migration is a complex but rewarding process that can transform your business operations. By following proper planning, choosing the right strategy, and implementing best practices, you can ensure a successful migration that delivers maximum value to your organization.

Remember that cloud migration is not just a technical project — it's a business transformation that requires careful planning, stakeholder buy-in, and ongoing optimization.
    `
  },
  {
    id: 2,
    title: "Cybersecurity Best Practices for 2024",
    description: "Discover the latest cybersecurity threats and protection strategies that every business should implement to safeguard their digital assets.",
    category: "Security",
    pubDate: "2024-01-10",
    readTime: "8 min read",
    heroImage: "/pexels-kunitsky-210990.jpg",
    slug: "cybersecurity-best-practices-2024",
    content: `
# Cybersecurity Best Practices for 2024

As cyber threats continue to evolve, businesses must stay vigilant and implement robust security measures to protect their digital assets. This guide outlines the essential cybersecurity best practices that every organization should adopt in 2024.

## Current Threat Landscape

The cybersecurity landscape in 2024 is characterized by:
- Increased ransomware attacks
- Sophisticated phishing schemes
- AI-powered cyber attacks
- Supply chain vulnerabilities
- Remote work security challenges

## Essential Security Measures

### 1. Multi-Factor Authentication (MFA)
Implement MFA across all systems and applications:
- Use authenticator apps instead of SMS
- Enforce MFA for privileged accounts
- Consider hardware security keys for critical systems

### 2. Regular Security Training
Educate employees about:
- Phishing email recognition
- Social engineering tactics
- Safe browsing practices
- Incident reporting procedures

### 3. Network Security
Strengthen your network defenses:
- Implement next-generation firewalls
- Use intrusion detection systems
- Segment your network
- Monitor network traffic continuously

### 4. Data Protection
Protect sensitive data with:
- End-to-end encryption
- Data loss prevention tools
- Regular data backups
- Secure data disposal practices

## Advanced Security Strategies

### Zero Trust Architecture
Adopt a zero-trust security model:
- Verify every access request
- Implement least privilege access
- Continuous monitoring and validation
- Micro-segmentation

### Cloud Security
Secure your cloud environments:
- Configure cloud security groups properly
- Use cloud-native security tools
- Monitor cloud resource configurations
- Implement cloud access security brokers

### Incident Response Planning
Prepare for security incidents:
- Develop an incident response plan
- Create a security operations center (SOC)
- Conduct regular security drills
- Establish communication protocols

## Compliance and Regulations

Stay compliant with relevant regulations:
- GDPR for European operations
- CCPA for California residents
- HIPAA for healthcare data
- PCI DSS for payment processing
- Industry-specific compliance requirements

## Emerging Technologies

### AI and Machine Learning
Leverage AI for security:
- Threat detection and analysis
- Anomaly identification
- Automated response systems
- Predictive security analytics

### Blockchain for Security
Consider blockchain applications:
- Secure identity management
- Immutable audit trails
- Smart contract security
- Decentralized authentication

## Measuring Security Effectiveness

Track key security metrics:
- Mean time to detect (MTTD)
- Mean time to respond (MTTR)
- Number of security incidents
- Cost of security breaches
- Employee security awareness scores

## Conclusion

Cybersecurity is an ongoing process that requires continuous improvement and adaptation. By implementing these best practices, organizations can significantly improve their security posture and protect against evolving threats.

Remember that security is everyone's responsibility — from executives to frontline employees. Regular training, continuous monitoring, and staying informed about new threats are essential for maintaining robust cybersecurity in 2024 and beyond.
    `
  }
];

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the post by slug
    const foundPost = samplePosts.find(p => p.slug === slug);
    setPost(foundPost || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={post.heroImage}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center gap-4 text-white text-sm mb-4">
              <span className="bg-blue-600 px-3 py-1 rounded">{post.category}</span>
              <span>{new Date(post.pubDate).toLocaleDateString()}</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{paragraph.slice(2)}</h1>;
                } else if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{paragraph.slice(3)}</h2>;
                } else if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-bold text-gray-900 mt-4 mb-2">{paragraph.slice(4)}</h3>;
                } else if (paragraph.startsWith('- ')) {
                  return <li key={index} className="text-gray-700 ml-4">{paragraph.slice(2)}</li>;
                } else if (paragraph.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index} className="text-gray-700 mb-4 leading-relaxed">{paragraph}</p>;
                }
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
