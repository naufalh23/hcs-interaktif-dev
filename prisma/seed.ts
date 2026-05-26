import { PrismaClient, Badge, PriceDisplayMode } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ============================================================
//  Reference data — mirrors src/data static files
// ============================================================

const HOUSE_TYPE_SEED = [
  {
    id: 1,
    cluster: "Cluster Akasia",
    basePrice: 900_000_000n,
    badge: Badge.ready,
    badgeLabel: "Available",
    variants: [
      { buildingArea: 45, landArea: 81, sortOrder: 0 },
      { buildingArea: 51, landArea: 105, sortOrder: 1 },
      { buildingArea: 72, landArea: 120, sortOrder: 2 },
    ],
  },
  {
    id: 2,
    cluster: "Cluster Borneo",
    basePrice: 1_100_000_000n,
    badge: Badge.on_progress,
    badgeLabel: "Progres",
    variants: [
      { buildingArea: 51, landArea: 105, sortOrder: 0 },
      { buildingArea: 72, landArea: 120, sortOrder: 1 },
      { buildingArea: 45, landArea: 81, sortOrder: 2 },
    ],
  },
  {
    id: 3,
    cluster: "Cluster Cemara",
    basePrice: 800_000_000n,
    badge: Badge.ready,
    badgeLabel: "Available",
    variants: [
      { buildingArea: 45, landArea: 81, sortOrder: 0 },
      { buildingArea: 60, landArea: 60, sortOrder: 1 },
      { buildingArea: 38, landArea: 60, sortOrder: 2 },
    ],
  },
  {
    id: 4,
    cluster: "Cluster Damar",
    basePrice: 1_400_000_000n,
    badge: Badge.ready,
    badgeLabel: "Launching!",
    variants: [
      { buildingArea: 100, landArea: 120, sortOrder: 0 },
      { buildingArea: 72, landArea: 120, sortOrder: 1 },
      { buildingArea: 90, landArea: 90, sortOrder: 2 },
      { buildingArea: 51, landArea: 105, sortOrder: 3 },
    ],
  },
  {
    id: 5,
    cluster: "Cluster Eucalyptus",
    basePrice: 950_000_000n,
    badge: Badge.ready,
    badgeLabel: "Premium",
    variants: [
      { buildingArea: 45, landArea: 81, sortOrder: 0 },
      { buildingArea: 51, landArea: 105, sortOrder: 1 },
      { buildingArea: 72, landArea: 120, sortOrder: 2 },
    ],
  },
  {
    id: 6,
    cluster: "Cluster Gaharu",
    basePrice: 1_600_000_000n,
    badge: Badge.on_progress,
    badgeLabel: "Progres",
    variants: [
      { buildingArea: 100, landArea: 120, sortOrder: 0 },
      { buildingArea: 72, landArea: 120, sortOrder: 1 },
    ],
  },
];

const AGENT_SEED = [
  {
    id: 1,
    name: "Andi Pratama",
    code: "AP01",
    isActive: true,
    isWalkin: false,
  },
  { id: 2, name: "Siti Rahma", code: "SR02", isActive: true, isWalkin: false },
  {
    id: 3,
    name: "Budi Santoso",
    code: "BS03",
    isActive: true,
    isWalkin: false,
  },
  {
    id: 4,
    name: "Dewi Anggraini",
    code: "DA04",
    isActive: true,
    isWalkin: false,
  },
  {
    id: 5,
    name: "Reza Firmansyah",
    code: "RF05",
    isActive: true,
    isWalkin: false,
  },
  {
    id: 6,
    name: "Nurul Hidayah",
    code: "NH06",
    isActive: true,
    isWalkin: false,
  },
  {
    id: 7,
    name: "Walk-in (Tanpa Agent)",
    code: "WALK",
    isActive: true,
    isWalkin: true,
  },
];

