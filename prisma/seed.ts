import {
  PrismaClient,
  Badge,
  UnitStatus,
  PriceDisplayMode,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ── Reference data (mirrors static files in src/data) ──────────

const HOUSE_TYPE_SEED = [
  { id: 1, cluster: "Cluster Akasia",     name: "Tipe 45/81",   buildingArea: 45,  landArea: 81,  floors: 1, bedrooms: 2, bathrooms: 1, basePrice: 900_000_000n,   badge: Badge.ready,  badgeLabel: "Available" },
  { id: 2, cluster: "Cluster Borneo",     name: "Tipe 51/105",  buildingArea: 51,  landArea: 105, floors: 2, bedrooms: 3, bathrooms: 2, basePrice: 1_100_000_000n, badge: Badge.indent, badgeLabel: "Progres"   },
  { id: 3, cluster: "Cluster Cemara",     name: "Tipe 45/81",   buildingArea: 45,  landArea: 81,  floors: 1, bedrooms: 2, bathrooms: 1, basePrice: 800_000_000n,   badge: Badge.ready,  badgeLabel: "Available" },
  { id: 4, cluster: "Cluster Damar",      name: "Tipe 100/120", buildingArea: 100, landArea: 120, floors: 2, bedrooms: 4, bathrooms: 3, basePrice: 1_400_000_000n, badge: Badge.hot,    badgeLabel: "Launching!"},
  { id: 5, cluster: "Cluster Eucalyptus", name: "Tipe 45/81",   buildingArea: 45,  landArea: 81,  floors: 1, bedrooms: 2, bathrooms: 1, basePrice: 950_000_000n,   badge: Badge.hot,    badgeLabel: "Premium"   },
  { id: 6, cluster: "Cluster Gaharu",     name: "Tipe 100/120", buildingArea: 100, landArea: 120, floors: 2, bedrooms: 4, bathrooms: 3, basePrice: 1_600_000_000n, badge: Badge.indent, badgeLabel: "Progres"   },
];

const AGENT_SEED = [
  { id: 1, name: "Andi Pratama",          code: "AP01", isActive: true,  isWalkin: false },
  { id: 2, name: "Siti Rahma",            code: "SR02", isActive: true,  isWalkin: false },
  { id: 3, name: "Budi Santoso",          code: "BS03", isActive: true,  isWalkin: false },
  { id: 4, name: "Dewi Anggraini",        code: "DA04", isActive: true,  isWalkin: false },
  { id: 5, name: "Reza Firmansyah",       code: "RF05", isActive: true,  isWalkin: false },
  { id: 6, name: "Nurul Hidayah",         code: "NH06", isActive: true,  isWalkin: false },
  { id: 7, name: "Walk-in (Tanpa Agent)", code: "WALK", isActive: true,  isWalkin: true  },
];

const ADDON_SEED = [
  { id: 1, optionKey: "pre_ac",    name: "Pre-Installation AC",       description: "Instalasi Sudah Disiapkan Rapi, Unit AC Tinggal Dipasang Tanpa Repot.",                   price: 0n,         priceDisplayMode: PriceDisplayMode.free          },
  { id: 2, optionKey: "cat",       name: "Cat Interior (Warna Custom)",description: "Warna Bisa Disesuaikan Dengan Selera, Tetap Menggunakan Cat Berkualitas Standar HCS.",    price: 0n,         priceDisplayMode: PriceDisplayMode.free          },
  { id: 3, optionKey: "smartlock", name: "Smart Door Lock",            description: "Akses Lebih Aman Dan Praktis Dengan Sistem Kunci Digital Modern.",                        price: 0n,         priceDisplayMode: PriceDisplayMode.free          },
  { id: 4, optionKey: "ac1pk",     name: "AC 1 PK + Instalasi",        description: "Nikmati Kenyamanan Maksimal Dengan AC Lengkap Beserta Pemasangan.",                       price: 6_000_000n, priceDisplayMode: PriceDisplayMode.fixed         },
  { id: 5, optionKey: "ac05pk",    name: "AC 1/2 PK + Instalasi",      description: "Solusi Hemat Dan Praktis Dengan AC Lengkap Siap Pakai.",                                  price: 5_000_000n, priceDisplayMode: PriceDisplayMode.fixed         },
  { id: 6, optionKey: "solar",     name: "Panel Surya",                 description: "Hemat Energi Dengan Solusi Panel Surya Sesuai Kebutuhan Anda.",                           price: 0n,         priceDisplayMode: PriceDisplayMode.contact_sales, contactLabel: "Hubungi Sales" },
];

const UNIT_SEED = [
  // Akasia
  { id:  1, houseTypeId: 1, code: "AK-01", block: "45/81",  status: UnitStatus.available, price: 900_000_000n   },
  { id:  2, houseTypeId: 1, code: "AK-02", block: "45/81",  status: UnitStatus.available, price: 920_000_000n   },
  { id:  3, houseTypeId: 1, code: "AK-03", block: "72/120", status: UnitStatus.sold,      price: 1_010_000_000n },
  { id:  4, houseTypeId: 1, code: "AK-04", block: "51/105", status: UnitStatus.indent,    price: 1_000_000_000n },
  { id:  5, houseTypeId: 1, code: "AK-05", block: "72/120", status: UnitStatus.available, price: 1_050_000_000n, notes: "Hook dekat taman" },
  { id:  6, houseTypeId: 1, code: "AK-06", block: "51/105", status: UnitStatus.available, price: 1_000_000_000n },
  // Borneo
  { id:  7, houseTypeId: 2, code: "BR-01", block: "51/105", status: UnitStatus.indent,    price: 1_100_000_000n },
  { id:  8, houseTypeId: 2, code: "BR-02", block: "51/105", status: UnitStatus.available, price: 1_120_000_000n },
  { id:  9, houseTypeId: 2, code: "BR-03", block: "72/120", status: UnitStatus.available, price: 1_110_000_000n },
  { id: 10, houseTypeId: 2, code: "BR-04", block: "72/120", status: UnitStatus.available, price: 1_100_000_000n, notes: "Hook" },
  // Cemara
  { id: 11, houseTypeId: 3, code: "CM-01", block: "38/60", status: UnitStatus.available, price: 800_000_000n },
  { id: 12, houseTypeId: 3, code: "CM-02", block: "45/81", status: UnitStatus.available, price: 820_000_000n },
  { id: 13, houseTypeId: 3, code: "CM-03", block: "60/60", status: UnitStatus.indent,    price: 840_000_000n },
  { id: 14, houseTypeId: 3, code: "CM-04", block: "38/60", status: UnitStatus.available, price: 800_000_000n },
  { id: 15, houseTypeId: 3, code: "CM-05", block: "45/81", status: UnitStatus.available, price: 810_000_000n },
  // Damar
  { id: 16, houseTypeId: 4, code: "DM-01", block: "72/120",  status: UnitStatus.available, price: 1_400_000_000n },
  { id: 17, houseTypeId: 4, code: "DM-02", block: "90/90",   status: UnitStatus.available, price: 1_420_000_000n },
  { id: 18, houseTypeId: 4, code: "DM-03", block: "72/120",  status: UnitStatus.sold,      price: 1_400_000_000n },
  { id: 19, houseTypeId: 4, code: "DM-04", block: "90/90",   status: UnitStatus.available, price: 1_430_000_000n, notes: "Hook" },
  { id: 20, houseTypeId: 4, code: "DM-05", block: "100/120", status: UnitStatus.indent,    price: 1_450_000_000n },
  { id: 21, houseTypeId: 4, code: "DM-06", block: "100/120", status: UnitStatus.available, price: 1_400_000_000n },
  { id: 22, houseTypeId: 4, code: "DM-07", block: "100/120", status: UnitStatus.available, price: 1_410_000_000n, notes: "Corner" },
  // Eucalyptus
  { id: 23, houseTypeId: 5, code: "EU-01", block: "45/81",  status: UnitStatus.available, price: 950_000_000n   },
  { id: 24, houseTypeId: 5, code: "EU-02", block: "51/105", status: UnitStatus.indent,    price: 980_000_000n   },
  { id: 25, houseTypeId: 5, code: "EU-03", block: "72/120", status: UnitStatus.available, price: 1_050_000_000n },
  { id: 26, houseTypeId: 5, code: "EU-04", block: "51/105", status: UnitStatus.available, price: 950_000_000n   },
  // Gaharu
  { id: 27, houseTypeId: 6, code: "GH-01", block: "100/120", status: UnitStatus.available, price: 1_600_000_000n },
  { id: 28, houseTypeId: 6, code: "GH-02", block: "100/120", status: UnitStatus.indent,    price: 1_650_000_000n },
  { id: 29, houseTypeId: 6, code: "GH-03", block: "72/120",  status: UnitStatus.available, price: 1_600_000_000n, notes: "Hook" },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user (Next-Auth User model)
  const hash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where:  { email: "admin@example.com" },
    update: {},
    create: { email: "admin@example.com", password: hash, name: "Admin", role: "ADMIN" },
  });
  console.log("✓ User seeded");

  // HouseTypes — upsert by id
  for (const ht of HOUSE_TYPE_SEED) {
    await prisma.houseType.upsert({
      where:  { id: ht.id },
      update: ht,
      create: ht,
    });
  }
  console.log(`✓ ${HOUSE_TYPE_SEED.length} HouseTypes seeded`);

  // Agents — upsert by code (unique)
  for (const a of AGENT_SEED) {
    await prisma.agent.upsert({
      where:  { code: a.code },
      update: a,
      create: a,
    });
  }
  console.log(`✓ ${AGENT_SEED.length} Agents seeded`);

  // AddonOptions — upsert by optionKey (unique)
  for (const ao of ADDON_SEED) {
    await prisma.addonOption.upsert({
      where:  { optionKey: ao.optionKey },
      update: ao,
      create: ao,
    });
  }
  console.log(`✓ ${ADDON_SEED.length} AddonOptions seeded`);

  // Units — upsert by code (unique)
  for (const u of UNIT_SEED) {
    await prisma.unit.upsert({
      where:  { code: u.code },
      update: u,
      create: u,
    });
  }
  console.log(`✓ ${UNIT_SEED.length} Units seeded`);

  // Reset sequences so future auto-inserts don't collide
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"house_types"', 'id'), (SELECT MAX(id) FROM "house_types"))`);
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"agents"', 'id'), (SELECT MAX(id) FROM "agents"))`);
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"addon_options"', 'id'), (SELECT MAX(id) FROM "addon_options"))`);
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"units"', 'id'), (SELECT MAX(id) FROM "units"))`);
  console.log("✓ Sequences reset");

  console.log("✅ Seed complete");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
