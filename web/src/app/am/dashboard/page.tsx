import DashboardLayout from "@/components/DashboardLayout";
import { 
  Users, 
  CalendarClock, 
  AlertCircle, 
  CheckCircle2,
  CalendarRange
} from "lucide-react";

export default function AMDashboard() {
  // Mock data based on web-function.md spec
  const stats = [
    { label: "Số ca hôm nay", value: "24", icon: CalendarRange, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Ca trống (Chưa gán HV)", value: "5", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Ca đã gán học viên", value: "17", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Ca chờ bù tuần sau", value: "2", icon: CalendarClock, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <DashboardLayout role="am" userName="Nguyễn AM">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg} mr-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Items & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-800">Cảnh Báo Cần Xử Lý</h2>
              <span className="bg-red-100 text-red-600 py-1 px-3 rounded-full text-xs font-medium">3 việc</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                "Học viên Trần Văn B sắp hết buổi (Còn 1 buổi)",
                "Giáo viên Nguyễn Văn A chưa nhập nhận xét cho 2 ca hôm qua",
                "Có 1 yêu cầu đổi lịch khẩn cấp chiều nay"
              ].map((task, i) => (
                <div key={i} className="px-6 py-4 flex items-center hover:bg-slate-50 transition-colors">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                  <p className="text-sm text-slate-700">{task}</p>
                  <button className="ml-auto text-sm text-blue-600 font-medium hover:underline">Xử lý</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800">Lịch Học Sắp Diễn Ra (Hôm nay)</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { time: "18:00 - 18:30", teacher: "GV. Minh", student: "Nguyễn Lê C", status: "Đã gán" },
                { time: "18:30 - 19:30", teacher: "GV. Lan", student: "Nhóm 3 HV", status: "Đã gán" },
                { time: "19:00 - 19:30", teacher: "GV. Tuấn", student: "Chưa gán", status: "Trống" },
              ].map((session, i) => (
                <div key={i} className="px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{session.time}</p>
                    <p className="text-sm text-slate-500 mt-1">{session.teacher} • {session.student}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    session.status === 'Trống' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50">
              <button className="text-sm font-medium text-blue-600 w-full text-center hover:underline">Xem toàn bộ lịch</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