const ADDON_SEED = [
  {
    id: 1,
    optionKey: "pre_ac",
    name: "Pre-Installation AC",
    description:
      "Instalasi Sudah Disiapkan Rapi, Unit AC Tinggal Dipasang Tanpa Repot.",
    price: 0n,
    priceDisplayMode: PriceDisplayMode.free,
    sortOrder: 0,
  },
  {
    id: 2,
    optionKey: "cat",
    name: "Cat Interior (Warna Custom)",
    description:
      "Warna Bisa Disesuaikan Dengan Selera, Tetap Menggunakan Cat Berkualitas Standar HCS.",
    price: 0n,
    priceDisplayMode: PriceDisplayMode.free,
    sortOrder: 1,
  },
  {
    id: 3,
    optionKey: "smartlock",
    name: "Smart Door Lock",
    description:
      "Akses Lebih Aman Dan Praktis Dengan Sistem Kunci Digital Modern.",
    price: 0n,
    priceDisplayMode: PriceDisplayMode.free,
    sortOrder: 2,
  },
  {
    id: 4,
    optionKey: "ac1pk",
    name: "AC 1 PK + Instalasi",
    description:
      "Nikmati Kenyamanan Maksimal Dengan AC Lengkap Beserta Pemasangan.",
    price: 6_000_000n,
    priceDisplayMode: PriceDisplayMode.fixed,
    sortOrder: 3,
  },
  {
    id: 5,
    optionKey: "ac05pk",
    name: "AC 1/2 PK + Instalasi",
    description: "Solusi Hemat Dan Praktis Dengan AC Lengkap Siap Pakai.",
    price: 5_000_000n,
    priceDisplayMode: PriceDisplayMode.fixed,
    sortOrder: 4,
  },
  {
    id: 6,
    optionKey: "solar",
    name: "Panel Surya",
    description:
      "Hemat Energi Dengan Solusi Panel Surya Sesuai Kebutuhan Anda.",
    price: 0n,
    priceDisplayMode: PriceDisplayMode.contact_sales,
    sortOrder: 5,
    contactLabel: "Hubungi Sales",
  },
];

// UnitStatusOption defaults — admin dapat mengubah/menambah sesuai kebutuhan
const UNIT_STATUS_SEED = [
  {
    label: "available",
    color: "#22c55e",
    isDefault: true,
    isActive: true,
    sortOrder: 0,
  },
  {
    label: "indent",
    color: "#f59e0b",
    isDefault: false,
    isActive: true,
    sortOrder: 1,
  },
  {
    label: "sold",
    color: "#ef4444",
    isDefault: false,
    isActive: true,
    sortOrder: 2,
  },
];

// PaymentOption defaults — admin dapat mengubah/menambah sesuai kebutuhan
const PAYMENT_OPTION_SEED = [
  {
    label: "KPR Bank",
    description: "Free biaya KPR*",
    isActive: true,
    sortOrder: 0,
  },
  {
    label: "Cash Keras",
    description: "Diskon spesial",
    isActive: true,
    sortOrder: 1,
  },
  {
    label: "Cash Bertahap",
    description: "Cicilan 12–24 bln",
    isActive: true,
    sortOrder: 2,
  },
];

