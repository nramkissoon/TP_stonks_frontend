
export const displayPercent = (num: number) => {
  if (num === null || num === undefined) return;
  return (num).toFixed(2) + '%'
}

export const displayCurrency = (num: number) => {
  if (num === null || num === undefined) return;
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

export const displayTimeEST = (num: number) => {
  if (num === null || num === undefined) return '';
  return new Date(num).toLocaleTimeString() + ' EST';
}