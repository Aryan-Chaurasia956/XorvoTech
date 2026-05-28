import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

export default function RotatingGradientRight() {
  return (
    <section className="py-24 w-full bg-white text-black px-8 md:px-16 border-t border-gray-100">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        
        {/* LEFT: Text & Info */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#727CAB]">Advanced Workforce Management</h3>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            avinyaX Smart Employee Tracking, Simplified Field Management
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
            Empower your team and streamline operations with our state-of-the-art Employee Tracking & Management Software. Built for modern businesses that require absolute visibility, productivity analytics, automated task tracking, and seamless compliance reporting.
          </p>
          <div className="pt-2">
            <a href="https://avinyax.com/" target="_blank" rel="noopener noreferrer">
              <Button className="rounded-xl bg-[#727CAB] text-white hover:bg-[#727CAB]/90 px-6 py-5 text-base font-bold shadow-lg shadow-[#727CAB]/20 transition-all duration-300 hover:scale-105">
                Explore Avinyax Tracking <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>

        {/* RIGHT: Spline 3D Scene Card with Spotlight */}
        <div className="relative mx-auto w-full max-w-[34rem] h-[500px] bg-black/[0.96] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 flex flex-col justify-end">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="absolute inset-0 z-0">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
