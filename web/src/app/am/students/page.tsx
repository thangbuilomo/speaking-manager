"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Users, 
  Search, 
  Eye, 
  EyeOff, 
  Key, 
  Check, 
  AlertCircle,
  Plus
} from "lucide-react";

export default function AMStudentsPage() {
  // Mock data for student list (with passwords for AM lookup)
  const [students, setStudents] = useState([
    { id: "1", studentCode: "HV001", name: "Nguyễn Văn A", email: "student.a@ielts.com", password: "password123", package: "Speaking Intensive", used: 15, total: 20 },
    { id: "2", studentCode: "HV002", name: "Trần Văn B", email: "student.b@ielts.com", password: "studentb_pass", package: "Speaking Advanced", used: 12, total: 20 },
    { id: "3", studentCode: "HV003", name: "Lê Minh C", email: "student.c@ielts.com", password: "secure_pass_99", package: "Speaking Basic", used: 2, total: 10 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [revealedPasswords, setRevealedPasswords] = useState<{ [key: string]: boolean }>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", studentCode: "", package: "", total: 10 });

  const togglePasswordReveal = (studentId: string) => {
    setRevealedPasswords(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedPassword = Math.random().toString(36).slice(-6); // Random 6-char password
    const student = {
      id: (students.length + 1).toString(),
      studentCode: newStudent.studentCode || `HV00${students.length + 1}`,
      name: newStudent.name,
      email: newStudent.email,
      password: generatedPassword,
      package: newStudent.package || "Speaking Basic",
      used: 0,
      total: Number(newStudent.total)
    };
    setStudents([...students, student]);
    alert(`Đã thêm học viên mới thành công!\nMật khẩu mặc định hệ thống cấp: ${generatedPassword}`);
    setShowAddModal(false);
    setNewStudent({ name: "", email: "", studentCode: "", package: "", total: 10 });
  };

  return (
    <DashboardLayout role="am" userName="Nguyễn AM">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Quản Lý Học Viên</h2>
            <p className="text-sm text-slate-500 mt-1">Danh sách học viên và công cụ tra cứu thông tin tài khoản.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-sm text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm học viên mới
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Tìm học viên theo tên, mã hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none"
            />
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                <th className="py-4 px-6">Mã HV</th>
                <th className="py-4 px-6">Họ và Tên</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Gói Học / Số Buổi</th>
                <th className="py-4 px-6 text-center">Tra cứu Mật khẩu</th>
                <th className="py-4 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-700">{student.studentCode}</td>
                  <td className="py-4 px-6 font-medium text-slate-800">{student.name}</td>
                  <td className="py-4 px-6 text-slate-500">{student.email}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-slate-700">{student.package}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Đã học: {student.used} / {student.total} buổi</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-mono bg-slate-100 px-2.5 py-1 rounded text-xs select-all">
                        {revealedPasswords[student.id] ? student.password : "••••••••"}
                      </span>
                      <button 
                        onClick={() => togglePasswordReveal(student.id)}
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                        title={revealedPasswords[student.id] ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      >
                        {revealedPasswords[student.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-blue-600 font-semibold hover:underline mr-4">Sửa</button>
                    <button className="text-red-600 font-semibold hover:underline">Khóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL THÊM HỌC VIÊN */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100 mx-4">
              <h3 className="text-lg font-bold text-slate-800">Thêm Học Viên Mới</h3>
              <p className="text-xs text-slate-400 mt-1">Thông tin đăng ký học viên mới và cấp mật khẩu ban đầu.</p>
              
              <form onSubmit={handleAddStudent} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">Mã Học Viên (để trống hệ thống tự tạo)</label>
                  <input 
                    type="text"
                    placeholder="VD: HV004"
                    value={newStudent.studentCode}
                    onChange={(e) => setNewStudent({...newStudent, studentCode: e.target.value})}
                    className="w-full mt-1 border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">Họ và Tên</label>
                  <input 
                    required
                    type="text"
                    placeholder="VD: Nguyễn Văn C"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    className="w-full mt-1 border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">Email</label>
                  <input 
                    required
                    type="email"
                    placeholder="VD: student.c@ielts.com"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    className="w-full mt-1 border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase">Gói Học</label>
                    <input 
                      type="text"
                      placeholder="VD: Speaking Intensive"
                      value={newStudent.package}
                      onChange={(e) => setNewStudent({...newStudent, package: e.target.value})}
                      className="w-full mt-1 border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase">Tổng số buổi</label>
                    <input 
                      type="number"
                      value={newStudent.total}
                      onChange={(e) => setNewStudent({...newStudent, total: Number(e.target.value)})}
                      className="w-full mt-1 border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50"
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowAddModal(false);
                      setNewStudent({ name: "", email: "", studentCode: "", package: "", total: 10 });
                    }}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
                  >
                    Thêm & Cấp MK
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
