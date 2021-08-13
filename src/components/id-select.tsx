import { Select } from "antd";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>; // 获取到select自带的所有类型

// extends Omit<SelectProps, "value" | "onChange" | "options"> 让自定义的组件可以接收select组件的其他类型
interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void; // 在往外传值得时候都转化成number
  defaultOptionName?: string; // 默认值（空值）
  options?: { name: string; id: number }[];
}

/**
 * value 可以传入多种类型的值
 * onChange只会回调 number|undefined 类型
 * 当 isNaN(Number(value)) 为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
