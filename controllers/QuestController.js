const Quest = require('../models').Quest;
const ComfortType = require('../models').ComfortType;

/**
 * Handle create quest request
 * 
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, company;
    let user = req.user;
    let comfortTypes = [];
    let questData = req.body;
    questData.ownerId = user.id;
    [err, quest] = await to(Quest.create(questData));

    if (err) {
        return ReE(res, err, 422);
    }
    if (questData.comfortTypes && Array.isArray(questData.comfortTypes)) {
        [err, comfortTypes] = await to(ComfortType.findAll({ 
            where: { id: questData.comfortTypes }
        }));
        if (err) {
            return ReE(res, err, 422);
        }
        if (comfortTypes) {
            comfortTypes.forEach((comfortType) => {
                quest.addComfortType(comfortType, { through: { status: 'started' }})
            });
            [err, quest] = await to(quest.save());
            if (err) {
                return ReE(res, err, 422);
            }
        }
    }
    let questJson = quest.toWeb();
    questJson.comfortTypes = comfortTypes;
    return ReS(res, { quest: questJson }, 201);
}
module.exports.create = create;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAll = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let limit = req.limit && parseInt(req.limit) >= 20 ? req.limit : 20;
    let offset = req.page && parseInt(req.page) > 1 ? (parseInt(req.page) - 1) * 20 : 0;
    let err, quests;

    [err, quests] = await to(Quest.findAll({
        include: [ {association: Quest.Type}, {association: Quest.Owner}, {association: Quest.ComfortTypes} ],
        offset,
        limit
    }));

    let questsJson = [];
    for (let i in quests){
        let quest = quests[i];
        let comfortTypes =  quest.ComfortTypes;
        let questInfo = company.toWeb();
        let comfortTypesInfo = [];
        for (let i in comfortTypes) {
            let comfortType = comfortTypes[i];
            // let user_info = user.toJSON();
            comfortTypesInfo.push({comfotType:comfotType.id});
        }
        questInfo.comfortTypes = comfortTypesInfo;
        questsJson.push(questInfo);
    }

    console.log('c t', questsJson);
    return ReS(res, { quests:questsJson });
}
module.exports.getAll = getAll;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const get = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let quest = req.quest;
    return ReS(res, { quest:quest.toWeb() });
}
module.exports.get = get;

const update = async (req, res) => {
    let err, quest, data;
    quest = req.quest;
    data = req.body;
    quest.set(data);
    [err, company] = await to(quest.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { quest:quest.toWeb() });
}
module.exports.update = update;

const remove = async (req, res) => {
    let comquestpany, err;
    quest = req.quest;

    [err, company] = await to(company.destroy());
    if(err) return ReE(res, 'error occured trying to delete the company');

    return ReS(res, {message:'Deleted Company'}, 204);
}

module.exports.remove = remove;
