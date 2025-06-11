import Navbar from '../components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto">{children}</main>
    </>
  );
}
