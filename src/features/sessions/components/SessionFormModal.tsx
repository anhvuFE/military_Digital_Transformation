import { FormEvent, useState } from "react";
import type { Session } from "@/types/session";
import type { Course } from "@/types/course";
import type { Unit } from "@/types/unit";
import Button from "@/components/common/Button";
import Select from "@/components/common/Select";
import DateTimePicker from "@/components/common/DateTimePicker";

interface Props {
  initial?: Session;
  courses: Course[];
  units: Unit[];
  onSubmit: (payload: Omit<Session, "id">) => void;
  onCancel?: () => void;
}

function SessionFormModal({ initial, courses, units, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Session, "id">>({
    courseId: initial?.courseId ?? courses[0]?.id ?? "",
    unitId: initial?.unitId ?? units[0]?.id ?? "",
    startTime: initial?.startTime ?? "",
    endTime: initial?.endTime ?? "",
    location: initial?.location ?? "",
    instructor: initial?.instructor ?? "",
    title: initial?.title ?? "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
      <div className="grid gap-3 sm:gap-4">
        <div>
          <label>Khóa huấn luyện</label>
        <Select
          value={form.courseId}
          onChange={(value) => setForm({ ...form, courseId: value ?? courses[0]?.id ?? "" })}
          options={courses.map(course => ({ value: course.id, label: course.name }))}
          placeholder="Chọn khóa huấn luyện"
        />
        </div>
        <div>
          <label>Đơn vị</label>
        <Select
          value={form.unitId}
          onChange={(value) => setForm({ ...form, unitId: value ?? units[0]?.id ?? "" })}
          options={units.map(unit => ({ value: unit.id, label: unit.name }))}
          placeholder="Chọn đơn vị"
        />
        </div>
        <div>
          <label>Tiêu đề buổi</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label>Bắt đầu</label>
            <DateTimePicker
              value={form.startTime}
              onChange={(value) => setForm({ ...form, startTime: value })}
              placeholder="Chọn ngày giờ bắt đầu"
            />
          </div>
          <div>
            <label>Kết thúc</label>
            <DateTimePicker
              value={form.endTime}
              onChange={(value) => setForm({ ...form, endTime: value })}
              placeholder="Chọn ngày giờ kết thúc"
            />
          </div>
        </div>
        <div>
          <label>Địa điểm</label>
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        </div>
        <div>
          <label>Giảng viên</label>
          <input value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
        <Button
          type="button"
          variant="secondary"
          className="flex-1 text-center justify-center"
          onClick={onCancel}
        >
          Huỷ
        </Button>
        <Button
          type="submit"
          className="flex-1 text-center justify-center"
        >
          {initial ? "Cập nhật" : "Lưu"}
        </Button>
      </div>
    </form>
  );
}

export default SessionFormModal;
