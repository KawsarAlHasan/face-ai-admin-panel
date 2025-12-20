import { FiBell } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BASE_URL, useAdminProfile } from '../../api/api';
import { FaRegUserCircle } from 'react-icons/fa';

export default function DashboardHeader() {
    const { adminProfile, isLoading, isError, error, refetch } = useAdminProfile();

    console.log(adminProfile, 'adminProfile');

    return (
        <div className="p-3.5">
            <div className="bg-overlay rounded-lg  border-b border-gray-200 px-4 sm:px-6 py-3 ">
                <div className="flex items-center justify-between gap-4">
                    {/* Left section - Greeting */}
                    <div>
                        <h1 className="text-xl sm:text-3xl text-[#425464]">
                            {/* {keyItem.toLowerCase() === "profile" ? keyItem.charAt(0).toUpperCase() + keyItem.slice(1) : keyItem} */}
                        </h1>
                    </div>

                    {/* Right section - Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Notifications */}
                        {/* <Link to="/notification">
                            <button className="relative p-2 text-[#223047] hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                <FiBell className="h-6 w-6" />
                                <span className="absolute -top-1 -right-0 flex items-center justify-center bg-primary text-white text-xs font-semibold rounded-full w-6 h-6 shadow-md border-2 border-white">
                                    2
                                </span>
                            </button>
                        </Link> */}
                        {/* Profile */}
                        <Link to="/profile">
                            <div className="flex items-center space-x-3">
                                {adminProfile?.user?.profile_picture ? (
                                    <img
                                        src={BASE_URL + adminProfile?.user?.profile_picture}
                                        alt="Profile"
                                        className="w-9 h-9 rounded-full object-cover cursor-pointer"
                                    />
                                ) : (
                                    <FaRegUserCircle className="w-9 h-9 rounded-full object-cover cursor-pointer" />
                                )}

                                <div className="flex flex-col">
                                    <span className="text-sm sm:text-base font-semibold text-gray-900">
                                        {adminProfile?.user?.full_name}
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-400">
                                        {adminProfile?.user?.is_superuser ? 'Super Administrateur' : 'Administrateur'}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
