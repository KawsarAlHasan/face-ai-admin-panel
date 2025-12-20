import { Button, Form, Input, Modal } from "antd";

const AddCategoryModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            title={<span className="text-lg font-semibold">Add Category</span>}
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
            width={600}
            centered
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Category Name"
                    name="categoryName"
                    rules={[{ required: true, message: 'Please enter Category Name' }]}
                >
                    <Input placeholder="Enter Category Name" size="large" />
                </Form.Item>
                <Form.Item className=" flex items-center justify-end ">
                    <Button type="primary" htmlType="submit" size="large" style={{ width: 150, height: 40 }}>Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCategoryModal;