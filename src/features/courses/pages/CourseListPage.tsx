import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useUiStore } from "@/store/uiStore";
import { useTrainingStore } from "@/store/trainingStore";
import CourseTable from "../components/CourseTable";
import CourseFormModal from "../components/CourseFormModal";
import Pagination from "@/components/common/Pagination";
import type { Course } from "@/types/course";
import { BookOpen, Target, Zap, Shield, TrendingUp, Award, Users, Calendar, Filter, Search, Plus, AlertCircle, FileText, Activity, ChevronRight, Crosshair, Heart, GraduationCap } from "lucide-react";

function CourseListPage() {
  const courses = useTrainingStore((s) => s.courses);
  const sessions = useTrainingStore((s) => s.sessions);
  const createCourse = useTrainingStore((s) => s.createCourse);
  const updateCourse = useTrainingStore((s) => s.updateCourse);
  const deleteCourse = useTrainingStore((s) => s.deleteCourse);
  const { openModal, closeModal } = useUiStore();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | Course["type"]>("ALL");
  const [requiredFilter, setRequiredFilter] = useState<"ALL" | "REQ" | "OPT">("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const requiredCount = courses.filter((c) => c.required).length;
  const optionalCount = courses.length - requiredCount;
  const sessionCountByCourse = sessions.reduce<Record<string, number>>((map, session) => {
    map[session.courseId] = (map[session.courseId] ?? 0) + 1;
    return map;
  }, {});

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchSearch =
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        (course.description ?? "").toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "ALL" ? true : course.type === typeFilter;
      const matchReq =
        requiredFilter === "ALL" ? true : requiredFilter === "REQ" ? course.required : !course.required;
      return matchSearch && matchType && matchReq;
    });
  }, [courses, search, typeFilter, requiredFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, typeFilter, requiredFilter]);

  const pagedCourses = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCourses.slice(start, start + pageSize);
  }, [filteredCourses, page]);

  const handleCreate = () => {
    openModal(
      "Tạo khóa huấn luyện",
      <CourseFormModal
        onSubmit={(payload) => {
          createCourse(payload);
          closeModal();
        }}
        onCancel={closeModal}
      />,
    );
  };

  const handleEdit = (course: Course) => {
    openModal(
      "Cập nhật khóa",
      <CourseFormModal
        initial={course}
        onSubmit={(payload) => {
          updateCourse(course.id, payload);
          closeModal();
        }}
        onCancel={closeModal}
      />,
    );
  };

  const handleDelete = (id: string) => {
    openModal(
      "Xóa khóa",
      <ConfirmDialog
        title="Xóa khóa?"
        message="Hành động không thể hoàn tác."
        onConfirm={() => {
          deleteCourse(id);
          closeModal();
        }}
        onCancel={closeModal}
      />,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-4 sm:p-6 md:p-8 text-sand shadow-xl sm:shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-center sm:justify-start gap-3">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-sand mt-0.5" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand/80">
                  Quản Lý Đào Tạo
                </p>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-sand">Kho Khóa Huấn Luyện Số</h1>
                <p className="mt-1 text-xs sm:text-sm font-medium text-sand/90 hidden sm:block">Hệ thống quản lý và phân loại khóa huấn luyện chiến thuật</p>
              </div>
            </div>
            <div className="flex flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="secondary"
                className="flex-1 sm:flex-none bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 text-sand text-xs sm:text-sm px-3 py-2 justify-center"
                onClick={() => window.location.reload()}
              >
                <Activity className="mr-2 h-4 w-4" />
                Làm mới
              </Button>
              <Button
                className="flex-1 sm:flex-none bg-orange text-white hover:bg-orange/90 border-orange text-xs sm:text-sm px-3 py-2 justify-center"
                onClick={handleCreate}
              >
                <Plus className="mr-2 h-4 w-4" />
                Tạo khóa mới
              </Button>
            </div>
          </div>
        </div>

        <Card className="border-2 border-forest/10 bg-white shadow-lg p-3 sm:p-4 md:p-5">
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.2fr,auto] lg:items-end">
            <div className="relative">
              <label className="mb-2 flex items-start gap-2 text-sm font-semibold text-forest">
                <Search className="h-4 w-4 mt-0.5" />
                Tìm kiếm khóa huấn luyện
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm font-medium placeholder-gray-400 transition-all focus:border-forest focus:bg-white focus:outline-none"
                  placeholder="Nhập tên khóa hoặc mô tả..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="mb-2 flex items-start gap-2 text-sm font-semibold text-forest">
                <Filter className="h-4 w-4 mt-0.5" />
                Bộ lọc nhanh
              </label>
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2">
                <div className="flex items-center rounded-lg border-2 border-gray-200 bg-gray-50 p-1 w-full sm:w-auto overflow-x-auto">
                  {[
                    { key: "ALL", label: "Tất cả", icon: null },
                    { key: "FIRE", label: "Hỏa lực", icon: Crosshair },
                    { key: "PHYSICAL", label: "Thể lực", icon: Heart },
                    { key: "THEORY", label: "Lý thuyết", icon: GraduationCap },
                  ].map((item) => (
                    <button
                      key={item.key}
                      className={clsx(
                        "flex items-center gap-1.5 rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition-all whitespace-nowrap",
                        typeFilter === item.key
                          ? "bg-gradient-to-r from-forest to-olive text-white shadow-sm"
                          : "text-gray-600 hover:bg-white hover:text-forest"
                      )}
                      onClick={() => setTypeFilter(item.key as typeof typeFilter)}
                    >
                      {item.icon && <item.icon className="h-3.5 w-3.5" />}
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="hidden sm:block mx-1 h-8 w-px bg-gray-300" />

                <div className="flex items-center rounded-lg border-2 border-gray-200 bg-gray-50 p-1 w-full sm:w-auto">
                  {[
                    { key: "ALL", label: "Tất cả" },
                    { key: "REQ", label: "Bắt buộc" },
                    { key: "OPT", label: "Tùy chọn" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      className={clsx(
                        "rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition-all",
                        requiredFilter === item.key
                          ? "bg-orange text-white shadow-sm"
                          : "text-gray-600 hover:bg-white hover:text-orange"
                      )}
                      onClick={() => setRequiredFilter(item.key as typeof requiredFilter)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative overflow-hidden rounded-xl border border-forest/10 bg-white p-3 sm:p-4 md:p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-forest/10 p-2">
                  <BookOpen className="h-6 w-6 text-forest" />
                </div>
                <span className="text-xs font-semibold text-green-600">Hoạt động</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Tổng số khóa</p>
              <p className="text-xl sm:text-2xl font-bold text-forest">{courses.length}</p>
              <div className="mt-2 h-1 w-full rounded-full bg-gray-200">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-forest to-olive" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-red-200/30 bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-red-100 p-2">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <span className="text-xs font-semibold text-red-600">Quan trọng</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Khóa bắt buộc</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">{requiredCount}</p>
              <p className="mt-1 text-[10px] sm:text-xs text-gray-500">Phải hoàn thành</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-blue-200/30 bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-blue-600">Bổ sung</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Khóa tùy chọn</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{optionalCount}</p>
              <p className="mt-1 text-[10px] sm:text-xs text-gray-500">Nâng cao kỹ năng</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-orange-200/30 bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-orange-100 p-2">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-xs font-semibold text-orange-600">Đã lên lịch</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Tổng buổi học</p>
              <p className="text-xl sm:text-2xl font-bold text-orange-600">{sessions.length}</p>
              <p className="mt-1 text-[10px] sm:text-xs text-gray-500">Đang triển khai</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <Card className="border-2 border-border shadow-lg">
          <CourseTable
            courses={pagedCourses}
            onEdit={handleEdit}
            onDelete={handleDelete}
            sessionCountByCourse={sessionCountByCourse}
          />
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(filteredCourses.length / pageSize)}
            onPageChange={setPage}
            totalItems={filteredCourses.length}
            itemsPerPage={pageSize}
          />
        </Card>

          <div className="space-y-6">
            <Card
              className="bg-gradient-to-br from-forest to-olive text-white shadow-lg border-0"
              title={
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-sand" />
                  <span className="font-bold text-sand">Trung Tâm Điều Hành</span>
                </div>
              }
            >
              <div className="space-y-3">
                <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sand">
                    <AlertCircle className="h-4 w-4" />
                    Hướng dẫn triển khai
                  </h4>
                  <ul className="m-0 space-y-2 text-xs text-sand/90">
                    <li className="flex items-start gap-2">
                      <Target className="mt-0.5 h-3 w-3 text-orange" />
                      <span>Ưu tiên tạo đủ buổi cho các khóa bắt buộc</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="mt-0.5 h-3 w-3 text-orange" />
                      <span>Khóa bắn/nổ cần ghi rõ địa điểm an toàn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="mt-0.5 h-3 w-3 text-orange" />
                      <span>Cập nhật mô tả để dễ đánh giá</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="group relative overflow-hidden rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20">
                    <div className="flex items-center gap-2">
                      <Crosshair className="h-4 w-4 text-orange" />
                      <div>
                        <p className="text-xs font-semibold text-sand">Hỏa lực</p>
                        <p className="text-lg font-bold text-sand">{courses.filter((c) => c.type === "FIRE").length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-400" />
                      <div>
                        <p className="text-xs font-semibold text-sand">Thể lực</p>
                        <p className="text-lg font-bold text-sand">{courses.filter((c) => c.type === "PHYSICAL").length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-blue-400" />
                      <div>
                        <p className="text-xs font-semibold text-sand">Lý thuyết</p>
                        <p className="text-lg font-bold text-sand">{courses.filter((c) => c.type === "THEORY").length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-yellow-400" />
                      <div>
                        <p className="text-xs font-semibold text-sand">Buổi học</p>
                        <p className="text-lg font-bold text-sand">{sessions.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-sand/10 p-3 backdrop-blur-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-sand/80">Hiệu suất</p>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-sand">Tỷ lệ sử dụng</span>
                    <span className="text-lg font-bold text-orange">
                      {courses.length > 0 ? Math.round((sessions.length / courses.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange to-yellow-400"
                      style={{width: `${courses.length > 0 ? Math.min(100, (sessions.length / courses.length) * 100) : 0}%`}}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-orange-200/50 bg-gradient-to-br from-white to-orange-50/30 shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                <h3 className="font-bold text-forest">Thống kê nhanh</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-white/80 p-3">
                  <span className="text-sm font-medium text-gray-700">Khóa nhiều buổi nhất</span>
                  <span className="font-semibold text-forest">
                    {Object.entries(sessionCountByCourse).sort((a,b) => b[1] - a[1])[0]?.[1] || 0} buổi
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/80 p-3">
                  <span className="text-sm font-medium text-gray-700">Trung bình/khóa</span>
                  <span className="font-semibold text-forest">
                    {courses.length > 0 ? Math.round(sessions.length / courses.length) : 0} buổi
                  </span>
                </div>
                <button className="group flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-forest to-olive p-3 text-white transition-all hover:shadow-md">
                  <span className="text-sm font-medium">Xem báo cáo chi tiết</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseListPage;
