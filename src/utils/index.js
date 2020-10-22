// sorting
export const ascendingAlphabetic = (items) =>
  items?.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

export const descendingAlphabetic = (items) =>
  items?.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) {
      return 1;
    }
    if (fa > fb) {
      return -1;
    }
    return 0;
  });

export const ascendingAbv = (items) =>
  items?.sort((a, b) => {
    let fa = a.abv,
      fb = b.abv;

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

export const descendingAbv = (items) =>
  items?.sort((a, b) => {
    let fa = a.abv,
      fb = b.abv;

    if (fa < fb) {
      return 1;
    }
    if (fa > fb) {
      return -1;
    }
    return 0;
  });

export const saveItmes = (key, items) => {
  const currentTime = new Date();
  localStorage.setItem(key, JSON.stringify(items));
  localStorage.setItem(`${key}_created_at`, currentTime);
};

export const getDiffDays = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getItems = (key, exp) => {
  const currentTime = new Date();
  const expDate = localStorage.getItem(`${key}_created_at`);
  const diffDays = getDiffDays(expDate, currentTime);
  const items = localStorage.getItem(key);
  if (diffDays > exp) {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_created-at`);
    return [];
  } else return JSON.parse(items);
};