import { Star } from "lucide-react"
import { LiquidCard, CardContent } from "@/components/ui/liquid-glass-card"
import { Marquee } from "@/components/ui/marquee"

const testimonials = [
  {
    name: "Vivek Patil",
    role: "Sr. Network Engineer",
    company: "HCIN Network Private Limited",
    content:
      "We are abundantly happy with Xorvo team service and support from the last one year. Your support is excellent and more accessible. The Implementation of Fortinet and Aruba networks served us to achieve our work more smoothly.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "IT Team",
    role: "Technology Department",
    company: "Simpolo Vitrified Pvt Ltd.",
    content:
      "The service and support of the Xorvo Team are awesome and we have been engaged with Xorvo for the last 2 years. Always ready to support us anytime with a suitable Solution. Great to have worked with WebVeer.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "Xorvo Tech Partner",
    content:
      "This managed IT and cybersecurity services library has transformed our development workflow. Complete infrastructure and network security are absolutely top-notch!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Alex Rodriguez",
    role: "Tech Lead",
    company: "Apex Solutions",
    content:
      "Excellent documentation and great community support. Highly professional team who helped us migrate our cloud infrastructure with zero downtime.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
]

export const Component = () => {
  return (
    <div className="w-full overflow-hidden py-4">
      <Marquee pauseOnHover className="[--duration:40s]">
        {testimonials.map((testimonial, index) => (
          <LiquidCard key={index} className="mx-2 rounded-3xl w-80 md:w-96 h-full border-gray-200/50 dark:border-white/10 shadow-lg bg-white/20 dark:bg-black/20 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center space-x-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-12 w-12 object-cover rounded-full border border-[#727CAB]/30"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  <p className="text-xs font-semibold text-[#727CAB] dark:text-[#727CAB]/90">{testimonial.company}</p>
                </div>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed min-h-[80px]">
                "{testimonial.content}"
              </p>
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </CardContent>
          </LiquidCard>
        ))}
      </Marquee>
    </div>
  );
};
export default Component;
