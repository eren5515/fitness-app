"use client";

import "./schedule-panel.scss";

type Item = {
  day: string;
  title: string;
  time: string;
  note?: string;
};

const items: Item[] = [
  { day: "Monday", title: "Stretch", time: "08:00", note: "20 Pieces" },
  { day: "Tuesday", title: "Back Stretch", time: "08:00", note: "10 Round" },
  { day: "Wednesday", title: "Yoga", time: "09:00", note: "20 min" }
];

export default function SchedulePanel() {
  return (
    <aside className="schedule">
      <div className="schedule__header">
        <h3>My Schedule</h3>
        <button className="schedule__viewAll">View All</button>
      </div>
      <ul className="schedule__list">
        {items.map((it) => (
          <li className="schedule__card" key={it.day}>
            <div className="schedule__row">
              <div className="schedule__thumb" />
              <div className="schedule__info">
                <div className="schedule__title">{it.title}</div>
                <div className="schedule__meta">
                  {it.day} • {it.time}
                </div>
              </div>
              {it.note ? <div className="schedule__badge">{it.note}</div> : null}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}


