const { userModel } = require("../Models/userModel")
const { relationModel } = require("../Models/relationModel")

const PAGINATION_LIMIT = process.env.PAGINATION_LIMIT

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
		{ preference: 1, pagination: 1, _id: 0 }
	)

	const filters = user.preference.toObject()
	console.log(filters.age)
	const [nearestDate, farthestDate] = parseBoundedDates(filters.age)
	delete filters["age"]

	const ageFilter = { $gt: farthestDate, $lt: nearestDate }
	const paginationFilter =
		user.pagination === "null"
			? {} // if there is no pagination
			: { _id: { $ne: id, $gt: user.pagination } } // if there is pagination

	console.log({ filters, paginationFilter, ageFilter })

	try {
		// To resolve: filter out those users which are already matched or pending approval.
		// How to: query to see if the currentUser and user from userList are in relation table.
		// Some keywords to search for: aggregate $lookup
		const userList = await userModel
			.find(
				{
					...filters,
					...paginationFilter,
					dob: ageFilter,
				},
				["name", "university", "program", "batch", "bio", "passion"]
			)
			.sort({ _id: 1 })
			.limit(PAGINATION_LIMIT)

		const newPagination =
			userList.length < PAGINATION_LIMIT
				? "null"
				: userList[PAGINATION_LIMIT - 1]._id.toString()

		user.updateOne({ pagination: newPagination })

		res.json({ success: true, userList })
	} catch (err) {
		console.log(err.message)
		res.json({ success: false, error: "Internal Server Error" })
	}
}

async function updateAcceptStatus(req, res) {
	const from = req.userdata._id
	const to = req.body.whom

	let r = { matched: false }

	// Check if this user has been liked previously
	let previouslyLiked = await relationModel.findOne(
		{ users: [to, from] },
		{ stat: 1, _id: 0 }
	)

	// If yes, send a matched: true response
	if (previouslyLiked !== null) {
		await previouslyLiked.updateOne({ stat: true })

		// Send push notification to user1 i.e. current user2

		res.json({ success: true, matched: true })
	} else {
		// Else, create a new relationship and send matched: false response
		await relationModel({
			users: [from, to],
			stat: false,
		}).save()
		res.json({ success: true, matched: true })
	}
}

module.exports = { getList, updateAcceptStatus }
