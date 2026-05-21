"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Calendar, 
  Clock, 
  HelpCircle, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Plus
} from "lucide-react";

export default function StudentReschedulePage() {
  // Mock data for Reschedules and Makeup classes
  const mySessions = [
    { id: "s1", date: "22/05/2026", time: "18:00 - 18:30", teacher: "GV. Minh", type: "Speaking 1-1" },
    { id: "s2", date: "25/05/2026", time: "18:30 - 19:30", teacher: "GV. Lan", type: "Speaking Nhóm" }
  ];

  const makeupRequests = [
    { id: "m1", dateCreated: "19/05/2026", originalClass: "Ca GV. Thanh (15/05)", status: "Đã xếp lịch", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-100", note: "Xếp vào tối T5 hoặc T6" },
    { id: "m2", dateCreated: "21/05/2026", originalClass: "Ca GV. Lan (20/05)", status: "Đang chờ duyệt", statusColor: "text-amber-700 bg-amber-50 border-amber-100", note: "Bận việc đột xuất gia đình" }
  ];

  // Form states
  const [selectedSession, setSelectedSession] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  
  const [makeupSessionId, setMakeupSessionId] = useState("");
  const [makeupNote, setMakeupNote] = useState("");
  const [showMakeupModal, setShowMakeupModal] = useState(false);

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Yêu cầu đổi lịch cho ca ${selectedSession} đã được gửi thành công!\nLý do: ${rescheduleReason}`);
    setShowRescheduleModal(false);
    setSelectedSession("");
    setRescheduleReason("");
  };

  const handleMakeupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Yêu cầu ca bù đã được gửi thành công!\nGhi chú: ${makeupNote}`);
    setShowMakeupModal(false);
    setMakeupSessionId("");
    setMakeupNote("");
  };

  return (
    <DashboardLayout role="student" userName="Trần Văn B">
      <div className="space-y-8">
        
        {/* Tiêu đề & nút hành động */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Đổi Lịch & Đăng Ký Ca Bù</h2>
            <p className="text-sm text-slate-500 mt-1">Quản lý và cập nhật lịch học Speaking của bạn nhanh chóng.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowRescheduleModal(true)}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-sm text-sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Yêu cầu đổi lịch
            </button>
            <button 
              onClick={() => setShowMakeupModal(true)}
              className="flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-sm text-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Yêu cầu ca bù
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Lịch dạy/học có thể đổi */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800">Ca Học Hiện Tại</h3>
              <p className="text-xs text-slate-400 mt-0.5">Danh sách các ca học sắp diễn ra của bạn.</p>
            </div>
            <div className="divide-y divide-slate-100">
              {mySessions.map((session) => (
                <div key={session.id} className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        {session.type}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-800">{session.date}</p>
                    <p className="text-xs text-slate-500 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {session.time} • {session.teacher}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedSession(session.id);
                      setShowRescheduleModal(true);
                    }}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Yêu cầu đổi
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Lịch sử yêu cầu ca bù */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800">Yêu Cầu Ca Bù</h3>
              <p className="text-xs text-slate-400 mt-0.5">Tiến độ xử lý các ca đăng ký học bù của bạn.</p>
            </div>
            <div className="divide-y divide-slate-100">
              {makeupRequests.map((request) => (
                <div key={request.id} className="p-6 space-y-3 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-400">Yêu cầu ngày: {request.dateCreated}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${request.statusColor}`}>
                      {request.status}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{request.originalClass}</h4>
                    <p className="text-xs text-slate-500 mt-1">Ghi chú: {request.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* MODAL YÊU CẦU ĐỔI LỊCH */}
        {showRescheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100 mx-4">
              <h3 className="text-lg font-bold text-slate-800">Yêu Cầu Đổi Lịch Học</h3>
              <p className="text-xs text-slate-400 mt-1">Vui lòng chọn ca học muốn đổi và nhập lý do.</p>
              
              <form onSubmit={handleRescheduleSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">Ca học cần đổi</label>
                  <select 
                    required 
                    value={selectedSession}
                    onChange={(e) => setSelectedSession(e.target.value)}
                    className="w-full mt-1 border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50"
                  >
                    <option value="">-- Chọn ca học --</option>
                    {mySessions.map((s) => (
                      <option key={s.id} value={s.id}>{s.date} ({s.time}) - {s.teacher}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">Lý do đổi lịch & Khung giờ mong muốn</label>
                  <textarea 
                    required 
                    rows={3}
                    placeholder="Ví dụ: Em bận thi giữa kỳ, mong muốn đổi sang tối Thứ Sáu cùng giờ..."
                    value={rescheduleReason}
                    onChange={(e) => setRescheduleReason(e.target.value)}
                    className="w-full mt-1 border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowRescheduleModal(false);
                      setSelectedSession("");
                      setRescheduleReason("");
                    }}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
                  >
                    Gửi yêu cầu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL ĐĂNG KÝ CA BÙ */}
        {showMakeupModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100 mx-4">
              <h3 className="text-lg font-bold text-slate-800">Đăng Ký Ca Học Bù</h3>
              <p className="text-xs text-slate-400 mt-1">Yêu cầu học bù cho các buổi học bạn đã nghỉ (vắng học).</p>
              
              <form onSubmit={handleMakeupSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">Buổi học đã nghỉ cần bù</label>
                  <select 
                    required 
                    value={makeupSessionId}
                    onChange={(e) => setMakeupSessionId(e.target.value)}
                    className="w-full mt-1 border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50"
                  >
                    <option value="">-- Chọn buổi nghỉ --</option>
                    <option value="old1">Ca vắng ngày 15/05 (GV. Thanh)</option>
                    <option value="old2">Ca vắng ngày 20/05 (GV. Lan)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">Ghi chú lịch rảnh của bạn</label>
                  <textarea 
                    required 
                    rows={3}
                    placeholder="Ví dụ: Em có thể học bù vào sáng Thứ Bảy từ 9h-11h..."
                    value={makeupNote}
                    onChange={(e) => setMakeupNote(e.target.value)}
                    className="w-full mt-1 border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowMakeupModal(false);
                      setMakeupSessionId("");
                      setMakeupNote("");
                    }}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold"
                  >
                    Gửi yêu cầu bù
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
