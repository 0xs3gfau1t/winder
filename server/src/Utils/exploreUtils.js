const { notificationModel } = require('../Models/notificationModel');
const { userModel } = require('../Models/userModel');
const { messagesModel, relationModel } = require('../Models/relationModel');
const { parse } = require('dotenv');

const PAGINATION_LIMIT = process.env.PAGINATION_LIMIT;

// Temporary map to keep track of pagination status
// Find a way to implement it in persistence mannder efficiently
// Also, make it accept pagination direction so that
// We can make a premium feature out of it
var paginationStatus = new Map()

async function getFilterParamaters(id){
    const user = await userModel.findOne({_id: id}).exec();
    
    // Get filters enabled by user
    let filters = {} 
    if(user.programPreference)         filters.program     = "BCT";
    if(user.universityPreference)      filters.university  = "TU";
    // if(user.programPreference)         filters.program     = user.programPreference;
    // if(user.universityPreference)      filters.university  = user.universityPreference;
    // if(user.genderPreference)         filters.gender      = user.genderPreference;
    
    return [
        user.agePreference,
        filters
    ];
}

function parseBoundedDates(ageList){
    const currentDate = new Date();

    let nearestDate = new Date()
                            .setFullYear(
                                currentDate.getFullYear() - ageList[0]
                            );
    nearestDate = new Date(nearestDate);

    let farthestDate = new Date()
                            .setFullYear(
                                currentDate.getFullYear() - ageList[1]
                            );
    farthestDate = new Date(farthestDate);

    return [nearestDate, farthestDate];
}

async function getList(id, page){
    // Get applied filters by user with id: id
    const [ agePreference, filters ] = await getFilterParamaters(id);
    
    const [ lowerAgeLimit, upperAgeLimit ] = parseBoundedDates(agePreference);

    let userList;
    const returnableData = {
        // Data to be shown in result
        name: 1, university: 1, program:1, batch: 1,
        bio: 1, passion: 1
    };
    const ageFilter = {
        $gt: lowerAgeLimit,
        $lt: upperAgeLimit
    };
    const paginationFilter = {
        $ne: id,
        $gt: paginationStatus.get(id)
    };

    if(paginationStatus.has(id)){
        console.log("Has pagination status", paginationStatus);
        userList = await userModel.find({
                                        ...filters,
                                        _id: paginationFilter,
                                        age: ageFilter
                                    }, returnableData)
                                    .sort({_id: 1})
                                    .limit(PAGINATION_LIMIT)
                                    .exec();
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
        userList = await userModel.find({
                                        ...filters,
                                        age: ageFilter
                                    }, returnableData)
                                .sort({_id: 1})
                                .limit(PAGINATION_LIMIT)
                                .exec()
        paginationStatus.set(
            id,userList[PAGINATION_LIMIT-1]._id.toString()
            )
    }

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