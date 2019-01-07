import { TokenTreeNode } from '@/interfaces';

const FAKE_API_DATA_1: TokenTreeNode = {
    "children": [
        {
            "children": [
                {
                    "content": "peace",
                    "id": 63765,
                    "label": "Token",
                    "strength": 2,
                },
                {
                    "content": "books",
                    "id": 63767,
                    "label": "Token",
                    "strength": 1,
                }
            ],
            "content": "the",
            "id": 63764,
            "label": "Token",
            "strength": 1,
        },
        {
            "children": [
                {
                    "content": "shop",
                    "id": 63732,
                    "label": "Token",
                    "strength": 1,
                },
                {
                    "content": "bar",
                    "id": 63782,
                    "label": "Token",
                    "strength": 1,
                }
            ],
            "content": "a",
            "id": 63774,
            "label": "Token",
            "strength": 1,
        }
    ],
    "content": "keep",
    "id": 63762,
    "label": "Token",
    "strength": 1,
};


// Note that these have different IDs, but they should be identified by their
// token value, so the ID differences should not matter.
const FAKE_API_DATA_2: TokenTreeNode = {
    "children": [
        {
            "children": [
                {
                    "content": "faith",
                    "id": 1,
                    "label": "Token",
                    "strength": 2,
                },
                {
                    "content": "books",
                    "id": 2,
                    "label": "Token",
                    "strength": 1,
                }
            ],
            "content": "the",
            "id": 3,
            "label": "Token",
            "strength": 1,
        },
        {
            "content": "fit",
            "id": 4,
            "label": "Token",
            "strength": 1,
        }
    ],
    "content": "keep",
    "id": 5,
    "label": "Token",
    "strength": 1,
};

export { FAKE_API_DATA_1, FAKE_API_DATA_2 };
