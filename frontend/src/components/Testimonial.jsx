import { motion } from 'framer-motion';
import { Quote, Star, User } from 'lucide-react';

const ReviewSlider = () => {
  // Customer review text, names, dates, and ratings shown in the testimonial slider.
  const reviews = [
    {
      id: 1,
      text: "A great pleasure to be affiliated with Agile Claim. Had an accident and got the damaged parts replaced within a day.",
      author: "Shaaz Suhail",
      date: "6 Dec 2024",
      rating: 5
    },
    {
      id: 2,
      text: "Very good service. Within two minutes I have renewed my car insurance online. Extremely user friendly!",
      author: "Ajay Bharada",
      date: "13 Dec 2024",
      rating: 5
    },
    {
      id: 3,
      text: "Transparency and friendly staff. The claim process was faster than I ever expected. Best in the market.",
      author: "DinShaw Sahukar",
      date: "13 Dec 2024",
      rating: 5
    },
    {
      id: 4,
      text: "Quick reaction on Road side assistance. Happy with assistance in late night hours during my long trip.",
      author: "Abhishek Sharma",
      date: "20 Dec 2024",
      rating: 4
    },
    {
      id: 5,
      text: "I had issues with the policy and wanted to upgrade. The executive had enough patience to explain everything.",
      author: "Pratheesh R",
      date: "13 Aug 2024",
      rating: 5
    },
    {
      id: 6,
      text: "The Agile Claim app is a lifesaver. Uploaded photos and the surveyor contacted me within 30 minutes!",
      author: "Rahul V.",
      date: "02 Jan 2025",
      rating: 5
    },
  ];

  // Duplicate the array to create a seamless infinite loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="w-full overflow-hidden py-14 sm:py-20">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center">
          {/* Testimonial section heading and subheading. */}
          <h2 className="text-black text-3xl md:text-3xl font-extrabold mb-3 drop-shadow-md">
            What Our Clients Say
          </h2>
          <p className="text-black font-medium text-base sm:text-lg opacity-90">
            Experience the "Agile" way of insurance claims
          </p>
        </div>
      </div>

      {/* SLIDER CONTAINER */}
      <div className="relative flex overflow-hidden group">
        <motion.div 
          className="flex gap-6"
          animate={{ x: ["-50%", "0%"] }} // Left to Right animation
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {duplicatedReviews.map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -12, scale: 1 }}
              className="min-w-[82vw] sm:min-w-[320px] md:min-w-[400px] bg-white rounded-3xl p-5 sm:p-8 shadow-xl shadow-sky-900/10 border border-white cursor-pointer transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#e0f2fe] p-2 rounded-lg text-[#0ea5e9]">
                  <Quote size={28} fill="currentColor" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
                  {review.date}
                </span>
              </div>

              <p className="text-slate-700 text-base leading-relaxed mb-8 h-24 overflow-hidden italic line-clamp-4">
                "{review.text}"
              </p>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0ea5e9] border border-sky-100">
                    <User size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{review.author}</h4>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden text-[10px] font-black text-[#0ea5e9] opacity-30 uppercase tracking-tighter sm:block">
                  Agile Insurance
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Side Gradients for smooth fade effect */}
        {/* <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#e0f2fe] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#e0f2fe] to-transparent z-10 pointer-events-none" /> */}
      </div>
    </section>
  );
};

export default ReviewSlider;
