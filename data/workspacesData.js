// workspacesData.js
import { v4 as uuidv4 } from 'uuid';
import members from './membersData.js';
import boards from './boardsData.js';


const workspaces = [
    {
        'id': '1',
        'workspaceName': '1つ目のワークスペース',
        'iconImgSrc': 'bg.jpg',
        'boards': [
            { 'id': boards[0].id },
            { 'id': boards[1].id },
        ],
        'participants': [
            { 'id': members[0].id },
            { 'id': members[1].id },
        ],
    },
    {
        'id': '2',
        'workspaceName': '2つ目のワークスペース',
        'iconImgSrc': 'bg.jpg',
        'boards': [
            { 'id': boards[1].id },
        ],
        'participants': [
            { 'id': members[2].id },
            { 'id': members[3].id },
        ],
    },
];

export default workspaces;