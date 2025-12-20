import { BsPatchQuestion } from 'react-icons/bs';
import { TSidebarItem } from './generateSidebarItems';
import { LuClipboardList } from 'react-icons/lu';
import { FcConferenceCall } from 'react-icons/fc';

const sidebarItems: TSidebarItem[] = [
    {
        key: 'client-list',
        label: 'Analytique',
        path: '',
        icon: '/icons/analtycs.png',
    },
    {
        key: 'users',
        label: 'Gestion des utilisateurs',
        path: 'users',
        icon: '/icons/users.png',
    },
    {
        key: 'administrators',
        label: 'Administrateurs',
        path: 'administrators',
        icon: <FcConferenceCall size={22} />,
    },
    {
        key: 'payment',
        label: 'Paiements',
        path: 'payment',
        icon: '/icons/earning.png',
    },
    // {
    //     key: 'settings',
    //     label: 'Paramètres',
    //     path: 'settings',
    //     icon: '/icons/setting.png',
    //     children: [
    //         {
    //             key: 'terms-and-condition',
    //             label: 'Conditions générales',
    //             path: 'terms-and-condition',
    //             icon: <LuClipboardList size={20} />,
    //         },
    //         {
    //             key: 'privacy-policy',
    //             label: 'Politique de confidentialité',
    //             path: 'privacy-policy',
    //             icon: <LuClipboardList size={20} />,
    //         },
    //         {
    //             key: 'faq',
    //             label: 'FAQ',
    //             path: 'faq',
    //             icon: <BsPatchQuestion size={20} />,
    //         },
    //     ],
    // },
];

export default sidebarItems;
