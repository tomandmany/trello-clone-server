import express from 'express';
import boards from '../data/boardsData.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
    const { ids } = req.query;

    if (ids) {
        const boardIds = ids.split(',');
        const filteredBoards = boards.filter(board => boardIds.includes(board.id));
        res.json(filteredBoards);
    } else {
        res.json(boards);
    }
});

router.get('/participants', (req, res) => {
    const { ids } = req.query;

    if (ids) {
        const memberIds = ids.split(',');
        const filteredBoards = boards.filter(board =>
            Array.isArray(board.participants) && board.participants.some(participant => memberIds.includes(participant.id))
        );
        res.json(filteredBoards);
    } else {
        res.status(404).send({ message: 'member not participate any boards' });
    }
});

router.get('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除

    const index = boards.findIndex(board => board.id === targetId);
    if (index !== -1) {
        res.json(boards[index]);
    } else {
        res.status(404).send({ message: 'board not found' });
    }
});

router.post('/', (req, res) => {
    const newBoard = req.body;

    if (boards) {
        newBoard.id = uuidv4(); // IDをUUIDで設定
        newBoard.bgImgSrc = 'bg.jpg';
        boards.push(newBoard);
        res.status(201).json(newBoard);
    } else {
        res.status(500).send({ message: 'Failed to load or create boards data.' });
    }
});

router.patch('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除
    const updatedBoard = req.body;

    const index = boards.findIndex(board => board.id === targetId);
    if (index !== -1) {
        boards[index] = { ...boards[index], ...updatedBoard };
        res.json(boards[index]);
    } else {
        res.status(404).send({ message: 'board not found' });
    }
});

router.delete('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除

    const index = boards.findIndex(board => board.id === targetId);
    if (index !== -1) {
        boards.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'board not found' });
    }
});

export default router;