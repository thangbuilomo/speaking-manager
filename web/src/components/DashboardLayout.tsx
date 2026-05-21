"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  LogOut, 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Users, 
  BookOpen, 
  Settings,
  Bell
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "am" | "teacher" | "student";
  userName: string;
}

export default function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  const navItems = role === "am" ? [
    { name: "Tổng quan", href: "/am/dashboard", icon: LayoutDashboard },
    { name: "Lịch học", href: "/am/calendar", icon: CalendarIcon },
    { name: "Học viên", href: "/am/students", icon: Users },
    { name: "Giáo viên", href: "/am/teachers", icon: BookOpen },
    { name: "Cài đặt", href: "/am/settings", icon: Settings },
  ] : role === "teacher" ? [
    { name: "Tổng quan", href: "/teacher/dashboard", icon: LayoutDashboard },
    { name: "Lịch dạy của tôi", href: "/teacher/calendar", icon: CalendarIcon },
    { name: "Đăng ký ca rảnh", href: "/teacher/availability", icon: BookOpen },
  ] : [
    { name: "Lịch học của tôi", href: "/student/dashboard", icon: CalendarIcon },
    { name: "Đổi lịch & ca bù", href: "/student/reschedule", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="text-lg font-bold text-blue-600">
            IELTS Speaking
          </span>
          <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium uppercase">
            {role}
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 group transition-colors"
              >
                <Icon className="mr-3 h-5 w-5 text-slate-400 group-hover:text-blue-600" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center px-3 py-2">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                {userName.charAt(0)}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-700">{userName}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-slate-800">
            {role === "am" ? "Dashboard Quản Lý" : role === "teacher" ? "Dashboard Giáo Viên" : "Cổng Học Viên"}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="text-slate-400 hover:text-slate-600 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-slate-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
