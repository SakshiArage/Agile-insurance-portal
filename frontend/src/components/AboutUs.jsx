import {assets} from "../assets/assets";

// About section heading, company name, narrative paragraphs, fiscal numbers, and app preview image live in this component.
const AboutUs = () => {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-24 font-sans leading-relaxed text-slate-600">
      <div className="container mx-auto max-w-7xl">
        
        {/* HEADING STYLE - Exactly like image */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold text-[#2d3291] mb-2">About Us</h2>
          <div className="w-16 h-1 bg-[#00a9e0]"></div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="space-y-6 sm:space-y-8 text-[15px]">
          
          <p>
            SecureLife Insurance is a <span className="font-bold text-slate-800">leading force in the digital insurance market</span>, committed to making insurance <span className="font-bold text-slate-800">smarter, faster, and more accessible</span> for everyone. Founded on the principles of trust and innovation, our platform combines <span className="font-bold text-slate-800">modern technology</span> with customer-focused services to provide a <span className="font-bold text-slate-800">seamless digital insurance experience</span>. SecureLife boasts a <span className="font-bold text-slate-800">remarkably diverse product portfolio</span>, extending far beyond conventional offerings to protect individuals, families, vehicles, businesses, and valuable assets with reliable solutions tailored to modern needs.
          </p>

          <p>
            We believe insurance should be <span className="font-bold text-slate-800">simple, transparent, and stress-free</span>. That’s why our system is designed with <span className="font-bold text-slate-800">AI-powered automation, real-time claim processing</span>, and <span className="font-bold text-slate-800">advanced fraud detection</span> to ensure speed, trust, and security. SecureLife has been recognized for its <span className="font-bold text-slate-800">domestic and global interconnectedness</span>, ensuring that our infrastructure supports large-scale operations including aviation, marine, and property insurance for complex risks.
          </p>

          <p>
            The company has consistently received <span className="font-bold text-slate-800">high ratings from major credit agencies</span>, highlighting its <span className="font-bold text-slate-800">financial strength</span>. We maintain a focus on delivering a smooth experience from start to finish with <span className="font-bold text-slate-800">24/7 customer support</span>, intelligent claim assistance, and <span className="font-bold text-slate-800">secure digital verification</span>. Our platform allows users to explore policies, compare plans, upload documents, <span className="font-bold text-slate-800">track claims live</span>, and receive instant updates anytime, anywhere.
          </p>

          {/* FISCAL INFO BOX - Styled like the image */}
          <div className="relative mt-10 sm:mt-12 p-5 sm:p-8 border border-slate-100 rounded-3xl overflow-hidden shadow-sm group">

            <div className="relative z-10 space-y-4">
              <p>
                In the <span className="font-bold text-slate-800">fiscal year 2024-25</span>, SecureLife solidified its position as <span className="font-bold text-slate-800">India's fastest-growing digital insurer</span>, achieving a <span className="font-bold text-slate-800">record gross written premium (GWP) of over ₹43,618 crore</span> and a <span className="font-bold text-slate-800">12.57% market share</span> in the tech-first segment. By combining technology, security, and personalized support, we aim to <span className="font-bold text-slate-800">redefine the future of digital insurance</span> and create a platform that customers can depend on with confidence.
              </p>
              
              <p>
                By the end of <span className="font-bold text-slate-800">Q3 FY26</span>, the company's <span className="font-bold text-slate-800">domestic market share climbed to 13.40%</span>, significantly <span className="font-bold text-slate-800">outperforming the industry average</span>. Furthermore, the company maintains a <span className="font-bold text-slate-800">strong solvency ratio of 1.81x</span>, well above the regulatory mandate, ensuring <span className="font-bold text-slate-800">long-term financial stability</span> for all our policyholders.
              </p>
            </div>
          </div>
            <div>
                <img
                className="mt-10 sm:mt-12 w-full rounded-3xl border border-slate-300 shadow-md"
                src = {assets.WebsiteApp}
                alt="Agile Insurance app preview"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
