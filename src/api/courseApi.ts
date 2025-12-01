import type { Course } from "@/types/course";

export async function listCourses(): Promise<Course[]> {
  throw new Error("Mock only");
}

export async function createCourse(payload: Omit<Course, "id">): Promise<Course> {
  console.info(payload);
  throw new Error("Mock only");
}
