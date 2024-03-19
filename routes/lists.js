import express from 'express';
import lists from '../data/listsData.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
    const { ids } = req.query;

    if (ids) {
        // 'ids' パラメータが設定されている場合、指定された ID のカードのみを返す
        const listIds = ids.split(','); // カンマ区切りの ID 文字列を分割
        const filteredLists = lists.filter(list => listIds.includes(list.id));
        res.json(filteredLists);
    } else {
        // 'ids' パラメータが設定されていない場合、すべてのカードを返す
        res.json(lists);
    }
});

router.get('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除

    const index = lists.findIndex(list => list.id === targetId);
    if (index !== -1) {
        res.json(lists[index]);
    } else {
        res.status(404).send({ message: 'list not found' });
    }
});

router.post('/', (req, res) => {
    const newList = req.body;

    if (lists) {
        newList.id = uuidv4(); // IDをUUIDで設定
        lists.push(newList);
        res.status(201).json(newList);
    } else {
        res.status(500).send({ message: 'Failed to load or create lists data.' });
    }
});

router.patch('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除
    const updatedLists = req.body;

    const index = lists.findIndex(list => list.id === targetId);
    if (index !== -1) {
        lists[index] = { ...lists[index], ...updatedLists };
        res.json(lists[index]);
    } else {
        res.status(404).send({ message: 'list not found' });
    }
});

router.delete('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除

    const index = lists.findIndex(list => list.id === targetId);
    if (index !== -1) {
        lists.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'list not found' });
    }
});

export default router;