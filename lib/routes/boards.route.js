import express from 'express';
import Boards from '../models/board.model';
const boardsRouter = express.Router();

boardsRouter.route('/')
    .get((req, res) => {
        Boards.find({}, (err, boards) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(boards);
            }
        });
    })
    .post((req, res) => {
        let board = new Boards(req.body);
        board.save({}, (err, savedBoard) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(savedBoard);
            }
        });
    });

boardsRouter.use('/:boardId', (req, res, next) => {
    const id = decodeURIComponent(req.params.boardId);
    if (id) {
        const hexId = Buffer.from(id, 'base64').toString('hex');
        Boards.findById(hexId, (err, board) => {
            if (err) {
                res.status(500).send(err);
            } else {
                req.board = board;
                next();
            }
        });
    } else {
        res.status(400).send('Please provide a valid board ID');
    }
});

boardsRouter.route('/:boardId')
    .get((req, res) => {
        res.json(req.board);
    })
    .put((req, res) => {
        const board = req.board;
        board.name = req.body.name;
        board.totalRounds = req.body.totalRounds;
        board.teams = req.body.teams;

        board.save({}, (err, savedBoard) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(savedBoard);
            }
        })
    })
    .delete((req, res) => {
        req.board.remove((err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('board deleted successfully');
            }
        })
    });

export default boardsRouter;