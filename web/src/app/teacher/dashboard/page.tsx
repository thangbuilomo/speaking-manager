import DashboardLayout from "@/components/DashboardLayout";
import { 
  CalendarCheck, 
  MessageSquareWarning, 
  Clock, 
  PlusCircle,
  MessageCircle
} from "lucide-react";

export default function TeacherDashboard() {
  const stats = [
    { label: "Ca dạy hôm nay", value: "4", icon: CalendarCheck, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Ca chờ nhận xét", value: "1", icon: MessageSquareWarning, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <DashboardLayout role="teacher" userName="GV. Thanh">
      <div className="space-y-6">
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Chào buổi sáng, Thanh!</h2>
            <p className="text-sm text-slate-500 mt-1">Hôm nay bạn có 4 ca dạy. Ca gần nhất sẽ bắt đầu lúc 18:00.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors">
              <MessageCircle className="w-4 h-4 mr-2" />
              Gửi lời nhắn HV
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <PlusCircle className="w-4 h-4 mr-2" />
              Đăng ký ca rảnh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center">
              <div className={`p-4 rounded-lg ${stat.bg} mr-5`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">Lịch Dạy Hôm Nay</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { time: "18:00 - 18:30", student: "Nguyễn Lê C", type: "Speaking 1-1", status: "Sắp diễn ra", statusColor: "bg-blue-100 text-blue-700" },
              { time: "18:30 - 19:30", student: "Nhóm 3 HV (B, C, D)", type: "Speaking Nhóm", status: "Chưa bắt đầu", statusColor: "bg-slate-100 text-slate-700" },
              { time: "20:00 - 20:30", student: "Trần Văn A", type: "Ca bù", status: "Chưa bắt đầu", statusColor: "bg-slate-100 text-slate-700" },
            ].map((session, i) => (
              <div key={i} className="px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
                  <div className="w-32">
                    <p className="text-sm font-bold text-slate-800">{session.time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{session.student}</p>
                    <p className="text-xs text-slate-500 mt-1">{session.type}</p>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 flex items-center gap-3 w-full sm:w-auto justify-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${session.statusColor}`}>
                    {session.status}
                  </span>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                    Chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-200 overflow-hidden p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <MessageSquareWarning className="h-8 w-8 text-amber-500 mr-4" />
            <div>
              <h3 className="text-amber-800 font-bold">Bạn có 1 ca học chưa nhận xét!</h3>
              <p className="text-sm text-amber-700 mt-1">HV Lê Minh D - 19:00 ngày hôm qua.</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors whitespace-nowrap">
            Nhập điểm ngay
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
