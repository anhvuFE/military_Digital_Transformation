import type { ReportFilter, ReportRow } from "@/types/report";

export async function getReport(_filter: ReportFilter): Promise<ReportRow[]> {
  throw new Error("Mock only");
}
