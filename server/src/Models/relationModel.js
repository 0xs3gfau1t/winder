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

let messagesSchema = mongoose.Schema(
	{
		content: String,
		/*
	 		false: sent by user[0]
		 	 true: sent by user[1]
	 	*/
		sender: Boolean,
	},
	{ timestamps: true }
)

messagesModel = mongoose.model("Messages", messagesSchema)

let relationSchema = mongoose.Schema({
	users: {
		type: [mongoose.Types.ObjectId],
		ref: "User",
		validate: [
			users => users.length === 2,
			"There can only be two users in a relationship",
		],
	},
	/*
	  	0: waiting for approval; user[0] is always the relation initiator
		1: approved
	 */
	stat: { type: Boolean, default: false },
	/*
		-n: user[1] sent n messages that are unread by user[0]
		+n: user[0] sent n messages that are unread by user[1]
		 0: both user have 0 unread messages
	 */
	unreadCount: {type: Number, default: 0},
	messages: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Messages",
		},
	],
})
relationModel = mongoose.model("Relation", relationSchema)

module.exports = { messagesModel, relationModel }
