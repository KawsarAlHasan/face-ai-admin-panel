export interface User {
    id: string;
    serialId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    totalScans: number;
    subscription: 'basic' | 'medium' | 'unlimited' | 'premium';
    status: 'active' | 'blocked';
}

export interface Scan {
    id: string;
    version: string;
    date: string;
    status: string;
    score: number;
    improvement: number;
}

export const userData: User[] = [
    {
        id: '1',
        serialId: '#123',
        fullName: 'Kathryn Murp',
        email: 'brickety@slit.com',
        phoneNumber: '(201) 555-0124',
        totalScans: 3,
        subscription: 'basic',
        status: 'active',
    },
    {
        id: '2',
        serialId: '#123',
        fullName: 'Devon Lane',
        email: 'calves@glzm.com',
        phoneNumber: '(216) 555-0114',
        totalScans: 5,
        subscription: 'medium',
        status: 'active',
    },
    {
        id: '3',
        serialId: '#123',
        fullName: 'Foysal Rahman',
        email: 'qanats@gmail.com',
        phoneNumber: '(316) 555-0116',
        totalScans: 10,
        subscription: 'unlimited',
        status: 'active',
    },
    {
        id: '4',
        serialId: '#123',
        fullName: 'Hart Danang',
        email: 'xterns@gmail.com',
        phoneNumber: '(407) 555-0101',
        totalScans: 13,
        subscription: 'medium',
        status: 'blocked',
    },
    {
        id: '5',
        serialId: '#123',
        fullName: 'Floyd Miss',
        email: 'xterns@gmail.com',
        phoneNumber: '(305) 555-0125',
        totalScans: 5,
        subscription: 'medium',
        status: 'active',
    },
    {
        id: '6',
        serialId: '#123',
        fullName: 'Eleanor Pena',
        email: 'xterns@gmail.com',
        phoneNumber: '(704) 555-0127',
        totalScans: 5,
        subscription: 'medium',
        status: 'active',
    },
    {
        id: '7',
        serialId: '#123',
        fullName: 'Devon Lane',
        email: 'xterns@gmail.com',
        phoneNumber: '(218) 555-0114',
        totalScans: 10,
        subscription: 'medium',
        status: 'active',
    },
    {
        id: '8',
        serialId: '#123',
        fullName: 'Hart Danang',
        email: 'xterns@gmail.com',
        phoneNumber: '(270) 555-0117',
        totalScans: 5,
        subscription: 'basic',
        status: 'active',
    },
    {
        id: '9',
        serialId: '#123',
        fullName: 'Devon Lane',
        email: 'xterns@gmail.com',
        phoneNumber: '(207) 555-0119',
        totalScans: 3,
        subscription: 'premium',
        status: 'active',
    },
    {
        id: '10',
        serialId: '#123',
        fullName: 'Hart Danang',
        email: 'xterns@gmail.com',
        phoneNumber: '(225) 555-0119',
        totalScans: 5,
        subscription: 'premium',
        status: 'active',
    },
];

export const scansData: Scan[] = [
    {
        id: '1',
        version: 'B.2',
        date: 'Nov 19, 2024',
        status: 'Analysis completed',
        score: 8.0,
        improvement: 8,
    },
    {
        id: '2',
        version: 'B.2',
        date: 'Nov 19, 2024',
        status: 'Analysis completed',
        score: 8.0,
        improvement: 8,
    },
    {
        id: '3',
        version: 'B.2',
        date: 'Nov 19, 2024',
        status: 'Analysis completed',
        score: 8.0,
        improvement: 8,
    },
    {
        id: '4',
        version: 'B.2',
        date: 'Nov 19, 2024',
        status: 'Analysis completed',
        score: 8.0,
        improvement: 8,
    },
    {
        id: '5',
        version: 'B.2',
        date: 'Nov 19, 2024',
        status: 'Analysis completed',
        score: 8.0,
        improvement: 8,
    },
    {
        id: '6',
        version: 'B.2',
        date: 'Nov 19, 2024',
        status: 'Analysis completed',
        score: 8.0,
        improvement: 8,
    },
    {
        id: '7',
        version: 'B.2',
        date: 'Nov 19, 2024',
        status: 'Analysis completed',
        score: 8.0,
        improvement: 8,
    },
];
