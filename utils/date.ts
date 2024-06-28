export function formatDate(dateString: string): string {
  // Parse the input date string
  const date = new Date(dateString);

  // Define options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  // Format the date using Intl.DateTimeFormat
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
