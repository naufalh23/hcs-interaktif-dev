"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/kiosk-store";
import AttractScreen from "@/components/screens/AttractScreen";
import TypeScreen from "@/components/screens/TypeScreen";
import CustomScreen from "@/components/screens/CustomScreen";
import UnitScreen from "@/components/screens/UnitScreen";
import FormScreen from "@/components/screens/FormScreen";
import SuccessScreen from "@/components/screens/SuccessScreen";
import IdleOverlay from "@/components/kiosk/IdleOverlay";
import type { HouseType } from "@/data/house-types";

const IDLE_MS = 90_000; // 90 detik

export default function KioskShell({
  houseTypes,
}: {
  houseTypes: HouseType[];
}) {
  const screen = useStore((s) => s.screen);
  const reset = useStore((s) => s.reset);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset idle timer pada setiap interaksi
  const resetIdle = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (screen === "attract" || screen === "success") return;

    timerRef.current = setTimeout(reset, IDLE_MS);
  };

  useEffect(() => {
    window.addEventListener("click", resetIdle);
    window.addEventListener("touchstart", resetIdle);
    window.addEventListener("keydown", resetIdle);
    return () => {
      window.removeEventListener("click", resetIdle);
      window.removeEventListener("touchstart", resetIdle);
      window.removeEventListener("keydown", resetIdle);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }); // re-attach setiap render (agar screen state terbaru)

  return (
    <div className="relative w-full h-full overflow-hidden bg-ink">
      {screen === "attract" && <AttractScreen />}
      {screen === "type" && <TypeScreen houseTypes={houseTypes} />}
      {screen === "custom" && <CustomScreen />}
      {screen === "unit" && <UnitScreen />}
      {screen === "form" && <FormScreen />}
      {screen === "success" && <SuccessScreen />}
      <IdleOverlay idleMs={IDLE_MS} />
    </div>
  );
}
