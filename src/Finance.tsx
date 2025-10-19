import { useState } from "react";
import { TrendingUp, TrendingDown, Euro, CreditCard, PiggyBank, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "./card";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ACCENT_COLORS = {
  personnel: '#3b82f6',
  abonnements: '#10b981',
  prestataires: '#8b5cf6',
  achats: '#f59e0b',
  autres: '#ef4444',
};

interface KPICardProps {
    title: string;
    value: number;
    icon: any; 
    colorClass: string;
    evolution: number;
    valueSuffix?: string;
    valuePrefix?: string;
}

const KPICard = ({ 
    title, 
    value, 
    icon: Icon, 
    colorClass, 
    evolution, 
    valueSuffix = '€', 
    valuePrefix = '' 
}: KPICardProps) => {
  const isPositive = evolution >= 0;
  const trendIcon = isPositive 
    ? <TrendingUp className="w-4 h-4" /> 
    : <TrendingDown className="w-4 h-4" />;
  
  const trendColor = isPositive 
    ? 'text-green-500 bg-green-500/20' 
    : 'text-red-500 bg-red-500/20'; 

  let iconBgColor = 'bg-purple-500/20 border-purple-500/30'; 

  if (colorClass === 'text-blue-500') {
    iconBgColor = 'bg-blue-500/20 border-blue-500/30';
  } else if (colorClass === 'text-red-500') {
    iconBgColor = 'bg-red-500/20 border-red-500/30';
  } else if (colorClass === 'text-green-500') {
    iconBgColor = 'bg-green-500/20 border-green-500/30';
  }
  
  return (
    <Card className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 hover:scale-[1.02] transition-all duration-300 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center border`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trendColor} text-xs font-medium`}>
          {trendIcon}
          {evolution >= 0 ? `+${evolution}%` : `${evolution}%`} 
        </div>
      </div>
      <h3 className="text-3xl font-bold mb-1 text-white">{valuePrefix}{value.toLocaleString()} {valueSuffix}</h3>
      <p className="text-sm font-medium text-white/60">{title}</p>
      <p className="text-xs text-white/40 mt-2">vs période précédente</p>
    </Card>
  )
}

