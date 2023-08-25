

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const currentDate = new Date();
  const diffInDays = Math.floor(
    (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) {
    const formattedTime = formatTime(date);
    return `Сегодня, ${formattedTime} i-GMT+3`;
  } else {
    // Handle formatting for dates that are not today (e.g., display the full date)
    return date.toLocaleString('ru-RU', {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Europe/Moscow',
    });
  }
};

const formatTime = (date: Date) => {
  return date.toLocaleString('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Moscow',
  });
};
