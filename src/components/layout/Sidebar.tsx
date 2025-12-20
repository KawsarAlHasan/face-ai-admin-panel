import { ConfigProvider, Menu, MenuProps } from 'antd';
import { TSidebarItem } from '../../utils/generateSidebarItems';
import sidebarItems from '../../utils/sidebarItems';
import { Link, useLocation } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import { LogOut } from 'lucide-react';
import { signOutAdmin } from '../../api/api';

const Sidebar = () => {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    const handleLogout = () => {
        signOutAdmin();
    };

    const getIcon = (icon: ReactNode | string) => {
        if (typeof icon === 'string') {
            return <img src={icon} className="w-6" alt="icon" />;
        }
        return icon;
    };

    const sidebarItemsGenerator = (items: TSidebarItem[]): MenuProps['items'] => {
        return items.map((item) => {
            if (item.children) {
                return {
                    key: item.key,
                    icon: getIcon(item.icon),
                    label: item.label,
                    children: item.children.map((child) => ({
                        key: `/${child.path}`,
                        icon: getIcon(child.icon),
                        label: <Link to={`/${child.path}`}>{child.label}</Link>,
                    })),
                };
            }
            return {
                key: `/${item.path}`,
                icon: getIcon(item.icon),
                label: <Link to={`/${item.path}`}>{item.label}</Link>,
            };
        });
    };

    return (
        <div className="relative h-screen pt-5 w-full">
            <div className=" flex flex-col h-[100%] ">
                <Link to="/">
                    <div className="flex flex-col gap-3 items-center justify-center p-5 pt-0 pb-2">
                        <img src="/favicon.svg" alt="" className="h-32" />
                    </div>
                </Link>

                <div className="flex-1 overflow-y-auto w-full pb-12 ">
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: '#414446',
                            },
                            components: {
                                Menu: {
                                    itemActiveBg: '#a855f7',
                                    itemSelectedColor: '#fff',
                                    itemBorderRadius: '10px 10px 10px 10px' as any,
                                    itemHeight: 45,
                                    itemMarginBlock: 9,
                                    itemSelectedBg: '#a855f7',
                                },
                            },
                        }}
                    >
                        <Menu
                            theme="light"
                            mode="inline"
                            selectedKeys={[location.pathname]}
                            openKeys={openKeys}
                            onOpenChange={handleOpenChange}
                            items={sidebarItemsGenerator(sidebarItems)}
                            style={{ background: 'transparent' }}
                        />
                    </ConfigProvider>
                </div>

                <div className="py-3 ps-4 absolute bottom-0 w-full bg-[#F6F7F8]">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4  bg-white/15 
                          text-[#F44336]  font-semibold rounded-md transition"
                    >
                        <LogOut size={20} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
