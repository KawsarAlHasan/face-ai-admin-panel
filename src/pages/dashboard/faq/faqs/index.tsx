import { useState } from 'react';
import { GoQuestion } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import Swal from 'sweetalert2';
import { Button,Flex } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import AddFaqForm from './AddFaqForm';
import { faqData } from '../../../../demo-data/faq-data';
import { useParams } from 'react-router-dom';

const FAQ = () => {
    const [openAddModel, setOpenAddModel] = useState(false);
    const [modalData, setModalData] = useState<{ id: string; answer: string; question: string } | null>(null); 
    const { category } = useParams<{ category: string }>();
    const [faqInfo, setFaqInfo] = useState(faqData);

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            setFaqInfo((prev) => prev.filter((item) => item.id !== id));
            Swal.fire("Deleted!", "The FAQ has been deleted.", "success");
        }
    };

    return (
        <div className="">
            <Flex vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-2xl text-primary font-semibold">{category}'s FAQ</h1>
                </div>

                <div style={{ marginBottom: 10 }}>
                    <Button
                        icon={<AiOutlinePlus />}
                        onClick={() => setOpenAddModel(true)}
                        htmlType="submit"
                        style={{ height: 40 }}
                        type="primary"
                    >
                        Add FAQ
                    </Button>
                </div>
            </Flex>

            <div className="mt-5 pb-6 px-4 rounded-md">
                {faqInfo?.map((item, index) => (
                    <div key={index} className="flex justify-between items-start  py-4 px-4 rounded-lg bg-white mb-3 shadow-md border border-gray-100">
                        <GoQuestion color="#154d85" size={25} className="mt-3" />
                        <div className="flex-1">
                            <p className="text-base font-medium rounded-xl py-2 px-4 flex items-center gap-8">
                                <span className="flex-1">{item?.question}</span>
                            </p>
                            <div className="rounded-xl py-2 px-4 ">
                                <p className="text-[#919191] leading-6">{item?.answer}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-4">
                            <CiEdit
                                onClick={() => {
                                    setOpenAddModel(true);
                                    setModalData(item);
                                }}
                                className="text-2xl cursor-pointer text-[#154d85]"
                            />
                            <RxCross2
                                onClick={() => handleDelete(item.id)}
                                className="text-2xl cursor-pointer text-red-600"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <AddFaqForm
                setOpenAddModel={setOpenAddModel}
                openAddModel={openAddModel}
                modalData={modalData}
                setModalData={setModalData}
            />

        </div>
    );
};

export default FAQ;
