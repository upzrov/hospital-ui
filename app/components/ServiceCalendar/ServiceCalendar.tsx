import './ServiceCalendar.scss'

import React, { useState } from 'react';

export default function ServiceCalendar({ slots, formatSlot, onSelectSlot }) {
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Функція групування масиву слотів по днях
    const groupSlotsByDay = (slotsList) => {
        if (!slotsList || !Array.isArray(slotsList)) return {};

        return slotsList.reduce((acc, slot) => {
            const date = new Date(slot.startAt);

            // Форматуємо день тижня (Mon, Tue...) та дату (13 May)
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
            const dateKey = date.toISOString().split('T')[0]; // Унікальний ключ для групи (YYYY-MM-DD)

            if (!acc[dateKey]) {
                acc[dateKey] = {
                    dayName,
                    dayDate,
                    items: [],
                };
            }

            acc[dateKey].items.push(slot);
            return acc;
        }, {});
    };

    const groupedSlots = groupSlotsByDay(slots);

    const handleSlotChange = (slot) => {
        setSelectedSlot(slot.startAt);
        if (onSelectSlot) {
            onSelectSlot(slot); // Передаємо обраний слот назад у батьківську форму
        }
    };

    return (
        <div className="service-calendar">
            {Object.entries(groupedSlots).map(([dateKey, dayData]) => (
                <div key={dateKey} className="service-calendar__column">
                    {/* Шапка дня тижня */}
                    <div className="service-calendar__header">
                        <span className="service-calendar__day-name">{dayData.dayName}</span>
                        <span className="service-calendar__day-date">{dayData.dayDate}</span>
                    </div>

                    {/* Список слотів під цим днем */}
                    <div className="service-calendar__slots">
                        {dayData.items.map((slot, index) => {
                            const isChecked = selectedSlot === slot.startAt;
                            return (
                                <label
                                    key={index}
                                    className={`service-calendar__chip ${isChecked ? 'service-calendar__chip--selected' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="calendar-slot"
                                        value={slot.startAt}
                                        checked={isChecked}
                                        onChange={() => handleSlotChange(slot)}
                                        className="visually-hidden" // Ховаємо стандартну радіо-кнопку
                                    />
                                    {/* Передаємо тільки startAt, щоб вивести чистий час, наприклад "7:00 am" */}
                                    {formatSlot ? formatSlot(slot.startAt) : slot.startAt}
                                </label>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}