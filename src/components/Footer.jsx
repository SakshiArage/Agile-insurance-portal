import { motion } from 'framer-motion';
import { assets } from "../assets/assets";
import {
  Plus,
  ShieldCheck
} from "lucide-react";

import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaTwitter
} from "react-icons/fa";

const Footer = () => {
  // Footer column titles and link labels are controlled here. Links become local hash anchors by default.
  const sections = [
    {
      title: "Insurance",
      links: ["General Insurance", "Life Insurance", "Term Insurance", "Investment", "Health Insurance", "Other Insurance"],
      hasIcon: true
    },
    {
      title: "Calculators",
      links: [
        "Investment Calculators", "Fitness Calculators", "Income Tax Calculator", 
        "Term Insurance Calculator", "EMI Calculator", "LIC Calculator", 
        "Life Insurance Calculator", "Health Insurance Calculator", 
        "Travel Insurance Calculator", "Car Insurance Calculator", "Bike Insurance Calculator"
      ],
      hasIcon: true
    },
    {
      title: "Resources",
      links: ["Articles", "Customer reviews", "Insurance companies", "Newsroom", "Awards"]
    },
    {
      title: "Agile Claim",
      links: ["About Us", "Careers", "Legal & Admin policies", "Contact us"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <footer className="bg-[#051024] text-gray-400 px-4 py-12 sm:px-6 sm:py-16 lg:px-24 font-sans border-t rounded-t-4xl border-slate-800">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto"
      >
        {/* TOP SECTION: LINKS */}
        <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 md:grid-cols-4 md:gap-10 md:mb-16">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-white font-semibold mb-6 text-lg">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, lIdx) => (
                  <motion.li 
                    key={lIdx} 
                    variants={itemVariants}
                    whileHover={{ x: 5, color: "#fff" }}
                    className="flex items-center gap-2 cursor-pointer transition-colors text-sm"
                  >
                    {section.hasIcon && <Plus size={14} className="text-gray-500" />}
                    <a href={`#${link.replace(/\s+/g, '-').toLowerCase()}`}>{link}</a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      {/* MIDDLE SECTION: TRUST BAR */}
      <div className="bg-[#0a192f] border border-slate-800 rounded-xl p-5 sm:p-8 mb-12 flex flex-col lg:flex-row justify-between items-center gap-8">

        {/* Payment method names and logos can be changed in src/assets/assets.js and the labels below. */}
        {/* Payment Methods */}
        <div className="text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-500">
            Payment Methods
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 items-center">

            {/* GPay */}
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition-all duration-300">
              <img
                src={assets.Gpay}
                alt="GPay"
                className="w-14 object-contain"
              />
            </div>

            {/* Visa */}
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition-all duration-300">
              <img
                src={assets.Visa}
                alt="Visa"
                className="w-14 object-contain"
              />
            </div>

            {/* Mastercard */}
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition-all duration-300">
              <img
                src={assets.MastercardLogo}
                alt="Mastercard"
                className="w-14 object-contain"
              />
            </div>

            {/* Paytm */}
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition-all duration-300">
              <img
                src={assets.PaytmLogo}
                alt="Paytm"
                className="w-14 object-contain"
              />
            </div>

          </div>
        </div>

  {/* Security badge text/certification label. */}
  {/* Secured With */}
  <div className="flex flex-col items-center border-x-0 lg:border-x border-slate-700 px-0 lg:px-10">
    <p className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-500">
      Secured With
    </p>

    <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded border border-green-500/30">
      <ShieldCheck className="text-green-500" size={20} />
      <span className="text-[10px] text-white font-bold">
        PCI DSS Certified
      </span>
    </div>
  </div>

  {/* Replace "#" href values below with real social profile URLs. */}
  {/* Social Icons */}
  <div className="text-center lg:text-right">
    <p className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-500">
      Follow us on
    </p>

    <div className="flex gap-4">
      {[FaFacebook, FaYoutube, FaLinkedin, FaTwitter].map((Icon, index) => (
        <motion.a
          key={index}
          whileHover={{ y: -5, backgroundColor: "#1e293b" }}
          href="#"
          className="bg-slate-800 p-3 rounded-lg text-white transition-colors"
        >
          <Icon size={18} />
        </motion.a>
      ))}
    </div>
  </div>
</div>
        {/* Legal company name, registration, contact, and disclaimer copy live in this block. */}
        {/* BOTTOM SECTION: DISCLAIMER */}
        <div className="space-y-4 text-[11px] leading-relaxed text-slate-500 max-w-6xl mx-auto">
          <div className="flex gap-2">
            <div className="min-w-[8px] h-[8px] rounded-full bg-slate-700 mt-1"></div>
            <p>
              <span className="text-slate-300 font-medium">Agile Claim App Insurance Brokers Private Limited</span> 
              CIN: U74999HR2014PTC053454 Registered Office - Plot No. 119, Sector - 44, Gurugram - 122001, Haryana Tel no. : 0124-4218302 Email ID: care@agileclaim.com
            </p>
          </div>
          <div className="flex gap-2">
            <div className="min-w-[8px] h-[8px] rounded-full bg-slate-700 mt-1"></div>
            <p>Agile Claim is registered as a Composite Broker | Registration No. 742, Registration Code No. IRDA/ DB 797/ 19, Valid till 09/06/2027, License category- Composite Broker</p>
          </div>
          <div className="flex gap-2">
            <div className="min-w-[8px] h-[8px] rounded-full bg-slate-700 mt-1"></div>
            <p>Visitors are hereby informed that their information submitted on the website may be shared with insurers. Product information is authentic and solely based on the information received from the insurers.</p>
          </div>
          <p className="font-bold text-slate-400 mt-6 text-center lg:text-left">
            BEWARE OF SPURIOUS PHONE CALLS AND FICTITIOUS / FRAUDULENT OFFERS
          </p>
          <p className="text-center lg:text-left">
            IRDAI or its officials do not involve in activities like selling insurance policies, announcing bonus or investment of premiums. Public receiving such phone calls are requested to lodge a police complaint.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
