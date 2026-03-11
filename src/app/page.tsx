// Server Component — tidak ada fetch, langsung pakai data statis
import KioskShell from "@/components/kiosk/KioskShell";
import { HOUSE_TYPES } from "@/data/house-types";

export default function Home() {
  // Kirim data ke client via props
  // Nanti tinggal ganti baris ini dengan: const types = await fetchFromCMS()
  return <KioskShell houseTypes={HOUSE_TYPES} />;
}
