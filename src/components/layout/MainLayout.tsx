import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';


const MainLayout: React.FC = () => {

    return (
        <div className={` grid grid-cols-12   `}>

            {/* side bar */}
            <div className='col-span-2 h-screen  overflow-x-hidden bg-[#F6F7F8]'>
                <Sidebar />
            </div>

            {/* main container with header */}
            <div className='col-span-10  h-[100vh] '>
                <div className=' ' >
                    <DashboardHeader />
                </div>

                <div className=' px-4 h-[calc(100vh-97px)]  '  >
                    <div className='h-full overflow-y-auto rounded-md  '>
                         <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
