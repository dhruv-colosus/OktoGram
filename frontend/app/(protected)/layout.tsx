// app/(protected)/layout.js
import { useRouter } from "next/navigation";
import SideBar from "../Components/SideBar";
import TopBar from "../Components/TopBar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <TopBar />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
