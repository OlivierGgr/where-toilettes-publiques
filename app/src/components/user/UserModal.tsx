import { Modal } from "antd";
import farmerIcon from "../../assets/avatars/8840997891598811062-128.png";

type UserModalType = {
    isUserModalOpen: boolean
    setIsUserModalOpen: (arg: boolean) => void
}
export default function UserModal({ isUserModalOpen, setIsUserModalOpen }: UserModalType):JSX.Element {
    if (!isUserModalOpen) return <></>

    const handleOk = () => {
        setIsUserModalOpen(false)
    }
    
    console.log("pouet")
    return (
        <Modal
        title="Avatar"
        open={isUserModalOpen}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleOk}
        >
            <img src={farmerIcon} alt="logo" width="20%" style={{ paddingTop: "8%" }} />
        </Modal>
    )
}