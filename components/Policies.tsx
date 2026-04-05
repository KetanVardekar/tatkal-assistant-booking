"use client";

import { Clock, TrendingDown, FileText, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Policies() {
  const { t } = useLanguage();
  const p = t.policies;

  const policies = [
    { icon: Clock,        title: p.p1Title, description: p.p1Desc, color: "bg-blue-100 text-blue-700" },
    { icon: TrendingDown, title: p.p2Title, description: p.p2Desc, color: "bg-amber-100 text-amber-700" },
    { icon: FileText,     title: p.p3Title, description: p.p3Desc, color: "bg-slate-100 text-slate-700" },
    { icon: Users,        title: p.p4Title, description: p.p4Desc, color: "bg-purple-100 text-purple-700" },
  ];

  return (
    <section id="policies" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label mb-4 inline-flex">{p.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            {p.title}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">{p.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <div
                key={policy.title}
                className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-white"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${policy.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{policy.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{policy.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
