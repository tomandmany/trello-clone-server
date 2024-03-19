// cardsData.js
import { v4 as uuidv4 } from 'uuid';
import members from './membersData.js';

const cards = [
    {
        'id': uuidv4(),
        'cardName': 'カードタイトル',
        'description': '説明',
        'comments': [
            {
                'id': uuidv4(),
                'sender': members[0].id,
                'comment': 'コメント'
            }
        ],
        'participants': [
            { 'id': members[0].id },
            { 'id': members[1].id },
        ],
        'deadline': '〇〇年〇〇月〇〇日〇〇時〇〇分',
        'attachment': [
            // 添付ファイル
        ],
    },
    {
        'id': uuidv4(),
        'cardName': '2枚目のタイトル',
        'description': '説明',
        'comments': [
            {
                'id': uuidv4(),
                'sender': members[0].id,
                'comment': 'コメント'
            }
        ],
        'participants': [
            { 'id': members[2].id },
            { 'id': members[3].id },
        ],
        'deadline': '〇〇年〇〇月〇〇日〇〇時〇〇分',
        'attachment': [
            // 添付ファイル
        ],
    },
    // カードが増えるたび、配列の要素も増加
];

export default cards;