"use client";

import { useState } from "react";
import { Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import HeaderTitle from "../../../components/shared/HeaderTitle";
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import AddCategoryModal from "./AddCategoryModal";
import { useNavigate } from "react-router-dom";

const FAQCategoryPage = () => {
    const [open, setOpen] = useState(false); 
    const navigate = useNavigate();

    const dataSource = [
        { key: "1", categoryName: "General" },
        { key: "2", categoryName: "Payments" },
        { key: "3", categoryName: "Shipping" },
    ];

    const columns = [
        {
            title: "S.No.",
            dataIndex: "key",
            key: "key",
            render: (index: number) => index + 1,
            width: "10%",
        },
        {
            title: "Category Name",
            dataIndex: "categoryName",
            key: "categoryName",
            width: "60%",
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
                <div className="flex items-center gap-3">
                    <button
                        className=""
                        onClick={() =>navigate(`/faq/${record.categoryName}`)}
                    >
                        <MdOutlineRemoveRedEye size={20} color="#4b5563" />
                    </button>
                    <button
                        className=""
                        onClick={() => console.log("Add FAQ for:", record.categoryName)}
                    >
                        <FiEdit3 size={20} color="#ca8a04" />
                    </button>
                    <div className=" cursor-pointer ">
                        <MdDeleteOutline size={22} color="#ef4444" />
                    </div>
                </div>
            ),
            width: "30%",
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <HeaderTitle title="FAQ Category" />
                <button
                    className="flex items-center gap-2 text-white bg-[#a855f7] border-0 h-[45px] px-6 rounded font-medium"
                    onClick={() => setOpen(true)}
                >
                    <span>
                        <PlusOutlined size={20} />
                    </span>
                    <span>Add FAQ Category</span>
                </button>
            </div>

            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            /> 
            <AddCategoryModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default FAQCategoryPage;
