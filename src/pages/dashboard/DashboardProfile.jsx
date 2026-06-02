import { useState } from "react";
import { ShieldCheck, User, Users, Plus, Trash2 } from "lucide-react";
import { useAuth } from "../../contexts/useAuth";
import { load, save, uid } from "../../utils/storage";

// Profile headings, family member labels, and relation options are controlled here.
const DashboardProfile = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState(() => load("family", []));
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Spouse");

  const add = () => {
    const n = name.trim();
    if (!n) return;
    const next = [{ id: uid("fam"), name: n, relation }, ...members];
    setMembers(next);
    save("family", next);
    setName("");
  };

  const remove = (id) => {
    const next = members.filter((m) => m.id !== id);
    setMembers(next);
    save("family", next);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:rounded-[2.6rem] sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400" />
              Profile settings • Family members • Nominee management
            </div>
            <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Profile</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Manage user profile and connected family members.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:rounded-[2.6rem] sm:p-8">
          <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-slate-100">
            <User size={18} className="text-blue-600 dark:text-blue-400" />
            User profile
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: "Full name", value: user?.fullName ?? "—" },
              { label: "Email", value: user?.email ?? "—" },
              { label: "Phone", value: user?.phone ?? "—" },
              { label: "Member since", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—" },
            ].map((x) => (
              <div key={x.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{x.label}</div>
                <div className="mt-2 truncate text-sm font-black text-slate-900 dark:text-white">{x.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            Editing profile fields is intentionally disabled in this demo to keep auth state consistent.
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:rounded-[2.6rem] sm:p-8">
          <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-slate-100">
            <Users size={18} className="text-blue-600 dark:text-blue-400" />
            Family member management
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1fr_180px_auto]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
              placeholder="Member name"
            />
            <select
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
            >
              {["Spouse", "Parent", "Child", "Sibling", "Other"].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <button
              onClick={add}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-black text-white shadow-sm hover:opacity-95"
            >
              <Plus size={18} />
              Add
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {!members.length ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                No family members added yet.
              </div>
            ) : (
              members.map((m) => (
                <div
                  key={m.id}
                  className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-black text-slate-900 dark:text-white">{m.name}</div>
                    <div className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{m.relation}</div>
                  </div>
                  <button
                    onClick={() => remove(m.id)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 sm:w-auto"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
