import { NextResponse }  from "next/server";
import { prisma }         from "@/lib/prisma";
import { PaymentMethod }  from "@prisma/client";

const PAYMENT_MAP: Record<string, PaymentMethod> = {
  "KPR Bank":      PaymentMethod.KPR_Bank,
  "Cash Keras":    PaymentMethod.Cash_Keras,
  "Cash Bertahap": PaymentMethod.Cash_Bertahap,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      phone,
      email,
      agentCode,
      domicile,
      paymentMethod: paymentRaw,
      unitId,
      unitCode,
      houseTypeName,
      clusterName,
      basePrice,
      totalPrice,
      customization,
    } = body;

    // Map payment method string → Prisma enum
    const paymentMethod = PAYMENT_MAP[paymentRaw as string];
    if (!paymentMethod) {
      return NextResponse.json({ error: "Metode pembayaran tidak valid" }, { status: 400 });
    }

    // Resolve agent — walk-in or empty code → null
    let agentId: number | undefined;
    if (agentCode && agentCode !== "WALK" && agentCode !== "") {
      const agent = await prisma.agent.findUnique({ where: { code: agentCode } });
      if (agent) agentId = agent.id;
    }

    // Derive selected addon IDs from customization state
    // JSON keys are strings even if original was Record<number, boolean>
    const selectedAddonIds: number[] = Object.entries(
      (customization?.addons ?? {}) as Record<string, boolean>
    )
      .filter(([, v]) => v)
      .map(([k]) => parseInt(k));

    // Fetch addon records for price snapshots
    const addonRecords =
      selectedAddonIds.length > 0
        ? await prisma.addonOption.findMany({
            where: { id: { in: selectedAddonIds } },
          })
        : [];

    // Generate booking code (count-based, safe for single-kiosk)
    const count = await prisma.lead.count();
    const bookingCode = `HC-${String(count + 1).padStart(4, "0")}`;

    const extraPrice = BigInt(totalPrice) - BigInt(basePrice);

    // Persist lead + addons in one transaction
    const lead = await prisma.$transaction(async (tx) => {
      return tx.lead.create({
        data: {
          bookingCode,
          fullName,
          phone,
          email:    email   || undefined,
          domicile: domicile || undefined,
          agentId,
          unitId:        Number(unitId),
          basePrice:     BigInt(basePrice),
          extraPrice,
          totalPrice:    BigInt(totalPrice),
          paymentMethod,
          formAnswers: {
            fullName,
            phone,
            email,
            agentCode,
            domicile,
            paymentMethod: paymentRaw,
            unitCode,
            houseTypeName,
            clusterName,
          },
          status: "new",
          addons: {
            create: addonRecords.map((ao) => ({
              addonOptionId: ao.id,
              priceSnapshot: ao.price,
            })),
          },
        },
      });
    });

    console.log(`[Booking] ${lead.bookingCode} — ${lead.fullName} — ${unitCode}`);

    return NextResponse.json({ success: true, bookingCode: lead.bookingCode });
  } catch (err) {
    console.error("[Booking] Error:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan data, coba lagi." },
      { status: 500 }
    );
  }
}
