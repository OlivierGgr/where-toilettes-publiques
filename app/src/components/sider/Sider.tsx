import { Layout, Menu, MenuProps, Slider } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { adaptMapSizeOnSiderCollapse } from "../../utils";
import ToiletLogo from "../../assets/logo/toiletLogo.svg";
import { FilterOutlined, SwapOutlined } from "@ant-design/icons";
import { BoolFilters } from "./filters/Filters";
import { getItem, filtersSource } from "./filters/filtersUtils";
import "./sider.css";
import { SliderMarks } from "antd/es/slider";

import farmerIcon from "../../assets/avatars/8840997891598811062-128.png"

const { Sider: AntdSider } = Layout;

export type FilterProps = { isFavorites?: boolean | undefined; isOpen?: boolean | undefined };

type SiderProps = {
    filters: FilterProps;
    setFilters: Dispatch<SetStateAction<{ isFavorites?: boolean | undefined; isOpen?: boolean | undefined }>>;
    searchDistance: number;
    setSearchDistance: (arg: number) => void;
};

const Sider = ({ filters, setFilters, searchDistance, setSearchDistance }: SiderProps): JSX.Element => {
    const [collapsed, setCollapsed] = useState(false);

    const marks: SliderMarks = {
        50: "50m",
        300: "300m",
        600: "600m",
    };

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
        getItem("Distance", "sub2", <SwapOutlined />, [
            getItem(
                <Slider
                    min={0}
                    max={600}
                    step={50}
                    marks={marks}
                    style={{ marginLeft: "5%", marginRight: "15%" }}
                    value={searchDistance}
                    onChange={(value) => setSearchDistance(value)}
                />,
                "distanceSlider"
            ),
        ]),
    ];

    return (
        <AntdSider
            style={{ backgroundColor: "#fff", borderRight: "1px solid #002140"}}
            breakpoint="lg"
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed) => {
                setCollapsed(collapsed);
                adaptMapSizeOnSiderCollapse(collapsed);
            }}
        >
                <div>
                    <img src={ToiletLogo} alt="logo" width={"20%"} style={{ paddingTop: "8%" }} />

                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={["4"]}
                        onClick={(e) => console.log(e)}
                        items={items}
                    />
                </div>
        </AntdSider>
    );
};

export default Sider;
