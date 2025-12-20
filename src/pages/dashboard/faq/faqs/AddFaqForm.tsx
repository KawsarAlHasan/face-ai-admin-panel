import { Form, Input, Modal } from "antd";
import { useEffect } from "react";

const AddFaqForm = ({ setModalData, modalData, openAddModel, setOpenAddModel }: { setModalData: any, modalData: any, openAddModel: any, setOpenAddModel: any}) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (modalData) {
            form.setFieldsValue({ title: modalData?.question, description: modalData?.answer })
        }
    }, [modalData])

    return (
        <Modal
            centered
            open={openAddModel}
            onCancel={() => {
                setOpenAddModel(false)
                setModalData(null)
                form.resetFields()
            }}
            width={500}
            footer={false}
        >
            <div className="">
                <h1
                    className=" text-[20px] font-medium"
                    style={{ marginBottom: "12px" }}
                >
                    {modalData ? "Update FAQ" : "Add FAQ"}
                </h1>
                <Form  form={form} layout="vertical">
                    <Form.Item name="title" style={{ marginBottom: "16px" }} label={<p style={{ display: "block" }}>
                        Question
                    </p>}>

                        <Input
                            type="Text"
                            placeholder="Enter Question"
                            style={{
                                border: "1px solid #E0E4EC",
                                padding: "10px",
                                height: "52px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                                width: "100%",
                            }}

                        />
                    </Form.Item>
                    <Form.Item name="description" style={{ marginBottom: "16px" }} label={<p style={{ display: "block" }}>
                        Answer
                    </p>}>

                        <Input.TextArea
                            placeholder="Enter answer"
                            style={{
                                border: "1px solid #E0E4EC",
                                padding: "10px",
                                height: "152px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                                width: "100%",
                                resize: "none",
                            }}
                        />
                    </Form.Item>
                    <Form.Item className=" text-end">
                        <button type="submit" className="bg-primary text-white w-[120px] h-[42px] rounded-lg">
                            Submit
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default AddFaqForm;