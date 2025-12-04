export type CourseType = "FIRE" | "PHYSICAL" | "THEORY";

export interface Course {
  id: string;
  name: string;
  description?: string;
  type: CourseType;
  required: boolean;
}
