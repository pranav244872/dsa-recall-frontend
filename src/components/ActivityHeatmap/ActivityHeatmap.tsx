import { useState, useEffect } from 'react';
import ActivityCalendar, { type Activity } from 'react-activity-calendar';
import styles from './ActivityHeatmap.module.css';

// A more robust function to generate data for all days
const generateFakeData = (months: number): Activity[] => {
  const data: Activity[] = [];
  const today = new Date(); // Calculate the start date `months` ago
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth() - months,
    today.getDate(),
  );

  const currentDate = startDate; // Loop until the current date is past today

  while (currentDate <= today) {
    const dateString = currentDate.toISOString().split('T')[0]; // Randomly assign a count and level. We'll add 0s to ensure empty days are shown.
    const count = Math.random() < 0.2 ? 0 : Math.floor(Math.random() * 20) + 1; // 20% chance of 0 activity
    let level = 0;
    if (count > 0 && count <= 2) {
      level = 1;
    } else if (count > 2 && count <= 5) {
      level = 2;
    } else if (count > 5 && count <= 8) {
      level = 3;
    } else if (count > 8 && count <= 11) {
      level = 4;
    } else if (count > 11 && count <= 14) {
      level = 5;
    } else if (count > 14 && count <= 17) {
      level = 6;
    } else if (count > 17 && count <= 20) {
      level = 7;
    } else if (count > 20) {
      level = 8;
    }
    data.push({
      date: dateString,
      count,
      level,
    }); // Move to the next day

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

// ... (rest of the component remains the same)

const ActivityHeatmap = () => {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const MONTHS_TO_SHOW = 5; // It's better to show 6 months for a full heatmap view

  useEffect(() => {
    const fakeData = generateFakeData(MONTHS_TO_SHOW);
    setData(fakeData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className={styles.container}>Loading activity...</div>;
  }

  return (
    <div className={styles.container}>
      <ActivityCalendar
        data={data}
        colorScheme="dark"
        theme={{
          dark: [
            '#1a1a1a',
            '#2a3e5c',
            '#3b5a86',
            '#4c76b0',
            '#5d91da',
            '#6eacf4',
            '#7f98fe',
            '#90a4ff',
            '#a1b0ff',
            '#b2bcff',
          ],
        }}
        blockSize={12}
        blockMargin={4}
        fontSize={14}
        maxLevel={9} // Add this line
      />
    </div>
  );
};

export default ActivityHeatmap;
