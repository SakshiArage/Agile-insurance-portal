import { useState, useEffect } from 'react';

// Counter Component using Pure React
const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    // Remove commas to get the raw number
    const end = parseInt(target.replace(/,/g, ''));
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const increment = end / totalFrames;

    let currentFrame = 0;
    const timer = setInterval(() => {
      currentFrame++;
      start += increment;
      
      if (currentFrame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [target]);

  // Format number back to Indian format (e.g. 1,09,61,759)
  const formatted = count.toLocaleString('en-IN');
  return <span>{formatted}{suffix}</span>;
};

const WhyChooseUs = () => {
  // Dashboard-style stat numbers, labels, link labels, and paths for this homepage stats grid.
  const stats = [
    {
      id: 1,
      // Inline SVG for Policies
      icon: <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline><path d="M6 10l2 2 4-4" stroke="#fbbf24" strokeWidth="2"></path></svg>,
      number: "1,09,61,759",
      label: "Policies Issued",
      linkText: "",
      path: "#"
    },
    {
      id: 2,
      // Inline SVG for Workshops
      icon: <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M9 14h6m-6 3h6m-7-9l4-4 4 4"></path><circle cx="12" cy="11" r="3"></circle></svg>,
      number: "1,932",
      label: "Cashless Workshops",
      linkText: "View Network Garages",
      path: "/garages"
    },
    {
      id: 3,
      // Inline SVG for Hospitals
      icon: <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle><path d="M12 7v6m-3-3h6" strokeWidth="2"></path></svg>,
      number: "5,322",
      label: "Network Hospitals",
      linkText: "View Network Hospitals",
      path: "/hospitals"
    },
    {
      id: 4,
      // Inline SVG for Trust
      icon: <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 11l-5 5-2-2" stroke="#22c55e" strokeWidth="2"></path></svg>,
      number: "120",
      suffix: "+",
      label: "Years Of Trust",
      linkText: "View Testimonial",
      path: "/testimonials"
    },
    {
      id: 5,
      // Inline SVG for Support
      icon: <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
      number: "24",
      suffix: "*7",
      label: "Assistance And Support",
      linkText: "Contact Us",
      path: "/contact"
    },
    {
      id: 6,
      // Inline SVG for Claims
      icon: <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M12 18l-2-2 2-2"></path><path d="M10 16h8"></path></svg>,
      number: "23,73,803",
      label: "Claims Settled",
      linkText: "Claims Settled",
      path: "/claims"
    }
  ];

  return (
    <div className="bg-white py-16 px-4 md:px-10 lg:px-20 w-full overflow-hidden">
      {/* Main stats heading and financial-year note. */}
      {/* Header section with NICL style */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-10 relative">
        <h2 className="text-3xl font-bold text-[#444] text-center">Why Choose Agile Claim</h2>
        <div className="md:absolute md:right-0 text-red-600 font-bold text-sm mt-2 md:mt-0">
          * Financial Year 2024 - 25
        </div>
      </div>

      {/* 6 Boxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {stats.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-blue-500 hover:shadow-md cursor-pointer group"
          >
            {/* Box Icon */}
            <div className="mb-4 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </div>

            {/* Number Counter */}
            <div className="text-[22px] font-black text-gray-900 leading-none mb-1">
              <AnimatedCounter target={item.number} suffix={item.suffix} />
            </div>

            {/* Label Text */}
            <div className="text-[13px] font-bold text-gray-800 mb-4 h-10 flex items-center justify-center">
              {item.label}
            </div>

            {/* Link at the bottom */}
            {item.linkText && (
              <a 
                href={item.path}
                className="text-[11px] font-bold text-blue-800 hover:underline uppercase tracking-tighter mt-auto"
              >
                {item.linkText}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
