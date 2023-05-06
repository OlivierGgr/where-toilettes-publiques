import { Layout, Menu, MenuProps } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { adaptMapSizeOnSiderCollapse } from "../../utils";
import ToiletLogo from "../../assets/logo/toiletLogo.svg";
import { FilterOutlined } from "@ant-design/icons";
import { BoolFilters } from "./filters/Filters";
import { getItem, filtersSource } from "./filters/filtersUtils";
import "./sider.css";

const { Sider: AntdSider } = Layout;

export type FilterProps = { isFavorites?: boolean | undefined; isOpen?: boolean | undefined };

type SiderProps = {
    filters: FilterProps;
    setFilters: Dispatch<SetStateAction<{ isFavorites?: boolean | undefined; isOpen?: boolean | undefined }>>;
};

const Sider = ({ filters, setFilters }: SiderProps): JSX.Element => {
    const [collapsed, setCollapsed] = useState(false);

    const handleFiltersChange = (key: string, value: boolean) => {
        setFilters((old) => ({ ...old, [key]: value }));
    };

    const items: MenuProps["items"] = [
        getItem(
            "Filtres",
            "sub1",
            <FilterOutlined />,
            filtersSource.map((f: any) =>
                getItem(
                    f.label,
                    f.key,
                    <BoolFilters
                        filter={filters[f.key as keyof FilterProps]}
                        onChange={() => handleFiltersChange(f.key, !filters[f.key as keyof FilterProps])}
                    />
                )
            )
        ),
    ];

    return (
        <AntdSider
            style={{ backgroundColor: "#fff", borderRight: "1px solid #002140" }}
            breakpoint="lg"
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed) => {
                setCollapsed(collapsed);
                adaptMapSizeOnSiderCollapse(collapsed);
            }}
        >
            <img src={ToiletLogo} alt="Logo" width={"20%"} style={{ paddingTop: "8%" }} />

            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={["4"]}
                onClick={(e) => console.log(e)}
                items={items}
            />
        </AntdSider>
    );
};

export default Sider;
