var MasterPlayerList = require('../models/masterPlayerList.model');

exports.getMasterList = async function() {
    try {
        var masterList = await MasterPlayerList.find({});
        return masterList;
    } catch (e) {
        throw Error('Error while fetching master list of players');
    }
};