import { useEffect, useState } from "react";
export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// 自定义hook
// 加载页面执行一次
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

// 防抖
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完后再运行，只有最后一个timeout被执行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
