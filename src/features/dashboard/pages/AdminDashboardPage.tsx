import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import StatsCards from "../components/StatsCards";
import UpcomingSessionsWidget from "../components/UpcomingSessionsWidget";
import Card from "@/components/common/Card";
import Tag from "@/components/common/Tag";
import Button from "@/components/common/Button";
import Select from "@/components/common/Select";
import SearchInput from "@/components/common/SearchInput";
import Pagination from "@/components/common/Pagination";
import { useTrainingStore } from "@/store/trainingStore";
import { Shield, Users, Target, Award, TrendingUp, AlertTriangle, Activity, Clock, Calendar, ChevronRight, Zap, Database, Globe, CheckCircle, Trophy, Grid3x3, List, LayoutGrid, Filter, Search, ChevronDown, ChevronUp } from "lucide-react";

function AdminDashboardPage() {
  const sessions = useTrainingStore((s) => s.sessions);
  const enrollments = useTrainingStore((s) => s.enrollments);
  const units = useTrainingStore((s) => s.units);
  const report = useTrainingStore((s) =>
    s.getReport({ from: "2024-01-01", to: "2024-12-31", unitId: undefined }),
  );

  const navigate = useNavigate();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"cards" | "table" | "list">("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedSections, setExpandedSections] = useState({ excellent: true, needSupport: true });
  const itemsPerPage = viewMode === "cards" ? 6 : 20;

  // Filter options
  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "excellent", label: "Xuất sắc (≥80%)" },
    { value: "good", label: "Đạt yêu cầu (50-79%)" },
    { value: "poor", label: "Cần cải thiện (<50%)" }
  ];

  // Filtered and paginated data
  const filteredReport = useMemo(() => {
    return report.filter(item => {
      const matchesSearch = item.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.unitId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" ||
        (statusFilter === "excellent" && item.completionRate >= 80) ||
        (statusFilter === "good" && item.completionRate >= 50 && item.completionRate < 80) ||
        (statusFilter === "poor" && item.completionRate < 50);

      return matchesSearch && matchesStatus;
    });
  }, [report, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredReport.length / itemsPerPage);
  const paginatedReport = filteredReport.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalSessions = sessions.length;
  const completionRate = Math.round(
    (enrollments.filter((e) => e.status === "COMPLETED").length / Math.max(enrollments.length, 1)) * 100,
  );
  const topUnits = [...filteredReport].sort((a, b) => b.completionRate - a.completionRate).slice(0, 3);
  const weakUnits = [...filteredReport].sort((a, b) => a.completionRate - b.completionRate).slice(0, 2);
  const upcoming = sessions.slice(0, 3);

  const toggleSection = (section: 'excellent' | 'needSupport') => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-4 sm:p-6 md:p-8 text-sand shadow-xl sm:shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 sm:gap-3 items-center sm:items-start text-center sm:text-left">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-sand" />
                <p className="m-0 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-sand/80">
                  Trung tâm Chỉ huy
                </p>
              </div>
              <div className="space-y-1">
                <h1 className="m-0 text-lg sm:text-2xl md:text-3xl font-bold text-sand">Bảng Điều Khiển Chiến Lược</h1>
                <p className="m-0 text-xs sm:text-sm font-medium text-sand/90 hidden sm:block">Hệ thống giám sát huấn luyện và chuyển đổi số quân đội</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="secondary"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 text-sand text-xs sm:text-sm"
                onClick={() => navigate("/reports")}
              >
                <Activity className="mr-2 h-4 w-4" />
                Phân tích dữ liệu
              </Button>
              <Button
                variant="secondary"
                className="bg-orange text-white hover:bg-orange/90 border-orange text-xs sm:text-sm"
                onClick={() => navigate("/sessions")}
              >
                <Zap className="mr-2 h-4 w-4" />
                Triển khai nhanh
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative overflow-hidden rounded-xl border border-forest/10 bg-white p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-transparent" />
            <div className="relative">
              <div className="mb-2 sm:mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-forest/10 p-1.5 sm:p-2">
                  <Target className="h-4 w-4 sm:h-6 sm:w-6 text-forest" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-green-600">+12%</span>
              </div>
              <p className="text-[11px] sm:text-sm font-medium text-gray-600">Buổi huấn luyện</p>
              <p className="text-lg sm:text-2xl font-bold text-forest">{totalSessions}</p>
              <div className="mt-1.5 sm:mt-2 h-1 w-full rounded-full bg-gray-200">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-forest to-olive" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-olive/10 bg-white p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-olive/5 to-transparent" />
            <div className="relative">
              <div className="mb-2 sm:mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-olive/10 p-1.5 sm:p-2">
                  <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-olive" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-orange">Tăng trưởng</span>
              </div>
              <p className="text-[11px] sm:text-sm font-medium text-gray-600">Tỷ lệ hoàn thành</p>
              <p className="text-lg sm:text-2xl font-bold text-olive">{completionRate}%</p>
              <div className="mt-1.5 sm:mt-2 h-1 w-full rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-gradient-to-r from-olive to-moss" style={{width: `${completionRate}%`}} />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-orange/10 bg-white p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-orange/5 to-transparent" />
            <div className="relative">
              <div className="mb-2 sm:mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-orange/10 p-1.5 sm:p-2">
                  <Award className="h-4 w-4 sm:h-6 sm:w-6 text-orange" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-green-600">Xuất sắc</span>
              </div>
              <p className="text-[11px] sm:text-sm font-medium text-gray-600">Đơn vị dẫn đầu</p>
              <p className="text-sm sm:text-lg font-bold text-orange truncate">{topUnits[0]?.unitName ?? "Đang cập nhật"}</p>
              <div className="mt-1.5 sm:mt-2 flex items-center gap-1">
                <span className="text-[10px] sm:text-xs text-gray-500">Hiệu suất:</span>
                <span className="text-xs sm:text-sm font-semibold text-green-600">{topUnits[0]?.completionRate ?? 0}%</span>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-moss/10 bg-white p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-moss/5 to-transparent" />
            <div className="relative">
              <div className="mb-2 sm:mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-moss/10 p-1.5 sm:p-2">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-moss" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-blue-600">Hoạt động</span>
              </div>
              <p className="text-[11px] sm:text-sm font-medium text-gray-600">Tổng quân nhân</p>
              <p className="text-lg sm:text-2xl font-bold text-moss">{enrollments.length}</p>
              <div className="mt-1.5 sm:mt-2 flex items-center gap-1">
                <span className="text-[10px] sm:text-xs text-gray-500">Tham gia:</span>
                <span className="text-xs sm:text-sm font-semibold text-forest">{enrollments.filter(e => e.status !== "ABSENT").length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.3fr,0.7fr]">
          <div className="space-y-4">
            <div className="flex items-start gap-3 px-1 sm:px-0">
              <Calendar className="h-5 w-5 text-forest mt-0.5" />
              <h2 className="text-lg font-bold text-forest">Lịch Huấn Luyện Sắp Tới</h2>
            </div>
            <UpcomingSessionsWidget sessions={upcoming} />
            <div className="mt-4">
              <Button
                variant="secondary"
                className="w-full justify-center text-olive border-forest/20 hover:border-forest/40 hover:text-forest"
                onClick={() => navigate("/sessions")}
              >
                Xem tất cả
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-forest" />
                    <h3 className="text-sm sm:text-base font-semibold text-forest">Lọc & Tìm kiếm</h3>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`rounded-lg p-2 transition-colors ${
                        viewMode === 'cards' ? 'bg-forest text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`rounded-lg p-2 transition-colors ${
                        viewMode === 'table' ? 'bg-forest text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`rounded-lg p-2 transition-colors ${
                        viewMode === 'list' ? 'bg-forest text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid gap-2 sm:gap-3 grid-cols-1">
                  <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Tìm đơn vị..."
                  />
                  <Select
                    options={statusOptions}
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value || "all")}
                    placeholder="Lọc theo trạng thái"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Tìm thấy <span className="font-semibold text-forest">{filteredReport.length}</span> đơn vị
                  </span>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setCurrentPage(1);
                    }}
                    className="text-forest hover:underline"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-start gap-2">
                <Database className="h-5 w-5 text-forest" />
                <h3 className="font-bold text-forest">Tình Hình Đơn Vị</h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                <Clock className="h-3 w-3" />
                Tuần này
              </span>
            </div>

            {/* Top performing units */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Đơn vị xuất sắc ({topUnits.length})</p>
                </div>
                <button
                  onClick={() => toggleSection('excellent')}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {expandedSections.excellent ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
              {expandedSections.excellent && (
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {topUnits.map((u, idx) => (
                    <div
                      key={u.unitId}
                      className="group relative overflow-hidden rounded-xl border border-green-200/50 bg-gradient-to-br from-white to-green-50/30 p-4 shadow-sm transition-all hover:shadow-lg hover:scale-[1.02]"
                    >
                      {/* Rank indicator */}
                      <div className={`absolute top-0 left-0 w-full h-1 ${
                        idx === 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                        idx === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                        'bg-gradient-to-r from-orange-400 to-orange-500'
                      }`} />

                      {/* Unit info */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-forest text-lg">{units.find((x) => x.id === u.unitId)?.name ?? u.unitId}</h4>
                          <div className={`rounded-full p-1.5 ${
                            idx === 0 ? 'bg-yellow-100' :
                            idx === 1 ? 'bg-gray-100' :
                            'bg-orange-100'
                          }`}>
                            <Trophy className={`h-4 w-4 ${
                              idx === 0 ? 'text-yellow-600' :
                              idx === 1 ? 'text-gray-600' :
                              'text-orange-600'
                            }`} />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">ID: {u.unitId}</p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Calendar className="h-3 w-3 text-blue-600" />
                            <span className="text-xs text-blue-600 font-medium">Số buổi</span>
                          </div>
                          <p className="text-lg font-bold text-blue-700">{u.totalSessions}</p>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Users className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-600 font-medium">SQ chưa đủ</span>
                          </div>
                          <p className="text-lg font-bold text-green-700">0</p>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600">Hoàn thành</span>
                          <span className="text-sm font-bold text-green-600">{u.completionRate}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all" style={{width: `${u.completionRate}%`}} />
                        </div>
                        <div className="flex justify-center mt-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            <CheckCircle className="h-3 w-3" />
                            Xuất sắc
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Units needing support */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Cần hỗ trợ khẩn cấp ({weakUnits.length})</p>
                </div>
                <button
                  onClick={() => toggleSection('needSupport')}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {expandedSections.needSupport ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
              {expandedSections.needSupport && (
                <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
                  {weakUnits.map((u) => (
                    <div
                      key={u.unitId}
                      className="group relative overflow-hidden rounded-xl border border-orange-200/50 bg-gradient-to-br from-white to-orange-50/30 p-4 shadow-sm transition-all hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400" />

                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-forest text-lg">{units.find((x) => x.id === u.unitId)?.name ?? u.unitId}</h4>
                          <p className="text-xs text-gray-500">ID: {u.unitId}</p>
                        </div>
                        <div className="rounded-full bg-red-100 p-1.5">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3 p-3 bg-red-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Users className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-700">Quân nhân chưa đạt</span>
                        </div>
                        <span className="text-lg font-bold text-red-600">{u.pendingSoldiers}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600">Tiến độ</span>
                          <span className="text-sm font-bold text-orange-600">{u.completionRate}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-400 transition-all" style={{width: `${u.completionRate}%`}} />
                        </div>
                        <div className="flex justify-center mt-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                            <AlertTriangle className="h-3 w-3" />
                            Cần cải thiện
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredReport.length > itemsPerPage && (
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredReport.length}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            )}

            {/* All Units Section - Shows when there are many units */}
            {filteredReport.length > 5 && (
              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-forest">Tất cả đơn vị ({filteredReport.length})</h3>
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/reports")}
                  >
                    Xem báo cáo chi tiết
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                {viewMode === "table" ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Đơn vị</th>
                          <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Buổi</th>
                          <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Hoàn thành</th>
                          <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Thiếu</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {paginatedReport.map(unit => (
                          <tr key={unit.unitId} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-medium text-gray-900">{unit.unitName}</p>
                                <p className="text-xs text-gray-500">{unit.unitId}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="font-medium">{unit.totalSessions}</span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                unit.completionRate >= 80 ? 'bg-green-100 text-green-700' :
                                unit.completionRate >= 50 ? 'bg-orange-100 text-orange-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {unit.completionRate}%
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`font-medium ${
                                unit.pendingSoldiers > 0 ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {unit.pendingSoldiers}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : viewMode === "list" ? (
                  <div className="space-y-2">
                    {paginatedReport.map(unit => (
                      <div
                        key={unit.unitId}
                        className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 p-3 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-2 w-2 rounded-full ${
                            unit.completionRate >= 80 ? 'bg-green-500' :
                            unit.completionRate >= 50 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`} />
                          <div>
                            <p className="font-medium text-gray-900">{unit.unitName}</p>
                            <p className="text-xs text-gray-500">{unit.unitId}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Buổi</p>
                            <p className="font-semibold">{unit.totalSessions}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Hoàn thành</p>
                            <p className="font-semibold text-green-600">{unit.completionRate}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Thiếu</p>
                            <p className={`font-semibold ${
                              unit.pendingSoldiers > 0 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {unit.pendingSoldiers}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedReport.map(unit => (
                      <div
                        key={unit.unitId}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{unit.unitName}</h4>
                          <span className={`h-2 w-2 rounded-full ${
                            unit.completionRate >= 80 ? 'bg-green-500' :
                            unit.completionRate >= 50 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`} />
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Số buổi:</span>
                            <span className="font-medium">{unit.totalSessions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Hoàn thành:</span>
                            <span className="font-medium text-green-600">{unit.completionRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Quân nhân thiếu:</span>
                            <span className={`font-medium ${
                              unit.pendingSoldiers > 0 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {unit.pendingSoldiers}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Card
            className="border-2 border-border shadow-lg"
            title={
              <div className="flex items-start gap-2">
                <Activity className="h-5 w-5 text-forest mt-0.5" />
                <span className="font-bold text-forest">Kết Quả Huấn Luyện Gần Đây</span>
              </div>
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {enrollments.slice(0, 4).map((enroll) => {
                const session = sessions.find((s) => s.id === enroll.sessionId);
                const unit = units.find((u) => u.id === session?.unitId);
                return (
                  <div
                    key={enroll.id}
                    className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-white to-gray-50 p-4 transition-all hover:shadow-md hover:scale-[1.01]"
                  >
                    <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-forest/5 to-transparent rounded-bl-full" />
                    <div className="relative space-y-2">
                      <div>
                        <h4 className="font-semibold text-forest line-clamp-1">{session?.title ?? session?.courseId}</h4>
                        <p className="mb-0 flex items-center gap-1 text-sm text-gray-600">
                          <Shield className="h-3 w-3" />
                          {unit?.name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-gray-500">Trạng thái:</span>
                        {enroll.status === "COMPLETED" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                            <Award className="h-3 w-3" />
                            {enroll.score ?? 0} điểm
                          </span>
                        ) : enroll.status === "ABSENT" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                            <AlertTriangle className="h-3 w-3" />
                            Vắng mặt
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                            <Clock className="h-3 w-3" />
                            Đã lên lịch
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card
            className="bg-gradient-to-br from-forest to-olive text-white shadow-lg border-0"
            title={
              <div className="flex items-start gap-2">
                <Zap className="h-5 w-5 text-sand" />
                <span className="font-bold text-sand">Trung Tâm Chỉ Huy Nhanh</span>
              </div>
            }
          >
            <div className="space-y-3">
              <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sand">
                  <Globe className="h-4 w-4" />
                  Chuyển Đổi Số
                </h4>
                <div className="space-y-2">
                  <button
                    className="group flex w-full items-center justify-between rounded-lg bg-white/10 px-3 py-2.5 text-left text-sm font-medium text-sand transition-all hover:bg-white/20"
                    onClick={() => navigate("/sessions")}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-orange" />
                      Lập kế hoạch tuần mới
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    className="group flex w-full items-center justify-between rounded-lg bg-white/10 px-3 py-2.5 text-left text-sm font-medium text-sand transition-all hover:bg-white/20"
                    onClick={() => navigate("/reports")}
                  >
                    <span className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-orange" />
                      Xuất báo cáo tổng hợp
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    className="group flex w-full items-center justify-between rounded-lg bg-white/10 px-3 py-2.5 text-left text-sm font-medium text-sand transition-all hover:bg-white/20"
                    onClick={() => navigate("/reports")}
                  >
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange" />
                      Phân tích điểm yếu
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              <div className="rounded-lg bg-sand/10 p-3 backdrop-blur-sm">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sand/80">Thông tin mật</p>
                <p className="text-xs text-sand/90">
                  Hệ thống AI đang phân tích {enrollments.length} hồ sơ huấn luyện để tối ưu hóa chiến lược đào tạo.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium text-sand">Đang hoạt động 24/7</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
