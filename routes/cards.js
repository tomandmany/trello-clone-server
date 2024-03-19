// cards.js
import express from 'express';
import cards from '../data/cardsData.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
    const { ids } = req.query;

    if (ids) {
        const cardIds = ids.split(',');
        const filteredCards = cards.filter(card => cardIds.includes(card.id));
        res.json(filteredCards);
    } else {
        res.json(cards);
    }
});

router.get('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除

    const index = cards.findIndex(card => card.id === targetId);
    if (index !== -1) {
        res.json(cards[index]);
    } else {
        res.status(404).send({ message: 'card not found' });
    }
});

router.post('/', (req, res) => {
    const newCard = req.body;

    if (cards) {
        newCard.id = uuidv4(); // IDをUUIDで設定
        cards.push(newCard);
        res.status(201).json(newCard);
    } else {
        res.status(500).send({ message: 'Failed to load or create cards data.' });
    }
});

router.patch('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除
    const updatedCard = req.body;

    const index = cards.findIndex(card => card.id === targetId);
    if (index !== -1) {
        cards[index] = { ...cards[index], ...updatedCard };
        res.json(cards[index]);
    } else {
        res.status(404).send({ message: 'card not found' });
    }
});

router.delete('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除

    const index = cards.findIndex(card => card.id === targetId);
    if (index !== -1) {
        cards.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'card not found' });
    }
});

export default router;