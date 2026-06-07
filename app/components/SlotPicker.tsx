import { useEffect, useState } from "react";
import { getAvailableSlots } from "~/api";
import "~/styles/components/SlotPicker.scss";
import type { AvailableSlot } from "~/types/appointment";

interface SlotPickerProps {
  doctorId: number;
  serviceId: number;
  onSelect: (startAt: string) => void;
  disabled?: boolean;
}

export function SlotPicker({
  doctorId,
  serviceId,
  onSelect,
  disabled,
}: SlotPickerProps) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // Default to tomorrow
    return d.toISOString().split("T")[0];
  });

  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Generate next 14 days
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // Starting from tomorrow
    return d;
  });

  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);
      try {
        const availableSlots = await getAvailableSlots({
          doctorId,
          serviceId,
          date: new Date(selectedDate),
        });
        setSlots(availableSlots);
      } catch (error) {
        console.error("Failed to fetch slots", error);
        setSlots([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSlots();
  }, [doctorId, serviceId, selectedDate]);

  function formatSlot(startAt: string, endAt: string) {
    const start = new Date(startAt);
    const end = new Date(endAt);
    const pad = (n: number) => n.toString().padStart(2, "0");

    const startTime = `${pad(start.getUTCHours())}:${pad(start.getUTCMinutes())}`;
    const endTime = `${pad(end.getUTCHours())}:${pad(end.getUTCMinutes())}`;

    return `${startTime} - ${endTime}`;
  }

  const handleSlotChange = (startAt: string) => {
    setSelectedSlot(startAt);
    onSelect(startAt);
  };

  const handleDateChange = (dateIso: string) => {
    setSelectedDate(dateIso);
    setSelectedSlot(null);
    onSelect("");
  };

  const morningSlots = slots.filter((slot) => {
    const hour = new Date(slot.startAt).getUTCHours();
    return hour < 12;
  });

  const afternoonSlots = slots.filter((slot) => {
    const hour = new Date(slot.startAt).getUTCHours();
    return hour >= 12 && hour < 17;
  });

  const eveningSlots = slots.filter((slot) => {
    const hour = new Date(slot.startAt).getUTCHours();
    return hour >= 17;
  });

  const renderSlotSection = (title: string, slotList: AvailableSlot[]) => {
    return (
      <div className="slot-picker__section">
        <h4>{title}</h4>
        <div className="slots-list">
          {slotList.length > 0 ? (
            slotList.map((slot) => (
              <label key={slot.startAt} className="slot-item">
                <input
                  type="radio"
                  name="slot"
                  value={slot.startAt}
                  checked={selectedSlot === slot.startAt}
                  disabled={disabled}
                  onChange={() => handleSlotChange(slot.startAt)}
                />
                {formatSlot(slot.startAt, slot.endAt)}
              </label>
            ))
          ) : (
            <p className="slot-picker__no-slots">—</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="slot-picker">
      <div className="slot-picker__dates-row">
        {days.map((day) => {
          const iso = day.toISOString().split("T")[0];
          const isSelected = iso === selectedDate;
          const dayName = day.toLocaleDateString("uk-UA", { weekday: "short" });
          const dayNum = day.getDate();
          const monthName = day.toLocaleDateString("uk-UA", { month: "short" });

          return (
            <button
              key={iso}
              type="button"
              className={`date-chip ${isSelected ? "selected" : ""}`}
              onClick={() => handleDateChange(iso)}
              disabled={disabled}
            >
              <span className="date-chip__weekday">{dayName}</span>
              <span className="date-chip__day">{dayNum}</span>
              <span className="date-chip__month">{monthName}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <p className="slot-picker__loading">Завантаження слотів...</p>
      ) : (
        <div className="slot-picker__slots">
          {slots.length > 0 ? (
            <>
              {renderSlotSection("Ранок", morningSlots)}
              {renderSlotSection("День", afternoonSlots)}
              {renderSlotSection("Вечір", eveningSlots)}
            </>
          ) : (
            <p className="slot-picker__empty">
              Немає доступних слотів на цю дату
            </p>
          )}
        </div>
      )}
    </div>
  );
}
