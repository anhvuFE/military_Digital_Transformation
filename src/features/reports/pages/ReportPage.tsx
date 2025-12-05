import { useMemo, useState } from "react";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import SearchInput from "@/components/common/SearchInput";
import Pagination from "@/components/common/Pagination";
import Select from "@/components/common/Select";
import { useTrainingStore } from "@/store/trainingStore";
import ReportFilterBar from "../components/ReportFilterBar";
import ReportTable from "../components/ReportTable";
import type { ReportFilter } from "@/types/report";
import { FileText, Download, TrendingUp, Users, AlertTriangle, Shield, Activity, Calendar, Filter, BarChart3, PieChart, Target, Award, Zap, ChevronRight, FileDown, Printer, CheckCircle, XCircle, Clock, Grid3x3, LayoutGrid, List, Search } from "lucide-react";

const defaultFilter: ReportFilter = {
  from: "2024-04-01",
  to: "2024-04-30",
};

function ReportPage() {
  const units = useTrainingStore((s) => s.units);
  const getReport = useTrainingStore((s) => s.getReport);
  const [filter, setFilter] = useState<ReportFilter>(defaultFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "cards" | "list">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === "table" ? 20 : viewMode === "cards" ? 12 : 30;

  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "excellent", label: "Xuất sắc (≥80%)" },
    { value: "good", label: "Đạt yêu cầu (50-79%)" },
    { value: "poor", label: "Cần cải thiện (<50%)" }
  ];

  const rawRows = useMemo(() => getReport(filter), [getReport, filter]);

  // Filter data based on search and status
  const rows = useMemo(() => {
    return rawRows.filter(item => {
      const matchesSearch = item.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.unitId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" ||
        (statusFilter === "excellent" && item.completionRate >= 80) ||
        (statusFilter === "good" && item.completionRate >= 50 && item.completionRate < 80) ||
        (statusFilter === "poor" && item.completionRate < 50);

      return matchesSearch && matchesStatus;
    });
  }, [rawRows, searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const paginatedRows = rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totals = useMemo(() => {
    const totalSessions = rows.reduce((sum, r) => sum + r.totalSessions, 0);
    const avgCompletion =
      rows.length > 0 ? Math.round(rows.reduce((sum, r) => sum + r.completionRate, 0) / rows.length) : 0;
    const pending = rows.reduce((sum, r) => sum + r.pendingSoldiers, 0);
    return { totalSessions, avgCompletion, pending };
  }, [rows]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-4 sm:p-6 md:p-8 text-sand shadow-xl sm:shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <div className="rounded-xl bg-white/10 p-2.5 sm:p-3 backdrop-blur-sm">
                    <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-sand" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand/80">
                    Trung tâm Phân tích
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-sand">Báo Cáo Chiến Lược Huấn Luyện</h1>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-sand/90 hidden sm:block">Phân tích hiệu quả và đánh giá chất lượng đào tạo toàn quân</p>
                </div>
              </div>
              <div className="flex flex-row gap-2 w-full sm:w-auto">
                <Button
                  variant="secondary"
                  className="flex-1 sm:flex-none bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 text-sand text-xs sm:text-sm px-3 py-2 justify-center"
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Xuất CSV
                </Button>
                <Button
                  className="flex-1 sm:flex-none bg-orange text-white hover:bg-orange/90 border-orange text-xs sm:text-sm px-3 py-2 justify-center"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Xuất PDF
                </Button>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-3 md:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-white/20 bg-white/10 p-2.5 sm:p-3 md:p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-sand/70">Tổng buổi</p>
                      <p className="text-xl sm:text-2xl font-bold text-sand mt-1">{totals.totalSessions}</p>
                    </div>
                    <div className="rounded-lg bg-white/20 p-1 sm:p-1.5">
                      <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="h-1 w-full rounded-full bg-white/20">
                      <div className="h-full w-full rounded-full bg-gradient-to-r from-orange to-yellow-400" />
                    </div>
                    <p className="text-[8px] sm:text-[10px] text-sand/60 mt-1">Đã lên lịch</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-white/20 bg-white/10 p-2.5 sm:p-3 md:p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-sand/70">Hoàn thành TB</p>
                      <p className="text-xl sm:text-2xl font-bold text-sand mt-1">{totals.avgCompletion}%</p>
                    </div>
                    <div className="rounded-lg bg-white/20 p-1 sm:p-1.5">
                      <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400" />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="h-1 w-full rounded-full bg-white/20">
                      <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600" style={{width: `${totals.avgCompletion}%`}} />
                    </div>
                    <p className="text-[8px] sm:text-[10px] text-sand/60 mt-1">Tỷ lệ trung bình</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-white/20 bg-white/10 p-2.5 sm:p-3 md:p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-sand/70">Chưa đủ</p>
                      <p className="text-xl sm:text-2xl font-bold text-sand mt-1">{totals.pending}</p>
                    </div>
                    <div className="rounded-lg bg-white/20 p-1 sm:p-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange" />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="h-1 w-full rounded-full bg-white/20">
                      <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-orange to-red-400" />
                    </div>
                    <p className="text-[8px] sm:text-[10px] text-sand/60 mt-1">Quân nhân cần bổ sung</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-white/20 bg-white/10 p-2.5 sm:p-3 md:p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-sand/70">Đơn vị</p>
                      <p className="text-xl sm:text-2xl font-bold text-sand mt-1">{rows.length}</p>
                    </div>
                    <div className="rounded-lg bg-white/20 p-1 sm:p-1.5">
                      <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="h-1 w-full rounded-full bg-white/20">
                      <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
                    </div>
                    <p className="text-[8px] sm:text-[10px] text-sand/60 mt-1">Đang theo dõi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-[300px,1fr] xl:grid-cols-[350px,1fr]">
          <div className="space-y-4 sm:space-y-6">
            <Card className="border-2 border-forest/10 bg-white shadow-lg p-3 sm:p-4 md:p-5">
              <div className="mb-4 flex items-start gap-2">
                <Filter className="h-5 w-5 text-forest mt-0.5" />
                <h3 className="font-bold text-forest">Bộ Lọc Báo Cáo</h3>
              </div>
              <ReportFilterBar units={units} filter={filter} onChange={setFilter} />
            </Card>

            <Card
              className="bg-gradient-to-br from-forest to-olive text-white shadow-lg border-0 p-4 sm:p-5"
              title={
                <div className="flex items-start gap-2">
                  <BarChart3 className="h-5 w-5 text-sand mt-0.5" />
                  <span className="font-bold text-sand">Thống Kê Nhanh</span>
                </div>
              }
            >
              <div className="space-y-3">
                <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                  <h4 className="mb-3 flex items-start gap-2 text-sm font-semibold text-sand">
                    <Target className="h-4 w-4 mt-0.5" />
                    Top đơn vị xuất sắc
                  </h4>
                  <div className="space-y-2">
                    {rows
                      .sort((a, b) => b.completionRate - a.completionRate)
                      .slice(0, 3)
                      .map((row, idx) => (
                        <div key={row.unitId} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
                              idx === 0 ? 'bg-yellow-500' :
                              idx === 1 ? 'bg-gray-400' :
                              'bg-orange-600'
                            }`}>
                              {idx + 1}
                            </div>
                            <span className="text-xs text-sand/90">{row.unitName}</span>
                          </div>
                          <span className="text-sm font-bold text-sand">{row.completionRate}%</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                  <h4 className="mb-3 flex items-start gap-2 text-sm font-semibold text-sand">
                    <AlertTriangle className="h-4 w-4 mt-0.5" />
                    Cần cải thiện
                  </h4>
                  <div className="space-y-2">
                    {rows
                      .filter(r => r.completionRate < 50)
                      .slice(0, 2)
                      .map((row) => (
                        <div key={row.unitId} className="flex items-center justify-between">
                          <span className="text-xs text-sand/90">{row.unitName}</span>
                          <span className="text-xs font-semibold text-orange">{row.pendingSoldiers} thiếu</span>
                        </div>
                      ))}
                  </div>
                </div>

                <button className="group flex w-full items-center justify-between rounded-lg bg-orange p-3 text-white transition-all hover:bg-orange/90 hover:shadow-md">
                  <span className="text-sm font-medium">Phân tích chi tiết</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Card>

            <Card className="border-2 border-orange-200/50 bg-gradient-to-br from-white to-orange-50/30 shadow-lg p-3 sm:p-4 md:p-5">
              <div className="mb-3 flex items-start gap-2">
                <PieChart className="h-5 w-5 text-orange-600 mt-0.5" />
                <h3 className="font-bold text-forest">Phân bố kết quả</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm font-medium text-green-700">Hoàn thành tốt</span>
                  </div>
                  <span className="font-bold text-green-700">
                    {rows.filter(r => r.completionRate >= 80).length}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-orange-600 mt-0.5" />
                    <span className="text-sm font-medium text-orange-700">Đang tiến hành</span>
                  </div>
                  <span className="font-bold text-orange-700">
                    {rows.filter(r => r.completionRate >= 50 && r.completionRate < 80).length}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-sm font-medium text-red-700">Cần hỗ trợ</span>
                  </div>
                  <span className="font-bold text-red-700">
                    {rows.filter(r => r.completionRate < 50).length}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="border-2 border-border shadow-lg p-3 sm:p-4 md:p-5">
            <div className="mb-3 sm:mb-4 border-b border-gray-200 pb-3 sm:pb-4">
              <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-forest mt-0.5" />
                  <h2 className="text-base sm:text-lg font-bold text-forest">Báo Cáo Chi Tiết Theo Đơn Vị</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-blue-700">
                    <Activity className="h-3 w-3" />
                    Đang cập nhật
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {filter.from} - {filter.to}
                  </span>
                </div>
              </div>

              {/* Search and filter bar */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <SearchInput
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder="Tìm theo tên hoặc mã đơn vị..."
                      className="w-full sm:w-64"
                    />
                    <Select
                      options={statusOptions}
                      value={statusFilter}
                      onChange={(value) => setStatusFilter(value || "all")}
                      placeholder="Lọc theo trạng thái"
                    />
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`rounded-lg p-1.5 sm:p-2 transition-colors ${
                        viewMode === 'table' ? 'bg-forest text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`rounded-lg p-1.5 sm:p-2 transition-colors ${
                        viewMode === 'cards' ? 'bg-forest text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`rounded-lg p-1.5 sm:p-2 transition-colors ${
                        viewMode === 'list' ? 'bg-forest text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
                  <span className="text-gray-600">
                    Tìm thấy <span className="font-semibold text-forest">{rows.length}</span> đơn vị
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

            {/* Content based on view mode */}
            {viewMode === "table" ? (
              <div className="overflow-auto">
                <ReportTable rows={paginatedRows} />
              </div>
            ) : viewMode === "cards" ? (
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedRows.map(row => (
                  <div
                    key={row.unitId}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">{row.unitName}</h4>
                      <span className={`h-2 w-2 rounded-full ${
                        row.completionRate >= 80 ? 'bg-green-500' :
                        row.completionRate >= 50 ? 'bg-orange-500' :
                        'bg-red-500'
                      }`} />
                    </div>
                    <p className="text-xs text-gray-500 mb-3">ID: {row.unitId}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Số buổi:</span>
                        <span className="text-sm font-semibold">{row.totalSessions}</span>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Hoàn thành:</span>
                          <span className="text-sm font-semibold">{row.completionRate}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${
                              row.completionRate >= 80 ? 'from-green-500 to-emerald-500' :
                              row.completionRate >= 50 ? 'from-orange-500 to-amber-500' :
                              'from-red-500 to-red-600'
                            }`}
                            style={{ width: `${row.completionRate}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Quân nhân thiếu:</span>
                        <span className={`text-sm font-semibold ${
                          row.pendingSoldiers > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {row.pendingSoldiers}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {paginatedRows.map(row => (
                  <div
                    key={row.unitId}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border border-gray-100 bg-gray-50/50 p-3 sm:p-4 hover:bg-gray-100 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`h-8 sm:h-10 w-1.5 rounded-full bg-gradient-to-b ${
                        row.completionRate >= 80 ? 'from-green-500 to-emerald-500' :
                        row.completionRate >= 50 ? 'from-orange-500 to-amber-500' :
                        'from-red-500 to-red-600'
                      }`} />
                      <div className="flex-1">
                        <p className="font-semibold text-sm sm:text-base text-gray-900">{row.unitName}</p>
                        <p className="text-xs text-gray-500">ID: {row.unitId}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                      <div className="text-center flex-1 sm:flex-none">
                        <p className="text-[10px] sm:text-xs text-gray-500">Số buổi</p>
                        <p className="text-sm sm:text-lg font-bold text-gray-900">{row.totalSessions}</p>
                      </div>
                      <div className="text-center flex-1 sm:flex-none">
                        <p className="text-[10px] sm:text-xs text-gray-500">Hoàn thành</p>
                        <p className="text-sm sm:text-lg font-bold text-green-600">{row.completionRate}%</p>
                      </div>
                      <div className="text-center flex-1 sm:flex-none">
                        <p className="text-[10px] sm:text-xs text-gray-500">Thiếu</p>
                        <p className={`text-sm sm:text-lg font-bold ${
                          row.pendingSoldiers > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {row.pendingSoldiers}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {rows.length > itemsPerPage && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={rows.length}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            )}
          </Card>
        </div>

        <div className="mt-6 relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-4 sm:p-6 md:p-8 shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative">
            <div className="flex items-start gap-2 mb-4 sm:mb-6">
              <div className="rounded-xl bg-white/20 p-2 sm:p-3 backdrop-blur-sm">
                <Zap className="h-5 w-5 sm:h-7 sm:w-7 text-sand" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-sand">Khuyến nghị chiến lược</h3>
                <p className="text-xs sm:text-sm text-sand/70 mt-1">Đề xuất hành động dựa trên phân tích dữ liệu</p>
              </div>
            </div>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-3 sm:p-4 md:p-5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-xl">
                <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="rounded-lg bg-yellow-500/30 p-2 flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-sand" />
                    </div>
                    <div className="pt-2">
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sand">Tăng cường</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-sand mb-2">
                    {rows.filter(r => r.completionRate < 50).length} đơn vị yếu
                  </p>
                  <p className="text-xs sm:text-sm text-sand/80">
                    Cần hỗ trợ khẩn cấp và tập trung nguồn lực
                  </p>
                  <div className="mt-3 h-1 w-full rounded-full bg-white/20">
                    <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" />
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 sm:p-4 md:p-5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-xl">
                <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="rounded-lg bg-green-500/30 p-2 flex-shrink-0">
                      <Award className="h-5 w-5 text-sand" />
                    </div>
                    <div className="pt-2">
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sand">Duy trì</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-sand mb-2">
                    {rows.filter(r => r.completionRate >= 80).length} đơn vị xuất sắc
                  </p>
                  <p className="text-xs sm:text-sm text-sand/80">
                    Giữ vững thành tích và chia sẻ kinh nghiệm
                  </p>
                  <div className="mt-3 h-1 w-full rounded-full bg-white/20">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-green-400 to-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-3 sm:p-4 md:p-5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-xl">
                <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="rounded-lg bg-blue-500/30 p-2 flex-shrink-0">
                      <Target className="h-5 w-5 text-sand" />
                    </div>
                    <div className="pt-2">
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sand">Mục tiêu</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-sand mb-2">
                    90% hoàn thành
                  </p>
                  <p className="text-xs sm:text-sm text-sand/80">
                    Đạt chuẩn huấn luyện toàn quân đội
                  </p>
                  <div className="mt-3 h-1 w-full rounded-full bg-white/20">
                    <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
