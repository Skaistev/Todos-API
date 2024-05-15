const mockPool = {
    query: jest.fn().mockImplementation((query, values) => {
        if (query.startsWith('SELECT')) {
            return Promise.resolve({
                rows: [
                    {
                        "id": 1,
                        "amount": 100,
                        "user_from": 1,
                        "user_to": 2
                    },
                    {
                        "id": 2,
                        "amount": 100,
                        "user_from": 1,
                        "user_to": 2
                    },
                    {
                        "id": 3,
                        "amount": 100,
                        "user_from": 2,
                        "user_to": 2
                    },
                    {
                        "id": 4,
                        "amount": 100,
                        "user_from": 2,
                        "user_to": 2
                    },
                    {
                        "id": 5,
                        "amount": 100,
                        "user_from": 2,
                        "user_to": 2
                    },
                    {
                        "id": 6,
                        "amount": 100,
                        "user_from": 2,
                        "user_to": 2
                    },
                    {
                        "id": 7,
                        "amount": 100,
                        "user_from": 2,
                        "user_to": 2
                    },
                    {
                        "id": 8,
                        "amount": 100,
                        "user_from": 2,
                        "user_to": 2
                    }
                    
                ]
            });
        }
        // Add other conditions for different types of queries as needed
    })
};

module.exports = mockPool;