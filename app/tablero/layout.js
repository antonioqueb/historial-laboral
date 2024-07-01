import React from 'react';
import DasboardSidebar from '@/components/component/dasboard-sidebar';   // Asegúrate de que la ruta sea correcta
import DashboardNabvar from '@/components/component/dashboard-nabvar';
import { authOptions } from '../api/(auth)/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

const LayoutDashboard = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <div className="flex min-h-screen">
        <DasboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardNabvar className="sticky top-0 w-full z-50" />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen">
      <DasboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNabvar className="sticky top-0 w-full z-50" />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default LayoutDashboard;
