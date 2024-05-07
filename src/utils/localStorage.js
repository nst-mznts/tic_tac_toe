export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key, defaultValue) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  } catch (error) {
    return defaultValue;
  }
};
