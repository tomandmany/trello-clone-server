// listsData.js
import { v4 as uuidv4 } from 'uuid';
import cards from './cardsData.js';

const lists = [
    {
        'id': uuidv4(),
        'listName': 'リストタイトル',
        'cards': [
            { 'id': cards[0].id }
        ],
    },
    {
        'id': uuidv4(),
        'listName': '2つ目のリスト',
        'cards': [
            { 'id': cards[1].id }
        ],
    },
    // リストが増えるたび、配列の要素も増加
];

export default lists;