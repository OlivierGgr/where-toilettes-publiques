import { Checkbox } from "antd";

export const BoolFilters = ({
    filter,
    onChange,
}: {
    filter: boolean | undefined;
    onChange: () => void;
}): JSX.Element => {
    return <Checkbox defaultChecked={filter} onChange={onChange} />;
};
