export const formatDate = (date) => {
  const dateOb = new Date(date);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return dateOb.toLocaleDateString('en-US', options);
};
