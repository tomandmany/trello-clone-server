// boardsData.js
import { v4 as uuidv4 } from 'uuid';
import lists from './listsData.js';
import members from './membersData.js';

const boards = [
    {
        'id': uuidv4(),
        'boardName': 'ボードタイトル',
        'bgImgSrc': 'bg.jpg',
        'lists': [
            { 'id': lists[0].id },
            // { 'id': lists[1].id },
            // { 'id': lists[2].id },
            // { 'id': lists[3].id },
            // { 'id': lists[4].id },
        ],
        'participants': [
            { 'id': members[0].id },
            { 'id': members[1].id },
        ],
    },
    {
        'id': uuidv4(),
        'boardName': '2つ目のボード',
        'bgImgSrc': 'bg.jpg',
        'lists': [
            { 'id': lists[1].id }
        ],
        'participants': [
            { 'id': members[2].id },
            { 'id': members[3].id },
        ],
    },
];

export default boards;