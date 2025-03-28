import { Loan } from "@/types";

export const loans: Loan[] = [
    {
        id: '1',
        title: 'Cristian',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates temporibus, magnam corporis eum deserunt natus autem minus numquam, ratione mollitia sequi amet doloremque nesciunt in eius tempora, voluptas quaerat dolor!',
        total: 200,
        months: 2,
        interest: 0.15, // 15%
        status: 'active',
        payments: [
            {
                id: '1',
                amount: 115,
                status: 'active'
            },
            {
                id: '2',
                amount: 115,
                status: "active"
            }
        ]

    },
    {
        id: '2',
        title: 'Khomatsu',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        total: 600.50,
        months: 12,
        interest: 0.15, // 15%
        status: 'completed',
        payments: [
            {
                id: '1',
                amount: 57.54,
                status: 'completed'
            },
            {
                id: '2',
                amount: 57.54,
                status: "completed"
            },
            {
                id: '3',
                amount: 57.54,
                status: "completed"
            },
            {
                id: '4',
                amount: 57.54,
                status: "completed"
            },
            {
                id: '5',
                amount: 57.54,
                status: "completed"
            },
            {
                id: '6',
                amount: 57.54,
                status: "completed"
            },
            {
                id: '7',
                amount: 57.54,
                status: "completed"
            },
            {
                id: '8',
                amount: 57.54,
                status: "completed"
            },
            {
                id: '9',
                amount: 57.54,
                status: "completed"
            },
            {
                id: '10',
                amount: 57.54,
                status: "completed"
            },
            {
                id: '11',
                amount: 57.54,
                status: "active"
            },
            {
                id: '12',
                amount: 57.54,
                status: "active"
            },

        ]

    }
]