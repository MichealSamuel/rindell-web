import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-surface font-sans antialiased flex">
      <Sidebar />
      <div className="flex-1 md:ml-[280px] w-full flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
