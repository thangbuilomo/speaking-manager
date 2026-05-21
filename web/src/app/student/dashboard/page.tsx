import DashboardLayout from "@/components/DashboardLayout";
import { 
  Calendar, 
  BookOpen, 
  Award, 
  Clock, 
  ChevronRight,
  MessageCircle,
  FileText
} from "lucide-react";

export default function StudentDashboard() {
  // Mock data for student portal demo
  const studentInfo = {
    name: "Trần Văn B",
    studentCode: "HV002",
    package: "IELTS Speaking Intensive (1-1)",
    totalSessions: 20,
    usedSessions: 12,
    makeupSessions: 1,
    remainingSessions: 8,
  };

  const stats = [
    { label: "Tổng số ca đăng ký", value: studentInfo.totalSessions, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Ca học đã hoàn thành", value: studentInfo.usedSessions, icon: Award, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Ca học còn lại", value: studentInfo.remainingSessions, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Số ca cần học bù", value: studentInfo.makeupSessions, icon: Calendar, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  const upcomingSessions = [
    { id: 1, date: "Thứ Sáu, 22/05/2026", time: "18:00 - 18:30", teacher: "GV. Minh", type: "Speaking 1-1", status: "Đã gán" },
    { id: 2, date: "Thứ Hai, 25/05/2026", time: "18:30 - 19:30", teacher: "GV. Lan", type: "Speaking Nhóm (3 HV)", status: "Đã gán" },
  ];

  const pastReviews = [
    {
      id: 101,
      date: "20/05/2026",
      teacher: "GV. Thanh",
      topic: "Describe a book you read recently",
      scores: { fluency: 6.5, lexical: 6.0, grammar: 6.0, pronunciation: 6.5, overall: 6.25 },
      homework: "Luyện phát âm đuôi -s/es và chuẩn bị từ vựng topic 'Technology'",
      teacherNote: "Học viên phản xạ tốt, từ vựng phong phú nhưng thỉnh thoảng còn quên chia động từ ở thì quá khứ đơn."
    },
    {
      id: 102,
      date: "18/05/2026",
      teacher: "GV. Thanh",
      topic: "Describe a person who inspired you",
      scores: { fluency: 6.0, lexical: 6.0, grammar: 5.5, pronunciation: 6.0, overall: 5.87 },
      homework: "Sử dụng các cấu trúc câu phức (Although, Even though...)",
      teacherNote: "Cần chú ý nói trôi chảy hơn, hạn chế các từ đệm ừm, à."
    }
  ];

  return (
    <DashboardLayout role="student" userName={studentInfo.name}>
      <div className="space-y-6">
        
        {/* Chào mừng */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Chào mừng bạn quay lại, {studentInfo.name}!</h2>
            <p className="text-blue-100 mt-1">Mã học viên: {studentInfo.studentCode} • Gói học: {studentInfo.package}</p>
          </div>
          <button className="px-5 py-2.5 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-sm text-sm">
            Yêu cầu đổi lịch gấp
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg} mr-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                <p className="text-xl font-bold text-slate-800 mt-0.5">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Khối chính */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Lịch học sắp tới */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800">Lịch Học Sắp Tới</h3>
            </div>
            <div className="divide-y divide-slate-100 flex-1">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      {session.type}
                    </span>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {session.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mt-3">{session.date}</h4>
                  <p className="text-sm text-slate-600 mt-1">{session.time}</p>
                  <p className="text-xs text-slate-400 mt-2">Giảng viên: <span className="font-semibold text-slate-600">{session.teacher}</span></p>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
              <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                Xem toàn bộ lịch học
              </button>
            </div>
          </div>

          {/* Lịch sử nhận xét & Điểm số */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Đánh Giá & Nhận Xét Gần Nhất</h3>
              <button className="text-sm font-medium text-blue-600 hover:underline flex items-center">
                Tất cả nhận xét <ChevronRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {pastReviews.map((review) => (
                <div key={review.id} className="p-6 space-y-4 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Topic: {review.topic}</p>
                      <p className="text-xs text-slate-400 mt-1">Thời gian: {review.date} • Giảng viên: {review.teacher}</p>
                    </div>
                    {/* Score badges */}
                    <div className="flex items-center gap-2 bg-blue-50/50 px-3 py-1.5 rounded-xl border border-blue-100">
                      <span className="text-xs text-blue-700 font-medium">Overall Score:</span>
                      <span className="text-sm font-extrabold text-blue-700">{review.scores.overall}</span>
                    </div>
                  </div>

                  {/* Chi tiết điểm thành phần */}
                  <div className="grid grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-lg text-center">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Fluency</p>
                      <p className="text-sm font-bold text-slate-700">{review.scores.fluency}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Vocabulary</p>
                      <p className="text-sm font-bold text-slate-700">{review.scores.lexical}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Grammar</p>
                      <p className="text-sm font-bold text-slate-700">{review.scores.grammar}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Pronunciation</p>
                      <p className="text-sm font-bold text-slate-700">{review.scores.pronunciation}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start text-sm">
                      <MessageCircle className="w-4 h-4 text-slate-400 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-600"><strong className="text-slate-700 font-semibold">Nhận xét:</strong> {review.teacherNote}</p>
                    </div>
                    <div className="flex items-start text-sm">
                      <FileText className="w-4 h-4 text-slate-400 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-600"><strong className="text-slate-700 font-semibold">Bài tập về nhà:</strong> {review.homework}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
