import { Alert, Space, Spin } from "antd";

const Loader = () => (
    <Space direction="horizontal" style={{ width: "100%", justifyContent: "center", background: "#ffffff" }}>
        <Spin size="large">
            <Alert message="Chargement" description="Création de la carte..." type="info" />{" "}
        </Spin>
    </Space>
);

export default Loader;
