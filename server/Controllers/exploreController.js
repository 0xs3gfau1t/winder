const { userModel } = require("../Models/userModel")
const {
	notificationModel,
	NotificationTypes,
} = require("../Models/notificationModel")
const { relationModel } = require("../Models/relationModel")
const { emitNoti } = require("./socket")
const { default: mongoose } = require("mongoose")

function parseBoundedDates(ageList) {
	const currentDate = new Date()

	let nearestDate = new Date().setFullYear(
		currentDate.getFullYear() - ageList[0]
	)
	nearestDate = new Date(nearestDate)

	let farthestDate = new Date().setFullYear(
		currentDate.getFullYear() - ageList[1]
	)
	farthestDate = new Date(farthestDate)

	return [nearestDate, farthestDate]
}

async function getList(req, res) {
	const id = req.userdata._id

	const user = await userModel.findOne(
		{ _id: req.userdata._id },
		{ preference: 1, pagination: 1 }
	)

	const filters = user.preference.toObject()
	if (filters.university === "Any") delete filters["university"]
	if (filters.program === "Any") delete filters["program"]
	const [nearestDate, farthestDate] = parseBoundedDates(filters.age)
	delete filters["age"]

	const ageFilter = { $gt: farthestDate, $lt: nearestDate }
	const paginationFilter =
		user.pagination.newExplore === "null"
			? { _id: { $ne: mongoose.Types.ObjectId(id) } } // if there is no pagination
			: {
					_id: {
						$ne: mongoose.Types.ObjectId(id),
						$gt: mongoose.Types.ObjectId(
							user.pagination.newExplore
						),
					},
			  } // if there is pagination

	const incomingPagination =
		user.pagination.incoming === "null"
			? {} // if there is no pagination
			: { _id: { $gt: user.pagination.incoming } } // if there is pagination

	const fetch = [
		"firstName",
		"lastName",
		"gender",
		"username",
		"university",
		"program",
		"batch",
		"bio",
		"passion",
		"images",
		"dob",
	]
	try {
		// Ids of all the users that has sent a match request
		var incomingUserIds = await relationModel
			.find(
				{
					...incomingPagination,
					"users.1": id,
					stat: false,
				},
				["users"]
			)
			.sort({ _id: 1 })
			.limit(1)

		// If there is incoming match request, get the data for that user
		const incomingUser = incomingUserIds.length
			? await userModel
					.find({ _id: incomingUserIds[0].users[0] }, fetch)
					.lean()
			: []

		const PAGINATION_LIMIT =
			process.env.PAGINATION_LIMIT - incomingUserIds.length

		// To resolve: filter out those users which are already matched or pending approval.
		// How to: query to see if the currentUser and user from userList are in relation table.
		// Some keywords to search for: aggregate $lookup

		// Todo: Test with more datas
		const userList = await userModel.aggregate([
			{
				$match: {
					...filters,
					...paginationFilter,
					dob: ageFilter,
				},
			},
			{
				$lookup: {
					from: "relations",
					let: { userId: "$_id" },
					pipeline: [
						{
							$match: {
								$and: [
									{
										$expr: {
											$in: ["$$userId", "$users"],
										},
									},
									{
										$expr: {
											$in: [
												mongoose.Types.ObjectId(id),
												"$users",
											],
										},
									},
								],
							},
						},
						{ $count: "count" },
					],
					as: "Relation",
				},
			},
			{ $match: { "Relation.count": { $exists: false } } },
			{ $limit: PAGINATION_LIMIT },
			{
				$project: fetch.reduce(
					(acc, curr) => ((acc[curr] = 1), acc),
					{}
				),
			},
			{ $sort: { _id: 1 } },
		])

		const response_list = [...userList, ...incomingUser]

		// Modify dob to change to approx age
		response_list.forEach(user => {
			user.dob = Math.floor(
				new Date(new Date() - Date.parse(user.dob)) /
					(1000 * 60 * 60 * 24 * 365)
			)
		})
		console.log(userList)
		const newPagination = {
			newExplore:
				userList.length < PAGINATION_LIMIT
					? "null"
					: userList[PAGINATION_LIMIT - 1]._id.toString(),
			incoming:
				incomingUserIds.length < 1
					? "null"
					: incomingUserIds[0]._id.toString(),
		}

		await user.updateOne({ pagination: newPagination })

		res.json({ success: true, userList: response_list })
	} catch (err) {
		console.log(err)
		res.status(400).json({ success: false, error: "Internal Server Error" })
	}
}

async function updateAcceptStatus(req, res) {
	const from = req.userdata._id
	const to = req.body.whom

	let r = { matched: false }

	// Check if user_from has already initiated relation with user_to
	const relCount = await relationModel.exists({ users: [from, to] })
	if (relCount)
		return res.status(400).json({
			success: false,
			error: "Relation with this user already exists.",
		})

	// Check if this user has been liked previously
	let previouslyLiked = await relationModel.findOne(
		{ users: [to, from] },
		{ stat: 1 }
	)

	// If yes, send a matched: true response
	if (previouslyLiked !== null) {
		await previouslyLiked.updateOne({ stat: true })

		// Create new notification to db and send it to the receiver through websocket
		const noti = notificationModel({
			type: NotificationTypes.MATCHED,
			title: "You got a new match.",
			content: `You are matched with user ${from}.`,
			user: to,
		})
		await noti.save()
		emitNoti(to, noti._id, noti.title, NotificationTypes.MATCHED)

		res.json({ success: true, matched: true })
	} else {
		// Else, create a new relationship and send matched: false response
		await relationModel({
			users: [from, to],
			stat: false,
		}).save()
		res.json({ success: true, matched: false })
	}
}

module.exports = { getList, updateAcceptStatus }
