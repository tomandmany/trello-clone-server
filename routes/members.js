import express from 'express';
import members from '../data/membersData.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(members);
});

router.get('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除

    const index = members.findIndex(member => member.id === targetId);
    if (index !== -1) {
        res.json(members[index]);
    } else {
        res.status(404).send({ message: 'member not found' });
    }
});

router.post('/', (req, res) => {
    const newMember = req.body;

    if (members) {
        newMember.id = uuidv4(); // IDをUUIDで設定
        members.push(newMember);
        res.status(201).json(newMember);
    } else {
        res.status(500).send({ message: 'Failed to load or create members data.' });
    }
});

router.patch('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除
    const updatedMember = req.body;

    const index = members.findIndex(member => member.id === targetId);
    if (index !== -1) {
        members[index] = { ...members[index], ...updatedMember };
        res.json(members[index]);
    } else {
        res.status(404).send({ message: 'Member not found' });
    }
});

router.delete('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除

    const index = members.findIndex(member => member.id === targetId);
    if (index !== -1) {
        members.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'Member not found' });
    }
});

export default router;