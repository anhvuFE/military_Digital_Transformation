export interface Session {
  id: string;
  courseId: string;
  unitId: string;
  startTime: string;
  endTime: string;
  location: string;
  instructor: string;
  title?: string;
}
