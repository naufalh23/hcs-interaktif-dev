// ============================================================
//  DATA STATIS — Cluster & Tipe Hunian H City Sawangan
//  TODO: Nanti replace dengan fetch ke CMS/ERP
// ============================================================

export interface TypeVariant {
  buildingArea: number; // LB m²
  landArea: number;     // LT m²
}

export interface HouseType {
  id: string;
  cluster: string;
  types: TypeVariant[];  // min 1, maks 5 varian per cluster
  basePrice: number;
  badge: "ready" | "indent" | "hot";
  badgeLabel: string;
}

export const HOUSE_TYPES: HouseType[] = [
  {
    id: "t60",
    cluster: "Cluster Damar",
    types: [
      { buildingArea: 60,  landArea: 84  },
    ],
    basePrice: 800_000_000,
    badge: "ready",
    badgeLabel: "Available",
  },
  {
    id: "t70",
    cluster: "Cluster Akasia",
    types: [
      { buildingArea: 45,  landArea: 81  },
      { buildingArea: 51,  landArea: 105 },
      { buildingArea: 72,  landArea: 120 },
    ],
    basePrice: 900_000_000,
    badge: "ready",
    badgeLabel: "Available",
  },
  {
    id: "t84",
    cluster: "Cluster Borneo",
    types: [
      { buildingArea: 84,  landArea: 120 },
      { buildingArea: 96,  landArea: 135 },
    ],
    basePrice: 1_400_000_000,
    badge: "indent",
    badgeLabel: "Progres",
  },
  {
    id: "t100",
    cluster: "Cluster Cemara",
    types: [
      { buildingArea: 100, landArea: 120 },
      { buildingArea: 110, landArea: 132 },
      { buildingArea: 120, landArea: 144 },
    ],
    basePrice: 1_600_000_000,
    badge: "ready",
    badgeLabel: "New",
  },
  {
    id: "t120",
    cluster: "Cluster Gaharu",
    types: [
      { buildingArea: 120, landArea: 150 },
      { buildingArea: 135, landArea: 168 },
    ],
    basePrice: 2_000_000_000,
    badge: "indent",
    badgeLabel: "Progres",
  },
  {
    id: "t150",
    cluster: "Cluster Eucalyptus",
    types: [
      { buildingArea: 150, landArea: 180 },
      { buildingArea: 160, landArea: 192 },
      { buildingArea: 175, landArea: 210 },
    ],
    basePrice: 2_800_000_000,
    badge: "hot",
    badgeLabel: "Premium",
  },
];
