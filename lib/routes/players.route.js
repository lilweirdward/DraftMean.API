import express from 'express';
import Players from '../models/player.model';
const playersRouter = express.Router();

playersRouter.route('/:boardId')
    .get((req, res) => {
        Players.find({ 'BoardId': req.params.boardId }, (err, players) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(players);
            }
        });
    })
    .post((req, res) => {
        let player = new Players(req.body);
        player.save({}, (err, savedPlayer) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(savedPlayer);
            }
        });
    });

playersRouter.route('/:boardId/draft/:rank')
    .post((req, res) => {
        Players.findOne({
            'BoardId': req.params.boardId,
            'Rank': req.params.rank
        }, (err, player) => {
            if (err) {
                res.status(500).send(err);
            } else {
                player.PickTaken = req.body.PickTaken;

                player.save({}, (err, savedPlayer) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json(savedPlayer);
                    }
                });
            }
        });
    });

playersRouter.use('/:boardId/:playerName', (req, res, next) => {
    Players.findOne({
        'BoardId': req.params.boardId,
        'PlayerName': req.params.playerName
    }, (err, player) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.player = player;
            next();
        }
    });
});

playersRouter.route('/:boardId/:playerName')
    .put((req, res) => {
        const player = req.player;
        player.Rank = req.body.Rank;
        player.Team = req.body.Team;
        player.Position = req.body.Position;
        player.ByeWeek = req.body.ByeWeek;
        player.BestRank = req.body.BestRank;
        player.WorstRank = req.body.WorstRank;
        player.AvgRank = req.body.AvgRank;
        player.StdDev = req.body.StdDev;
        player.ADP = req.body.ADP;

        player.save({}, (err, savedPlayer) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(savedPlayer);
            }
        });
    })
    .delete((req, res) => {
        req.player.remove(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('player deleted successfully');
            }
        });
    });

export default playersRouter;