// typeKey: "LB/LT" string, maps to a HouseTypeVariant row
const UNIT_SEED = [
  // Cluster Akasia (houseTypeId: 1)
  {
    id: 1,
    houseTypeId: 1,
    typeKey: "45/81",
    code: "AK-01",
    status: "available",
    price: 900_000_000n,
    floors: 1,
    bedrooms: 2,
    bathrooms: 1,
    images: ["/Akasia.png", "/Borneo.png"],
  },
  {
    id: 2,
    houseTypeId: 1,
    typeKey: "45/81",
    code: "AK-02",
    status: "available",
    price: 920_000_000n,
    floors: 1,
    bedrooms: 2,
    bathrooms: 1,
    images: ["/Akasia.png", "/Borneo.png"],
  },
  {
    id: 3,
    houseTypeId: 1,
    typeKey: "72/120",
    code: "AK-03",
    status: "sold",
    price: 1_010_000_000n,
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    images: ["/Akasia.png", "/Borneo.png"],
  },
  {
    id: 4,
    houseTypeId: 1,
    typeKey: "51/105",
    code: "AK-04",
    status: "indent",
    price: 1_000_000_000n,
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    images: ["/Akasia.png", "/Borneo.png"],
  },
  {
    id: 5,
    houseTypeId: 1,
    typeKey: "72/120",
    code: "AK-05",
    status: "available",
    price: 1_050_000_000n,
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    images: ["/Akasia.png", "/Borneo.png"],
    notes: "Hook dekat taman",
  },
  {
    id: 6,
    houseTypeId: 1,
    typeKey: "51/105",
    code: "AK-06",
    status: "available",
    price: 1_000_000_000n,
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    images: ["/Akasia.png", "/Borneo.png"],
  },
  // Cluster Borneo (houseTypeId: 2)
  {
    id: 7,
    houseTypeId: 2,
    typeKey: "51/105",
    code: "BR-01",
    status: "indent",
    price: 1_100_000_000n,
    floors: 2,
    bedrooms: 3,
    bathrooms: 2,
    images: ["/Borneo.png", "/Cemara.png"],
  },
  {
    id: 8,
    houseTypeId: 2,
    typeKey: "51/105",
    code: "BR-02",
    status: "available",
    price: 1_120_000_000n,
    floors: 2,
    bedrooms: 3,
    bathrooms: 2,
    images: ["/Borneo.png", "/Cemara.png"],
  },
  {
    id: 9,
    houseTypeId: 2,
    typeKey: "72/120",
    code: "BR-03",
    status: "available",
    price: 1_110_000_000n,
    floors: 2,
    bedrooms: 4,
    bathrooms: 3,
    images: ["/Borneo.png", "/Cemara.png"],
  },
  {
    id: 10,
    houseTypeId: 2,
    typeKey: "72/120",
    code: "BR-04",
    status: "available",
    price: 1_100_000_000n,
    floors: 2,
    bedrooms: 4,
    bathrooms: 3,
    images: ["/Borneo.png", "/Cemara.png"],
    notes: "Hook",
  },
  // Cluster Cemara (houseTypeId: 3)
  {
    id: 11,
    houseTypeId: 3,
    typeKey: "38/60",
    code: "CM-01",
    status: "available",
    price: 800_000_000n,
    floors: 1,
    bedrooms: 2,
    bathrooms: 1,
    images: ["/Cemara.png", "/Damar.png"],
  },
  {
    id: 12,
    houseTypeId: 3,
    typeKey: "45/81",
    code: "CM-02",
    status: "available",
    price: 820_000_000n,
    floors: 1,
    bedrooms: 2,
    bathrooms: 1,
    images: ["/Cemara.png", "/Damar.png"],
  },
  {
    id: 13,
    houseTypeId: 3,
    typeKey: "60/60",
    code: "CM-03",
    status: "indent",
    price: 840_000_000n,
    floors: 1,
    bedrooms: 2,
    bathrooms: 1,
    images: ["/Cemara.png", "/Damar.png"],
  },
  {
    id: 14,
    houseTypeId: 3,
    typeKey: "38/60",
    code: "CM-04",
    status: "available",
    price: 800_000_000n,
    floors: 1,
    bedrooms: 2,
    bathrooms: 1,
    images: ["/Cemara.png", "/Damar.png"],
  },
  {
    id: 15,
    houseTypeId: 3,
    typeKey: "45/81",
    code: "CM-05",
    status: "available",
    price: 810_000_000n,
    floors: 1,
    bedrooms: 2,
    bathrooms: 1,
    images: ["/Cemara.png", "/Damar.png"],
  },
  // Cluster Damar (houseTypeId: 4)
  {
    id: 16,
    houseTypeId: 4,
    typeKey: "72/120",
    code: "DM-01",
    status: "available",
    price: 1_400_000_000n,
    floors: 2,
    bedrooms: 4,
    bathrooms: 3,
    images: ["/Damar.png", "/Eucalyptus.png"],
  },
  {
    id: 17,
    houseTypeId: 4,
    typeKey: "90/90",
    code: "DM-02",
    status: "available",
    price: 1_420_000_000n,
    floors: 2,
    bedrooms: 4,
    bathrooms: 3,
    images: ["/Damar.png", "/Eucalyptus.png"],
  },
  {
    id: 18,
    houseTypeId: 4,
    typeKey: "72/120",
    code: "DM-03",
    status: "sold",
    price: 1_400_000_000n,
    floors: 2,
    bedrooms: 4,
    bathrooms: 3,
    images: ["/Damar.png", "/Eucalyptus.png"],
  },
  {
    id: 19,
    houseTypeId: 4,
    typeKey: "90/90",
    code: "DM-04",
    status: "available",
    price: 1_430_000_000n,
    floors: 2,
    bedrooms: 4,
    bathrooms: 3,
    images: ["/Damar.png", "/Eucalyptus.png"],
    notes: "Hook",
  },
  {
    id: 20,
    houseTypeId: 4,
    typeKey: "100/120",
    code: "DM-05",
    status: "indent",
    price: 1_450_000_000n,
    floors: 2,
    bedrooms: 5,
    bathrooms: 4,
    images: ["/Damar.png", "/Eucalyptus.png"],
  },
  {
    id: 21,
    houseTypeId: 4,
    typeKey: "100/120",
    code: "DM-06",
    status: "available",
    price: 1_400_000_000n,
    floors: 2,
    bedrooms: 5,
    bathrooms: 4,
    images: ["/Damar.png", "/Eucalyptus.png"],
  },
  {
    id: 22,
    houseTypeId: 4,
    typeKey: "100/120",
    code: "DM-07",
    status: "available",
    price: 1_410_000_000n,
    floors: 2,
    bedrooms: 5,
    bathrooms: 4,
    images: ["/Damar.png", "/Eucalyptus.png"],
    notes: "Corner",
  },
  // Cluster Eucalyptus (houseTypeId: 5)
  {
    id: 23,
    houseTypeId: 5,
    typeKey: "45/81",
    code: "EU-01",
    status: "available",
    price: 950_000_000n,
    floors: 1,
    bedrooms: 2,
    bathrooms: 1,
    images: ["/Eucalyptus.png", "/Gaharu.png"],
  },
  {
    id: 24,
    houseTypeId: 5,
    typeKey: "51/105",
    code: "EU-02",
    status: "indent",
    price: 980_000_000n,
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    images: ["/Eucalyptus.png", "/Gaharu.png"],
  },
  {
    id: 25,
    houseTypeId: 5,
    typeKey: "72/120",
    code: "EU-03",
    status: "available",
    price: 1_050_000_000n,
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    images: ["/Eucalyptus.png", "/Gaharu.png"],
  },
  {
    id: 26,
    houseTypeId: 5,
    typeKey: "51/105",
    code: "EU-04",
    status: "available",
    price: 950_000_000n,
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    images: ["/Eucalyptus.png", "/Gaharu.png"],
  },
  // Cluster Gaharu (houseTypeId: 6)
  {
    id: 27,
    houseTypeId: 6,
    typeKey: "100/120",
    code: "GH-01",
    status: "available",
    price: 1_600_000_000n,
    floors: 2,
    bedrooms: 4,
    bathrooms: 3,
    images: ["/Gaharu.png", "/Akasia.png"],
  },
  {
    id: 28,
    houseTypeId: 6,
    typeKey: "100/120",
    code: "GH-02",
    status: "indent",
    price: 1_650_000_000n,
    floors: 2,
    bedrooms: 4,
    bathrooms: 3,
    images: ["/Gaharu.png", "/Akasia.png"],
  },
  {
    id: 29,
    houseTypeId: 6,
    typeKey: "72/120",
    code: "GH-03",
    status: "available",
    price: 1_600_000_000n,
    floors: 2,
    bedrooms: 4,
    bathrooms: 3,
    images: ["/Gaharu.png", "/Akasia.png"],
    notes: "Hook",
  },
];

