const { notificationModel } = require('../Models/notificationModel');
const { userModel, pubModel, confModel } = require('../Models/userModel');
const { messagesModel, relationModel } = require('../Models/relationModel');

const PAGINATION_LIMIT = process.env.PAGINATION_LIMIT;

var paginationStatus = new Map()

async function getFilterParamaters(id){
    const user = await userModel.findOne({_id: id}).exec();
    
    // Get filters enabled by user
    let filters = {};
    let f = await confModel.findOne({_id: user.confDetails}).exec();
    
    if(f){
       if(f.programPreference)         filters.program     = "BCT";
       if(f.universityPreference)      filters.university  = "TU";
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
    
    // Temporary list to keep track of pagination status
    // Find a way to implement it in persistence mannder efficiently
    // Also, make it accept pagination direction so that
    // We can make a premium feature out of it


    //
    // Apply this technique to make a pagination middleware someday
    //
    let userList;
    if(paginationStatus.has(id)){
        console.log("Has pagination status", paginationStatus);
        userList = await pubModel.find({
                                        ...filters,
                                        _id: {
                                            $gt: paginationStatus.get(id)
                                        }
                                        })   // Add age filter after computing
                                        .sort({_id: 1})
                                        .limit(PAGINATION_LIMIT)
                                        .select({
                                        __v: 0
                                        }).exec()
        if(userList.length < PAGINATION_LIMIT){
            console.log("Last page", paginationStatus);

            // Send all remaining data in last page
            // And delete the pagination record for `id`
            // Will create new pagination after another request
            // This might send empty json if userList.length = 0
            paginationStatus.delete(id);
        }else{
            console.log("New records may exist for ", id);
            paginationStatus.set(
                id, userList[PAGINATION_LIMIT-1]._id.toString()
            )
        }
    }else{
        console.log("No pagination. Creating one for ", id);
        userList = await pubModel.find({...filters})
                                .sort({_id: 1})
                                .limit(PAGINATION_LIMIT)
                                .select({__v: 0})
                                .exec()
        paginationStatus.set(
            id,userList[PAGINATION_LIMIT-1]._id.toString()
            )
    }
    console.log(paginationStatus);

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
            stat: 1,
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
            stat: 0,
        }).save();
    }
    return r;
}

module.exports = { getList, updateAcceptStatus };