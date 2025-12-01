import { useMemo, useState } from "react";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { useTrainingStore } from "@/store/trainingStore";
import ReportFilterBar from "../components/ReportFilterBar";
import ReportTable from "../components/ReportTable";
import type { ReportFilter } from "@/types/report";
import { FileText, Download, TrendingUp, Users, AlertTriangle, Shield, Activity, Calendar, Filter, BarChart3, PieChart, Target, Award, Zap, ChevronRight, FileDown, Printer, CheckCircle, XCircle, Clock } from "lucide-react";

const defaultFilter: ReportFilter = {
  from: "2024-04-01",
  to: "2024-04-30",
};

function ReportPage() {
  const units = useTrainingStore((s) => s.units);
  const getReport = useTrainingStore((s) => s.getReport);
  const [filter, setFilter] = useState<ReportFilter>(defaultFilter);

  const rows = useMemo(() => getReport(filter), [getReport, filter]);

  const totals = useMemo(() => {
    const totalSessions = rows.reduce((sum, r) => sum + r.totalSessions, 0);
    const avgCompletion =
      rows.length > 0 ? Math.round(rows.reduce((sum, r) => sum + r.completionRate, 0) / rows.length) : 0;
    const pending = rows.reduce((sum, r) => sum + r.pendingSoldiers, 0);
    return { totalSessions, avgCompletion, pending };
  }, [rows]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      <div className="space-y-6 p-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest via-olive to-moss p-8 text-sand shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange/10 blur-2xl" />

          <div className="relative">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                  <FileText className="h-8 w-8 text-sand" />
                </div>
                <div>
                  <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-sand/80">
                    <span className="h-1 w-8 rounded-full bg-orange" />
                    Trung tâm Phân tích
                  </p>
                  <h1 className="mb-2 text-3xl font-bold text-sand">Báo Cáo Chiến Lược Huấn Luyện</h1>
                  <p className="text-sm font-medium text-sand/90">Phân tích hiệu quả và đánh giá chất lượng đào tạo toàn quân</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 text-sand"
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Xuất CSV
                </Button>
                <Button
                  className="bg-orange text-white hover:bg-orange/90 border-orange"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Xuất PDF
                </Button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sand/70">Tổng buổi</p>
                    <p className="text-2xl font-bold text-sand">{totals.totalSessions}</p>
                  </div>
                  <div className="rounded-lg bg-white/20 p-2">
                    <Calendar className="h-5 w-5 text-sand" />
                  </div>
                </div>
                <div className="mt-2 h-1 w-full rounded-full bg-white/20">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-orange to-yellow-400" />
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sand/70">Hoàn thành TB</p>
                    <p className="text-2xl font-bold text-sand">{totals.avgCompletion}%</p>
                  </div>
                  <div className="rounded-lg bg-white/20 p-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                </div>
                <div className="mt-2 h-1 w-full rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600" style={{width: `${totals.avgCompletion}%`}} />
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sand/70">Chưa đủ</p>
                    <p className="text-2xl font-bold text-sand">{totals.pending}</p>
                  </div>
                  <div className="rounded-lg bg-white/20 p-2">
                    <AlertTriangle className="h-5 w-5 text-orange" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-sand/70">Quân nhân cần bổ sung</p>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sand/70">Đơn vị</p>
                    <p className="text-2xl font-bold text-sand">{rows.length}</p>
                  </div>
                  <div className="rounded-lg bg-white/20 p-2">
                    <Users className="h-5 w-5 text-sand" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-sand/70">Đang theo dõi</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.7fr,1.3fr]">
          <div className="space-y-6">
            <Card className="border-2 border-forest/10 bg-white shadow-lg">
              <div className="mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-forest" />
                <h3 className="font-bold text-forest">Bộ Lọc Báo Cáo</h3>
              </div>
              <ReportFilterBar units={units} filter={filter} onChange={setFilter} />
            </Card>

            <Card
              className="bg-gradient-to-br from-forest to-olive text-white shadow-lg border-0"
              title={
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-sand" />
                  <span className="font-bold text-sand">Thống Kê Nhanh</span>
                </div>
              }
            >
              <div className="space-y-3">
                <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sand">
                    <Target className="h-4 w-4" />
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
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sand">
                    <AlertTriangle className="h-4 w-4" />
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

            <Card className="border-2 border-orange-200/50 bg-gradient-to-br from-white to-orange-50/30 shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-orange-600" />
                <h3 className="font-bold text-forest">Phân bố kết quả</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Hoàn thành tốt</span>
                  </div>
                  <span className="font-bold text-green-700">
                    {rows.filter(r => r.completionRate >= 80).length}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">Đang tiến hành</span>
                  </div>
                  <span className="font-bold text-orange-700">
                    {rows.filter(r => r.completionRate >= 50 && r.completionRate < 80).length}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-700">Cần hỗ trợ</span>
                  </div>
                  <span className="font-bold text-red-700">
                    {rows.filter(r => r.completionRate < 50).length}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="border-2 border-border shadow-lg">
            <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-forest" />
                <h2 className="text-lg font-bold text-forest">Báo Cáo Chi Tiết Theo Đơn Vị</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  <Activity className="h-3 w-3" />
                  Đang cập nhật
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  <Calendar className="h-3 w-3" />
                  {filter.from} - {filter.to}
                </span>
              </div>
            </div>
            <div className="overflow-auto">
              <ReportTable rows={rows} />
            </div>
          </Card>
        </div>

        <div className="mt-6 rounded-xl border-2 border-forest/20 bg-gradient-to-r from-green-50 to-orange-50/30 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-forest/10 p-2">
              <Zap className="h-6 w-6 text-forest" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 font-bold text-forest">Khuyến nghị chiến lược</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-white/80 p-3">
                  <p className="mb-1 text-xs font-semibold uppercase text-gray-600">Tăng cường</p>
                  <p className="text-sm text-gray-700">
                    Tập trung hỗ trợ {rows.filter(r => r.completionRate < 50).length} đơn vị yếu
                  </p>
                </div>
                <div className="rounded-lg bg-white/80 p-3">
                  <p className="mb-1 text-xs font-semibold uppercase text-gray-600">Duy trì</p>
                  <p className="text-sm text-gray-700">
                    Giữ vững {rows.filter(r => r.completionRate >= 80).length} đơn vị xuất sắc
                  </p>
                </div>
                <div className="rounded-lg bg-white/80 p-3">
                  <p className="mb-1 text-xs font-semibold uppercase text-gray-600">Mục tiêu</p>
                  <p className="text-sm text-gray-700">
                    Đạt 90% hoàn thành toàn quân
                  </p>
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
