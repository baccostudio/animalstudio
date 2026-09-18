export type Plan = {
  name: string;
  /** Text sent to the lead modal title ("Plan …") */
  leadLabel: string;
  badge?: string;
  description: string;
  features: string[];
  highlight?: boolean;
};

export const PLANS: Plan[] = [
  {
    name: "Mes a mes",
    leadLabel: "Mes a mes",
    description:
      "Máxima flexibilidad. Ideal para empezar y sentir el método Animal sin ataduras.",
    features: [
      "Acceso completo a Animal OS",
      "Evaluación y entrevista de bienvenida",
      "Sin permanencia mínima",
    ],
  },
  {
    name: "Débito automático",
    leadLabel: "Débito automático · 6 meses",
    badge: "6 meses",
    description:
      "El plan pensado para sostener el proceso — permanencia mínima de seis meses.",
    features: [
      "Todo lo del plan mensual",
      "Seguimiento de progreso continuo",
      "Prioridad en reservas de clase",
    ],
    highlight: true,
  },
  {
    name: "Anual",
    leadLabel: "Anual",
    description:
      "Para quienes ya decidieron que esto es una inversión de largo plazo.",
    features: [
      "Todo lo del plan de 6 meses",
      "Precio cerrado por todo el período",
      "Beneficios de comunidad y eventos",
    ],
  },
];
