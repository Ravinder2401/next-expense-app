import Navbar from '../components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="px-4 sm:px-8 lg:px-12 xl:px-16 py-6 max-w-screen-xl mx-auto">
        {children}
      </main>

    </>
  );
}
