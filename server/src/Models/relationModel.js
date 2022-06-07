const mongoose = require("mongoose")


//		Symbol Deriving Graph
//
//				  -
//		U_FROM	  -		U_TO
//				  -
//	-ve	<-------------------> +ve
//				  -
//				  -
//				  -

let MessagesSchema = mongoose.Schema({
	time: Date,
	content: String,
	sender: Boolean				// 1 = Sent by userTo
								// 0  = Sent by userFrom
})

let RelationSchema = mongoose.Schema({
	userFrom: String,
	userTo: String,
	stat: Number,			// -1 = Liked as (U_TO -> U_FROM)
							// 1 = Liked as  (U_FROM -> U_TO)
							// 0 = Matched

	unread_count: Number,	// -1 = Sent by (U_TO -> U_FROM)
							// 1 = Sent by  (U_FROM -> U_TO)
							// 0 = All read

	messages: {
		msg: [MessagesSchema],
		clear: Boolean		// 1 = Clear for U_TO
							// 0 = Clear for U_FROM
	}
})


module.exports.relationSchema = RelationSchema;
module.exports.messagesSchema = MessagesSchema;