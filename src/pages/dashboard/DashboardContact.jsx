import { Clock3, Mail, MapPin, MessageCircle, PhoneCall, ShieldCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// Contact details shown on the dashboard Contact Us page.
const contactDetails = [
  {
    label: "Mobile number",
    value: "+91 98765 43210",
    helper: "Available for policy, claim, renewal, and account support.",
    icon: PhoneCall,
    href: "tel:+919876543210",
  },
  {
    label: "Email address",
    value: "care@agileclaim.com",
    helper: "Send documents, payment issues, or service requests anytime.",
    icon: Mail,
    href: "mailto:care@agileclaim.com",
  },
  {
    label: "WhatsApp support",
    value: "+91 98765 43210",
    helper: "Chat with support for quick claim, payment, and renewal updates.",
    icon: FaWhatsapp,
    href: "https://wa.me/919876543210?text=Hi%20Agile%20Claim%20Support%2C%20I%20need%20help%20with%20my%20insurance%20account.",
  },
];

const DashboardContact = () => {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400" />
              Customer support
            </div>
            <h1 className="mt-6 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Contact Us
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Reach Agile Claim support for policy purchases, active claims, renewals, payments, and account help.
            </p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hi%20Agile%20Claim%20Support%2C%20I%20need%20help%20with%20my%20insurance%20account."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-black text-white shadow-sm hover:opacity-95"
          >
            <FaWhatsapp size={18} />
            Start chat on WhatsApp
          </a>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {contactDetails.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("https://wa.me") ? "_blank" : undefined}
              rel={item.href.startsWith("https://wa.me") ? "noreferrer" : undefined}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                  <Icon size={22} />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {item.label}
                  </div>
                  <div className="mt-2 break-words text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                    {item.value}
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{item.helper}</p>
                </div>
              </div>
            </a>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {[
          { title: "Working hours", value: "Mon-Sat, 9:00 AM - 7:00 PM", icon: Clock3 },
          { title: "Quick message", value: "Reply within 24 working hours", icon: MessageCircle },
          { title: "Office", value: "Sector 44, Gurugram, Haryana", icon: MapPin },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm dark:bg-white/10 dark:text-blue-300">
                  <Icon size={18} />
                </span>
                <div>
                  <div className="text-sm font-black text-slate-900 dark:text-white">{item.title}</div>
                  <div className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">{item.value}</div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default DashboardContact;
