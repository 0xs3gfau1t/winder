const { notificationModel } = require('../Models/notificationModel');
const { userModel, pubModel, confModel } = require('../Models/userModel');
const { messagesModel, relationModel } = require('../Models/relationModel');

const PAGINATION_LIMIT = process.env.PAGINATION_LIMIT;

async function getFilterParamaters(id){
    const user = await userModel.findOne({_id: id}).exec();
    
    // Get filters enabled by user
    let filters = {};
    let f = await confModel.findOne({_id: user.confDetails}).exec();
    
    if(f){
        if(f.programPreference)         filters.program     = "BCT";
        if(f.universityPreference)      filters.university  = "PU";
//        if(f.programPreference)         filters.program     = f.programPreference;
//        if(f.universityPreference)      filters.university  = f.universityPreference;
//        if(f.genderPreference)         filters.gender      = f.genderPreference;
    }

    
    return [
        f.agePreference,
        filters
    ];
}

async function getList(id, page){
    // Get applied filters by user with id: id
    const [ agePreference, filters ] = await getFilterParamaters(id);
    
    pgLimit = process.env.PAGINATION_LIMIT;

    // Query with user applied filters

    //
    // Apply this technique to make a pagination middleware someday
    //
    const userList = await pubModel.find(filters)   // Add age filter after computing
                                    .skip(page * pgLimit)
                                    .limit(pgLimit)
                                    .select({
                                       __v: 0
                                    });

    return userList;
}

async function updateAcceptStatus(from, to){

    let r = {matched: false};

    // Check if this user has been liked previously
    let previouslyLiked = await relationModel.findOne({
        user1: to,
        user2: from
    });
    // If yes, send a match: true response
    console.log(previouslyLiked)
    if(previouslyLiked !== null){
        await previouslyLiked({
            stat: 0,
            unreadCount: 0
        }).save();

        //
        // Send push notification to user1 i.e. current user2
        //

        r.matched = true;
    }else{
        // Else, send a match: false response and update match stat for opposite user
        await relationModel({
            user1: from,
            user2: to,
            stat: 1,
        }).save();
    }
    return r;
}
module.exports = { getList, updateAcceptStatus };