import express from 'express';
import workspaces from '../data/workspacesData.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
    const { ids } = req.query;

    if (ids) {
        const workspaceIds = ids.split(',');
        const filteredWorkspaces = workspaces.filter(workspace => workspaceIds.includes(workspace.id));
        res.json(filteredWorkspaces);
    } else {
        res.json(workspaces);
    }
});

router.get('/participants', (req, res) => {
    const { ids } = req.query;

    if (ids) {
        const memberIds = ids.split(',');
        const filteredWorkspaces = workspaces.filter(workspace =>
            workspace.participants.some(participant => memberIds.includes(participant.id))
        );
        res.json(filteredWorkspaces);
    } else {
        res.status(404).send({ message: 'member not participate any workspaces' });
    }
});

router.get('/:id', (req, res) => {
    const targetId = req.params.id;

    const index = workspaces.findIndex(workspace => workspace.id === targetId);
    if (index !== -1) {
        res.json(workspaces[index]);
    } else {
        res.status(404).send({ message: 'workspace not found' });
    }
});

router.post('/', (req, res) => {
    const newWorkspace = req.body;

    if (workspaces) {
        newWorkspace.id = uuidv4(); // IDをUUIDで設定
        workspaces.push(newWorkspace);
        res.status(201).json(newWorkspace);
    } else {
        res.status(500).send({ message: 'Failed to load or create workspaces data.' });
    }
});

router.patch('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除
    const updatedWorkspace = req.body;

    const index = workspaces.findIndex(workspace => workspace.id === targetId);
    if (index !== -1) {
        workspaces[index] = { ...workspaces[index], ...updatedWorkspace };
        res.json(workspaces[index]);
    } else {
        res.status(404).send({ message: 'workspace not found' });
    }
});

router.delete('/:id', (req, res) => {
    const targetId = req.params.id; // UUIDは文字列なのでparseIntを削除

    const index = workspaces.findIndex(workspace => workspace.id === targetId);
    if (index !== -1) {
        workspaces.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'workspace not found' });
    }
});

export default router;