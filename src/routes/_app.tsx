import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/bottom-nav";
import { SceneBackground } from "@/components/scene-background";
import { LogoSlot } from "@/components/logo-slot";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <SceneBackground>
      <div className="mx-auto max-w-md sm:max-w-2xl px-4 pb-28">
        <LogoSlot />
        <Outlet />
      </div>
      <BottomNav />
    </SceneBackground>
  );
}