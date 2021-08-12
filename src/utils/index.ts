import { useEffect, useRef, useState } from "react";
export const isFalsy = (value: any) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 如果定义为object类型可能是function等各种
// { [key: string]: unknown } 限制其为键值对类型
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// 自定义hook
// 加载页面执行一次
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// 防抖(使用范型)
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完后再运行，只有最后一个timeout被执行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // 页面加载时：oldTitle = 旧title ‘Jira任务管理系统’
  // 加载后：oldTitle = 新title
  const oldTitle = useRef(document.title).current; // useRef 返回的ref对象在组件的整个生命周期内保持不变

  useEffect(() => {
    document.title = title;
  }, [title]);

  // 在页面卸载时被调用
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧title
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
