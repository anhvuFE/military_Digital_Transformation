import { useState, useMemo } from "react";
import Card from "@/components/common/Card";
import SearchInput from "@/components/common/SearchInput";
import Pagination from "@/components/common/Pagination";
import Select from "@/components/common/Select";
import { useAuthStore } from "@/store/authStore";
import { useTrainingStore } from "@/store/trainingStore";
import { Calendar, Clock, Award, CheckCircle, XCircle, AlertTriangle, TrendingUp, Filter, FileText, Download, BarChart3 } from "lucide-react";

function UserTrainingHistoryPage() {
  const user = useAuthStore((s) => s.user);
  const timeline = useTrainingStore((s) => (user ? s.getPersonalTimeline(user.id) : []));

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "completed", label: "Đã hoàn thành" },
    { value: "absent", label: "Vắng mặt" },
    { value: "scheduled", label: "Đã lên lịch" }
  ];

  const dateRangeOptions = [
    { value: "all", label: "Tất cả thời gian" },
    { value: "thisMonth", label: "Tháng này" },
    { value: "lastMonth", label: "Tháng trước" },
    { value: "last3Months", label: "3 tháng gần đây" },
    { value: "thisYear", label: "Năm nay" }
  ];

  // Filter timeline
  const filteredTimeline = useMemo(() => {
    let filtered = [...timeline];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.session.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.session.courseId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(item =>
        item.enrollment.status.toLowerCase() === statusFilter
      );
    }

    // Date range filter
    if (dateRange !== "all") {
      const now = new Date();
      const sessionDate = (item: any) => new Date(item.session.startTime);

      filtered = filtered.filter(item => {
        const date = sessionDate(item);
        switch (dateRange) {
          case "thisMonth":
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
          case "lastMonth":
            const lastMonth = new Date(now);
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
          case "last3Months":
            const threeMonthsAgo = new Date(now);
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            return date >= threeMonthsAgo;
          case "thisYear":
            return date.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [timeline, searchQuery, statusFilter, dateRange]);

  // Pagination
  const totalPages = Math.ceil(filteredTimeline.length / itemsPerPage);
  const paginatedTimeline = filteredTimeline.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const stats = {
    total: filteredTimeline.length,
    completed: filteredTimeline.filter(t => t.enrollment.status === "COMPLETED").length,
    absent: filteredTimeline.filter(t => t.enrollment.status === "ABSENT").length,
    avgScore: Math.round(
      filteredTimeline
        .filter(t => t.enrollment.score)
        .reduce((acc, t) => acc + (t.enrollment.score || 0), 0) /
      Math.max(filteredTimeline.filter(t => t.enrollment.score).length, 1)
    ) || 0
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
            <CheckCircle className="h-3 w-3" />
            Hoàn thành
          </span>
        );
      case "ABSENT":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
            <XCircle className="h-3 w-3" />
            Vắng mặt
          </span>
        );
      case "SCHEDULED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
            <Clock className="h-3 w-3" />
            Đã lên lịch
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-8 text-sand shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-sand/80">
                <span className="h-1 w-8 rounded-full bg-orange" />
                Lịch sử cá nhân
              </p>
              <h1 className="mb-2 text-3xl font-bold text-sand">Lịch Sử Huấn Luyện</h1>
              <p className="text-sm font-medium text-sand/90">Theo dõi toàn bộ quá trình huấn luyện của bạn</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-sand backdrop-blur-sm hover:bg-white/20 transition-colors">
                <FileText className="inline-block mr-2 h-4 w-4" />
                Xuất báo cáo
              </button>
              <button className="rounded-lg bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-orange/90 transition-colors">
                <Download className="inline-block mr-2 h-4 w-4" />
                Tải xuống
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600">Tổng số buổi</p>
          </div>

          <div className="rounded-xl border border-green-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold text-green-600">{stats.completed}</span>
            </div>
            <p className="text-sm text-gray-600">Hoàn thành</p>
          </div>

          <div className="rounded-xl border border-red-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold text-red-600">{stats.absent}</span>
            </div>
            <p className="text-sm text-gray-600">Vắng mặt</p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold text-blue-600">{stats.avgScore}</span>
            </div>
            <p className="text-sm text-gray-600">Điểm TB</p>
          </div>
        </div>

        {/* Filter Bar */}
        <Card className="border-2 border-gray-200 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-forest" />
            <h2 className="font-bold text-forest">Bộ lọc và tìm kiếm</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Tìm theo tên khóa học..."
            />
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Trạng thái"
            />
            <Select
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
              placeholder="Thời gian"
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Tìm thấy <span className="font-semibold text-forest">{filteredTimeline.length}</span> kết quả
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setDateRange("all");
                setCurrentPage(1);
              }}
              className="text-forest hover:underline"
            >
              Xóa bộ lọc
            </button>
          </div>
        </Card>

        {/* Training History List */}
        <Card className="border-2 border-border shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-forest" />
            <h2 className="font-bold text-forest">Chi tiết lịch sử huấn luyện</h2>
          </div>

          <div className="space-y-4">
            {paginatedTimeline.map((item) => (
              <div
                key={item.enrollment.id}
                className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-forest">
                        {item.session.title || item.session.courseId}
                      </h3>
                      {getStatusBadge(item.enrollment.status)}
                    </div>

                    <div className="grid gap-2 sm:grid-cols-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>
                          {new Date(item.session.startTime).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>
                          {new Date(item.session.startTime).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })} - {new Date(item.session.endTime).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                      </div>
                      {item.enrollment.score !== null && (
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold">
                            Điểm: {item.enrollment.score}
                          </span>
                        </div>
                      )}
                    </div>

                    {item.enrollment.feedback && (
                      <div className="mt-3 rounded-lg bg-gray-50 p-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Nhận xét:</span> {item.enrollment.feedback}
                        </p>
                      </div>
                    )}
                  </div>

                  {item.enrollment.status === "COMPLETED" && (
                    <div className="ml-4">
                      <div className={`rounded-lg p-3 text-center ${
                        item.enrollment.passed
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}>
                        <p className="text-2xl font-bold">{item.enrollment.score || 0}</p>
                        <p className="text-xs font-medium">
                          {item.enrollment.passed ? "ĐẠT" : "CHƯA ĐẠT"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredTimeline.length === 0 && (
              <div className="py-12 text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500">Không tìm thấy kết quả nào</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredTimeline.length > itemsPerPage && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredTimeline.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default UserTrainingHistoryPage;