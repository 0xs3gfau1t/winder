const mongoose = require("mongoose")


//		Symbol Deriving Graph
//
//				  -
//		U1	  -		U2
//				  -
//	-ve	<-------------------> +ve
//				  -
//				  -
//				  -

let messagesSchema = mongoose.Schema({
	time: Date,
	content: String,
	sender: Boolean				// 1 = Sent by user2
								// 0  = Sent by user1
})

messagesModel = mongoose.model("Messages", messagesSchema);

let relationSchema = mongoose.Schema({
	user1: String,
	user2: String,
	stat: Number,			// -1 = Liked as (U2 -> U1)
							// 1 = Liked as  (U1 -> U2)
							// 0 = Matched

	unreadCount: Number,	// -1 = Sent by (U2 -> U1)
							// 1 = Sent by  (U1 -> U2)
							// 0 = All read

	messages: {
		msg: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Messages"
		}],
		clear: Boolean		// 1 = Clear for U2
							// 0 = Clear for U1
	}
})
relationModel = mongoose.model("Relation", relationSchema);

module.exports.relationModel = relationModel;
module.exports.messagesModel = messagesModel;