export default function Finance() {
  const [period, setPeriod] = useState<"mois" | "semestre" | "annee">("mois");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    personnel: true,
    abonnements: false,
    prestataires: false,
    achats: false,
    autres: false,
  });

  const financialData = {
    mois: {
      ca: 12000,
      upsells: 3000,
      totalRevenus: 15000,
      nbVentes: 8,
      panierMoyen: 1500,
      tauxUpsell: 37.5,
      totalCharges: 8500,
      benefice: 6500,
      evolution: { ca: 12, charges: 5, benefice: 23 },
      depenses: {
        personnel: { total: 3500, details: [{ label: "Salaires", value: 3000 }, { label: "Sous-traitance", value: 500 }] },
        abonnements: { total: 1200, details: [{ label: "Abonnement 1", value: 300 }, { label: "Abonnement 2", value: 450 }, { label: "Abonnement 3", value: 250 }, { label: "Abonnement 4", value: 200 }] },
        prestataires: { total: 1800, details: [{ label: "Prestataire 1", value: 800 }, { label: "Prestataire 2", value: 600 }, { label: "Prestataire 3", value: 400 }] },
        achats: { total: 1500, details: [{ label: "Achat 1", value: 800 }, { label: "Achat 2", value: 400 }, { label: "Achat 3", value: 300 }] },
        autres: { total: 500, details: [{ label: "Tickets resto", value: 300 }, { label: "Divers", value: 200 }] },
      },
    },
    semestre: {
      ca: 68000,
      upsells: 17000,
      totalRevenus: 85000,
      nbVentes: 48,
      panierMoyen: 1416,
      tauxUpsell: 33.3,
      totalCharges: 48000,
      benefice: 37000,
      evolution: { ca: 15, charges: 8, benefice: 28 },
    },
    annee: {
      ca: 140000,
      upsells: 35000,
      totalRevenus: 175000,
      nbVentes: 96,
      panierMoyen: 1458,
      tauxUpsell: 35,
      totalCharges: 98000,
      benefice: 77000,
      evolution: { ca: 18, charges: 10, benefice: 32 },
    },
  };

  const currentData = financialData[period];

  const evolutionData = [
    { mois: "Jan", revenus: 12000, depenses: 7500 },
    { mois: "Fév", revenus: 13500, depenses: 8000 },
    { mois: "Mar", revenus: 14000, depenses: 8200 },
    { mois: "Avr", revenus: 13000, depenses: 7800 },
    { mois: "Mai", revenus: 15000, depenses: 8500 },
    { mois: "Juin", revenus: 16000, depenses: 8700 },
    { mois: "Juil", revenus: 14500, depenses: 8300 },
    { mois: "Aoû", revenus: 13000, depenses: 7900 },
    { mois: "Sep", revenus: 15500, depenses: 8600 },
    { mois: "Oct", revenus: 16500, depenses: 8800 },
    { mois: "Nov", revenus: 17000, depenses: 9000 },
    { mois: "Déc", revenus: 15000, depenses: 8500 },
  ];

  const depensesRepartition = [
    { name: "Personnel", value: financialData.mois.depenses.personnel.total, color: ACCENT_COLORS.personnel },
    { name: "Abonnements", value: financialData.mois.depenses.abonnements.total, color: ACCENT_COLORS.abonnements },
    { name: "Prestataires", value: financialData.mois.depenses.prestataires.total, color: ACCENT_COLORS.prestataires },
    { name: "Achats", value: financialData.mois.depenses.achats.total, color: ACCENT_COLORS.achats },
    { name: "Autres", value: financialData.mois.depenses.autres.total, color: ACCENT_COLORS.autres },
  ];

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const marge = ((currentData.benefice / currentData.totalRevenus) * 100).toFixed(1);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white space-y-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center">Tableau de Bord Financier 📈</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard 
          title="Total Revenus (CA + Upsells)" 
          value={currentData.totalRevenus} 
          icon={Euro} 
          colorClass="text-blue-500"
          evolution={currentData.evolution.ca} 
        />
        
        <KPICard 
          title="Charges Totales" 
          value={currentData.totalCharges} 
          icon={CreditCard} 
          colorClass="text-red-500"
          evolution={currentData.evolution.charges}
        />
        
        <KPICard 
          title={`Bénéfice Net (Marge: ${marge}%)`}
          value={currentData.benefice} 
          icon={PiggyBank} 
          colorClass="text-green-500"
          evolution={currentData.evolution.benefice}
          valuePrefix=""
        />
      </div>

      <Tabs value={period} onValueChange={(v) => setPeriod(v as any)} className="w-full pt-4">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-slate-900/50 rounded-xl border border-white/10 p-1">
          <TabsTrigger 
            value="mois" 
            className="data-[state=active]:bg-purple-500/30 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-colors text-white/60 font-medium"
          >
            Mois
          </TabsTrigger>
          <TabsTrigger 
            value="semestre" 
            className="data-[state=active]:bg-purple-500/30 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-colors text-white/60 font-medium"
          >
            Semestre
          </TabsTrigger>
          <TabsTrigger 
            value="annee" 
            className="data-[state=active]:bg-purple-500/30 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-colors text-white/60 font-medium"
          >
            Année
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
            <Euro className="w-5 h-5 text-blue-500" />
            REVENUS
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">Chiffre d'Affaires</span>
                <span className="text-lg font-bold text-blue-500">{currentData.ca.toLocaleString()} €</span>
              </div>
              <div className="ml-4 space-y-1 text-xs text-white/60">
                <div className="flex justify-between">
                  <span>└─ Nombre de ventes :</span>
                  <span className="font-medium">{currentData.nbVentes}</span>
                </div>
                <div className="flex justify-between">
                  <span>└─ Panier moyen :</span>
                  <span className="font-medium">{currentData.panierMoyen.toLocaleString()} €</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">Upsells</span>
                <span className="text-lg font-bold text-blue-500">{currentData.upsells.toLocaleString()} €</span>
              </div>
              <div className="ml-4 space-y-1 text-xs text-white/60">
                <div className="flex justify-between">
                  <span>└─ Taux d'upsell :</span>
                  <span className="font-medium">{currentData.tauxUpsell}%</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">TOTAL REVENUS</span>
                <span className="text-2xl font-bold text-green-500">{currentData.totalRevenus.toLocaleString()} €</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
            <CreditCard className="w-5 h-5 text-red-500" />
            DÉPENSES
          </h2>

          {period === "mois" && (
            <div className="space-y-3">
              {Object.entries(financialData.mois.depenses).map(([key, data]) => (
                <div key={key} className="border border-white/10 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleCategory(key)}
                    className="w-full p-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories[key] ? <ChevronUp className="w-4 h-4 text-white/60" /> : <ChevronDown className="w-4 h-4 text-white/60" />}
                      <span className="font-medium capitalize text-white">{key}</span>
                    </div>
                    <span className="font-bold text-white/80">{data.total.toLocaleString()} €</span>
                  </button>
                  
                  {expandedCategories[key] && (
                    <div className="px-4 pb-4 space-y-2 bg-white/5">
                      {data.details.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm pl-6">
                          <span className="text-white/60">• {item.label}</span>
                          <span className="font-medium text-white/80">{item.value.toLocaleString()} €</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">TOTAL DÉPENSES</span>
                  <span className="text-2xl font-bold text-red-500">{currentData.totalCharges.toLocaleString()} €</span>
                </div>
              </div>
            </div>
          )}

          {period !== "mois" && (
            <div className="text-center py-8 text-white/60">
              <p>Vue détaillée disponible pour la période mensuelle</p>
              <p className="text-2xl font-bold mt-4 text-red-500">{currentData.totalCharges.toLocaleString()} €</p>
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Évolution Revenus vs Dépenses (12 mois)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={evolutionData}>
              <defs>
                <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDepenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" /> 
              <XAxis dataKey="mois" stroke="#ffffff40" tick={{ fill: "#ffffff66" }} /> 
              <YAxis stroke="#ffffff40" tick={{ fill: "#ffffff66" }} /> 
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(15, 23, 42, 0.9)", 
                  border: "1px solid #ffffff1a", 
                  borderRadius: "8px"
                }}
                labelStyle={{ color: 'white' }}
                formatter={(value: number) => `${value.toLocaleString()} €`}
              />
              <Legend wrapperStyle={{ color: 'white' }} />
              <Area 
                type="monotone" 
                dataKey="revenus" 
                stroke="#10b981" 
                fill="url(#colorRevenus)"
                strokeWidth={2}
                name="Revenus"
              />
              <Area 
                type="monotone" 
                dataKey="depenses" 
                stroke="#ef4444" 
                fill="url(#colorDepenses)"
                strokeWidth={2}
                name="Dépenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Répartition des Dépenses (Mois)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={depensesRepartition}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
              >
                {depensesRepartition.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="#0f172a"
                    strokeWidth={3} 
                  /> 
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(15, 23, 42, 0.9)", 
                  border: "1px solid #ffffff1a", 
                  borderRadius: "8px"
                }}
                formatter={(value: any) => `${value.toLocaleString()} €`}
                labelStyle={{ color: 'white' }}
              />
              <Legend wrapperStyle={{ color: 'white' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Vue Comparative Multi-Périodes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 font-semibold text-white/80"></th>
                <th className="text-right p-4 font-semibold text-white/80">Mois</th>
                <th className="text-right p-4 font-semibold text-white/80">Semestre</th>
                <th className="text-right p-4 font-semibold text-white/80">Année</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10 hover:bg-white/5">
                <td className="p-4 font-medium text-white">Revenus</td>
                <td className="p-4 text-right font-mono text-blue-500">{financialData.mois.totalRevenus.toLocaleString()} €</td>
                <td className="p-4 text-right font-mono text-blue-500">{financialData.semestre.totalRevenus.toLocaleString()} €</td>
                <td className="p-4 text-right font-mono text-blue-500">{financialData.annee.totalRevenus.toLocaleString()} €</td>
              </tr>
              <tr className="border-b border-white/10 hover:bg-white/5">
                <td className="p-4 font-medium text-white">Dépenses</td>
                <td className="p-4 text-right font-mono text-red-500">{financialData.mois.totalCharges.toLocaleString()} €</td>
                <td className="p-4 text-right font-mono text-red-500">{financialData.semestre.totalCharges.toLocaleString()} €</td>
                <td className="p-4 text-right font-mono text-red-500">{financialData.annee.totalCharges.toLocaleString()} €</td>
              </tr>
              <tr className="border-b border-white/10 hover:bg-white/5">
                <td className="p-4 font-medium text-white">Bénéfice</td>
                <td className="p-4 text-right font-mono text-green-500">{financialData.mois.benefice.toLocaleString()} €</td>
                <td className="p-4 text-right font-mono text-green-500">{financialData.semestre.benefice.toLocaleString()} €</td>
                <td className="p-4 text-right font-mono text-green-500">{financialData.annee.benefice.toLocaleString()} €</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="p-4 font-medium text-white">Marge (%)</td>
                <td className="p-4 text-right font-mono text-white/80">43.3%</td>
                <td className="p-4 text-right font-mono text-white/80">43.5%</td>
                <td className="p-4 text-right font-mono text-white/80">44.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}