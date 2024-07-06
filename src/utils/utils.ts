export const formatAMPM = (date: string) => {
  const localeDate = new Date(date);
  let hours = localeDate.getHours();
  const minutes = localeDate.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
};

export const toTop = (container: HTMLDivElement | null) => {
  if (container) container.scrollTop = container.scrollHeight;
};
