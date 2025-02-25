// import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';  // Add styles for the calendar
import './activity-monitor.css'

export default function ActivityTracker() {
  const activityData = [
    { date: '2025-02-01', count: 1 },  // Activity on Feb 1
    { date: '2025-02-02', count: 0 },  // No activity on Feb 2
    { date: '2025-02-03', count: 1 },  // Activity on Feb 3
    { date: '2025-02-04', count: 1 },  // Activity on Feb 4
    { date: '2025-02-05', count: 0 },  // No activity on Feb 5
    { date: '2025-02-06', count: 1 },  // Activity on Feb 6
    { date: '2025-02-07', count: 0 },  // No activity on Feb 7
    { date: '2025-02-08', count: 1 },  // Activity on Feb 8
    { date: '2025-02-09', count: 0 },  // No activity on Feb 9
    { date: '2025-02-10', count: 2 },  // No activity on Feb 9
  ];
  const today = new Date();
  const start = new Date(today);
  start.setMonth(today.getMonth() - 1);
  

  console.log(today)
  console.log(start)

  return (
    <div className="activity-tracker w-[200px] h-[200px]">
      <CalendarHeatmap
        startDate={start}
        endDate={today}
        values={activityData.map(item => ({
          date: item.date,
          count: item.count
        }))}
        showWeekdayLabels={true}
        classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-scale-${value.count}`;
          }}
      />
    </div>
  );
}
