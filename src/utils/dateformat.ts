const eventCardDateFormat = (start_date: string, end_date: string = "") => {
  const daysOfWeek = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
  const months = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  const formatDate = (dateStr: string, includeYear = true) => {
    const date = new Date(dateStr);
    const day = daysOfWeek[date.getDay()];
    const dayNum = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return includeYear
      ? `${day} ${dayNum} ${month} ${year}`
      : `${day} ${dayNum} ${month}`;
  };

  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD" format for today
  const startDateStr = start_date.split("T")[0]; // "YYYY-MM-DD" format for start_date

  if (startDateStr === today && end_date) {
    // Today and end_date exists
    return `วันนี้ - ${formatDate(end_date)}`;
  } else if (end_date) {
    const start = new Date(start_date);
    const end = new Date(end_date);

    if (
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth()
    ) {
      // Same month and year for start and end date
      return `${formatDate(start_date, false)} - ${formatDate(end_date)}`;
    } else if (start.getFullYear() === end.getFullYear()) {
      // Same year but different months
      return `${formatDate(start_date, false)} - ${formatDate(end_date)}`;
    } else {
      // Different years
      return `${formatDate(start_date)} - ${formatDate(end_date)}`;
    }
  } else {
    // Only start_date exists
    return formatDate(start_date);
  }
};

export { eventCardDateFormat };
