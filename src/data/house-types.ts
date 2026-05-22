// ============================================================
//  DATA STATIS — Cluster & Tipe Hunian H City Sawangan
//  TODO: Nanti replace dengan fetch ke CMS/ERP
// ============================================================

export interface TypeVariant {
  buildingArea: number; // LB m²
  landArea: number;     // LT m²
}

export interface HouseType {
  id: number;
  cluster: string;
  types: TypeVariant[];
  basePrice: number;
  badge: "ready" | "indent" | "hot";
  badgeLabel: string;
}

export const HOUSE_TYPES: HouseType[] = [
  {
    id: 1,
    cluster: "Cluster Akasia",
    types: [
      { buildingArea: 45, landArea: 81  },
      { buildingArea: 51, landArea: 105 },
      { buildingArea: 72, landArea: 120 },
    ],
    basePrice: 900_000_000,
    badge: "ready",
    badgeLabel: "Available",
  },
  {
    id: 2,
    cluster: "Cluster Borneo",
    types: [
      { buildingArea: 51, landArea: 105 },
      { buildingArea: 72, landArea: 120 },
      { buildingArea: 45, landArea: 81  },
    ],
    basePrice: 1_100_000_000,
    badge: "indent",
    badgeLabel: "Progres",
  },
  {
    id: 3,
    cluster: "Cluster Cemara",
    types: [
      { buildingArea: 45, landArea: 81 },
      { buildingArea: 60, landArea: 60 },
      { buildingArea: 38, landArea: 60 },
    ],
    basePrice: 800_000_000,
    badge: "ready",
    badgeLabel: "Available",
  },
  {
    id: 4,
    cluster: "Cluster Damar",
    types: [
      { buildingArea: 100, landArea: 120 },
      { buildingArea: 72,  landArea: 120 },
      { buildingArea: 90,  landArea: 90  },
      { buildingArea: 51,  landArea: 105 },
    ],
    basePrice: 1_400_000_000,
    badge: "hot",
    badgeLabel: "Launching!",
  },
  {
    id: 5,
    cluster: "Cluster Eucalyptus",
    types: [
      { buildingArea: 45, landArea: 81  },
      { buildingArea: 51, landArea: 105 },
      { buildingArea: 72, landArea: 120 },
    ],
    basePrice: 950_000_000,
    badge: "hot",
    badgeLabel: "Premium",
  },
  {
    id: 6,
    cluster: "Cluster Gaharu",
    types: [
      { buildingArea: 100, landArea: 120 },
      { buildingArea: 72,  landArea: 120 },
    ],
    basePrice: 1_600_000_000,
    badge: "indent",
    badgeLabel: "Progres",
  },
];
