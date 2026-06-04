import { useMemo, useState } from "react";
import { Calculator, Car, HeartPulse, Landmark, ShieldCheck } from "lucide-react";

const calculatorTypes = [
  { id: "premium", label: "Insurance Premium", icon: ShieldCheck },
  { id: "term", label: "Term Insurance", icon: HeartPulse },
  { id: "emi", label: "EMI", icon: Landmark },
  { id: "car", label: "Car Insurance", icon: Car },
];

const currency = (value) => `INR ${Math.max(0, Math.round(value)).toLocaleString("en-IN")}`;

const CalculatorPage = () => {
  const params = new URLSearchParams(window.location.search);
  const initialType = calculatorTypes.some((item) => item.id === params.get("type")) ? params.get("type") : "premium";
  const [type, setType] = useState(initialType);
  const [age, setAge] = useState(32);
  const [coverage, setCoverage] = useState(1000000);
  const [term, setTerm] = useState(20);
  const [income, setIncome] = useState(900000);
  const [loanAmount, setLoanAmount] = useState(800000);
  const [rate, setRate] = useState(9);
  const [months, setMonths] = useState(60);
  const [carValue, setCarValue] = useState(650000);

  const result = useMemo(() => {
    if (type === "term") {
      const riskFactor = age < 35 ? 0.0018 : age < 50 ? 0.0028 : 0.0042;
      const annualPremium = coverage * riskFactor + term * 85;
      return {
        title: "Estimated Term Premium",
        primary: currency(annualPremium),
        lines: [
          ["Recommended Cover", currency(Math.max(coverage, income * 10))],
          ["Monthly Premium", currency(annualPremium / 12)],
          ["Policy Term", `${term} years`],
        ],
      };
    }

    if (type === "emi") {
      const monthlyRate = rate / 12 / 100;
      const emi = monthlyRate === 0 ? loanAmount / months : (loanAmount * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
      return {
        title: "Monthly EMI",
        primary: currency(emi),
        lines: [
          ["Total Payment", currency(emi * months)],
          ["Interest Payable", currency(emi * months - loanAmount)],
          ["Tenure", `${months} months`],
        ],
      };
    }

    if (type === "car") {
      const premium = carValue * 0.028 + (age < 25 ? 3500 : 1800);
      return {
        title: "Estimated Car Premium",
        primary: currency(premium),
        lines: [
          ["Insured Declared Value", currency(carValue)],
          ["Monthly Equivalent", currency(premium / 12)],
          ["Add-ons Estimate", currency(carValue * 0.006)],
        ],
      };
    }

    const base = coverage * 0.012;
    const ageLoad = age > 45 ? coverage * 0.004 : age > 35 ? coverage * 0.002 : 0;
    const premium = base + ageLoad;
    return {
      title: "Estimated Insurance Premium",
      primary: currency(premium),
      lines: [
        ["Coverage Amount", currency(coverage)],
        ["Monthly Premium", currency(premium / 12)],
        ["Risk Loading", currency(ageLoad)],
      ],
    };
  }, [age, carValue, coverage, income, loanAmount, months, rate, term, type]);

  return (
    <main className="bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-black text-blue-700">
                <Calculator size={16} />
                Live calculator
              </div>
              <h1 className="mt-4 text-2xl font-black text-slate-950 sm:text-3xl">Insurance Calculators</h1>
              <p className="mt-2 max-w-2xl text-sm font-semibold text-slate-600">
                Choose a calculator and adjust the values to get an instant estimate.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {calculatorTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setType(item.id)}
                    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition ${type === item.id ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700"}`}
                  >
                    <Icon size={17} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <section className="grid gap-4 sm:grid-cols-2">
              {type !== "emi" && (
                <label className="rounded-2xl border border-slate-200 p-4">
                  <span className="text-xs font-black uppercase tracking-wide text-slate-500">Age</span>
                  <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="mt-2 h-12 w-full rounded-xl bg-slate-50 px-3 font-bold outline-none" />
                </label>
              )}
              {(type === "premium" || type === "term") && (
                <label className="rounded-2xl border border-slate-200 p-4">
                  <span className="text-xs font-black uppercase tracking-wide text-slate-500">Coverage</span>
                  <input type="number" value={coverage} onChange={(e) => setCoverage(Number(e.target.value))} className="mt-2 h-12 w-full rounded-xl bg-slate-50 px-3 font-bold outline-none" />
                </label>
              )}
              {type === "term" && (
                <>
                  <label className="rounded-2xl border border-slate-200 p-4">
                    <span className="text-xs font-black uppercase tracking-wide text-slate-500">Policy Term</span>
                    <input type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} className="mt-2 h-12 w-full rounded-xl bg-slate-50 px-3 font-bold outline-none" />
                  </label>
                  <label className="rounded-2xl border border-slate-200 p-4">
                    <span className="text-xs font-black uppercase tracking-wide text-slate-500">Annual Income</span>
                    <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="mt-2 h-12 w-full rounded-xl bg-slate-50 px-3 font-bold outline-none" />
                  </label>
                </>
              )}
              {type === "emi" && (
                <>
                  <label className="rounded-2xl border border-slate-200 p-4">
                    <span className="text-xs font-black uppercase tracking-wide text-slate-500">Loan Amount</span>
                    <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="mt-2 h-12 w-full rounded-xl bg-slate-50 px-3 font-bold outline-none" />
                  </label>
                  <label className="rounded-2xl border border-slate-200 p-4">
                    <span className="text-xs font-black uppercase tracking-wide text-slate-500">Interest Rate %</span>
                    <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-2 h-12 w-full rounded-xl bg-slate-50 px-3 font-bold outline-none" />
                  </label>
                  <label className="rounded-2xl border border-slate-200 p-4">
                    <span className="text-xs font-black uppercase tracking-wide text-slate-500">Tenure Months</span>
                    <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="mt-2 h-12 w-full rounded-xl bg-slate-50 px-3 font-bold outline-none" />
                  </label>
                </>
              )}
              {type === "car" && (
                <label className="rounded-2xl border border-slate-200 p-4">
                  <span className="text-xs font-black uppercase tracking-wide text-slate-500">Car Value</span>
                  <input type="number" value={carValue} onChange={(e) => setCarValue(Number(e.target.value))} className="mt-2 h-12 w-full rounded-xl bg-slate-50 px-3 font-bold outline-none" />
                </label>
              )}
            </section>

            <aside className="rounded-3xl bg-slate-950 p-5 text-white">
              <div className="text-sm font-black text-white/70">{result.title}</div>
              <div className="mt-3 text-3xl font-black">{result.primary}</div>
              <div className="mt-6 space-y-3">
                {result.lines.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold">
                    <span className="text-white/70">{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CalculatorPage;