// ── Helpers ────────────────────────────────────────────────────

async function resetSequence(table: string, column: string) {
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"${table}"', '${column}'), (SELECT MAX(${column}) FROM "${table}"))`,
  );
}

// ── Main ───────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Seeding database…");

  // Admin user
  const hash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hash,
      name: "Admin",
      role: "ADMIN",
    },
  });
  console.log("✓ User seeded");

  // ── UnitStatusOptions ────────────────────────────────────────
  for (const s of UNIT_STATUS_SEED) {
    await prisma.unitStatusOption.upsert({
      where: { label: s.label },
      update: {
        color: s.color,
        isDefault: s.isDefault,
        isActive: s.isActive,
        sortOrder: s.sortOrder,
      },
      create: s,
    });
  }
  console.log(`✓ ${UNIT_STATUS_SEED.length} UnitStatusOptions seeded`);

  // ── PaymentOptions ───────────────────────────────────────────
  for (const p of PAYMENT_OPTION_SEED) {
    await prisma.paymentOption.upsert({
      where: { label: p.label },
      update: {
        description: p.description,
        isActive: p.isActive,
        sortOrder: p.sortOrder,
      },
      create: p,
    });
  }
  console.log(`✓ ${PAYMENT_OPTION_SEED.length} PaymentOptions seeded`);

  // ── HouseTypes & HouseTypeVariants ──────────────────────────
  // Map: "houseTypeId-LB/LT" → variant DB id (for unit seeding)
  const variantIdMap = new Map<string, number>();

  for (const ht of HOUSE_TYPE_SEED) {
    const { variants, ...htData } = ht;
    await prisma.houseType.upsert({
      where: { id: htData.id },
      update: {
        cluster: htData.cluster,
        basePrice: htData.basePrice,
        badge: htData.badge,
        badgeLabel: htData.badgeLabel,
      },
      create: {
        id: htData.id,
        cluster: htData.cluster,
        basePrice: htData.basePrice,
        badge: htData.badge,
        badgeLabel: htData.badgeLabel,
      },
    });
    for (const v of variants) {
      const variant = await prisma.houseTypeVariant.upsert({
        where: {
          houseTypeId_buildingArea_landArea: {
            houseTypeId: ht.id,
            buildingArea: v.buildingArea,
            landArea: v.landArea,
          },
        },
        update: { sortOrder: v.sortOrder },
        create: {
          houseTypeId: ht.id,
          buildingArea: v.buildingArea,
          landArea: v.landArea,
          sortOrder: v.sortOrder,
        },
      });
      variantIdMap.set(`${ht.id}-${v.buildingArea}/${v.landArea}`, variant.id);
    }
  }
  console.log(`✓ ${HOUSE_TYPE_SEED.length} HouseTypes + variants seeded`);

  // ── Agents ──────────────────────────────────────────────────
  for (const a of AGENT_SEED) {
    await prisma.agent.upsert({
      where: { code: a.code },
      update: { name: a.name, isActive: a.isActive, isWalkin: a.isWalkin },
      create: {
        id: a.id,
        name: a.name,
        code: a.code,
        isActive: a.isActive,
        isWalkin: a.isWalkin,
      },
    });
  }
  console.log(`✓ ${AGENT_SEED.length} Agents seeded`);

  // ── AddonOptions ─────────────────────────────────────────────
  for (const ao of ADDON_SEED) {
    const { id, optionKey, ...rest } = ao;
    await prisma.addonOption.upsert({
      where: { optionKey },
      update: rest,
      create: { id, optionKey, ...rest },
    });
  }
  console.log(`✓ ${ADDON_SEED.length} AddonOptions seeded`);

  // ── Units & UnitImages ───────────────────────────────────────
  for (const u of UNIT_SEED) {
    const variantId = variantIdMap.get(`${u.houseTypeId}-${u.typeKey}`) ?? null;
    const unitData = {
      houseTypeId: u.houseTypeId,
      houseTypeVariantId: variantId,
      code: u.code,
      status: u.status,
      price: u.price,
      floors: u.floors,
      bedrooms: u.bedrooms,
      bathrooms: u.bathrooms,
      notes: u.notes ?? null,
    };
    await prisma.unit.upsert({
      where: { code: u.code },
      update: unitData,
      create: { id: u.id, ...unitData },
    });
    await prisma.unitImage.deleteMany({ where: { unitId: u.id } });
    await prisma.unitImage.createMany({
      data: u.images.map((url, idx) => ({ unitId: u.id, url, sortOrder: idx })),
    });
  }
  console.log(`✓ ${UNIT_SEED.length} Units + images seeded`);

  // ── Reset sequences ─────────────────────────────────────────
  await resetSequence("house_types", "id");
  await resetSequence("house_type_variants", "id");
  await resetSequence("agents", "id");
  await resetSequence("addon_options", "id");
  await resetSequence("units", "id");
  console.log("✓ Sequences reset");

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
