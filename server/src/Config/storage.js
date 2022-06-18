const mongoose = require("mongoose")
const { GridFsStorage } = require("multer-gridfs-storage")
const GridStream = require("gridfs-stream")

var grid = {}
const conn = mongoose.connection
conn.once("open", function () {
	grid.gfs = GridStream(conn.db, mongoose.mongo)
	grid.gfs.collection("photos")
	grid.gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "photos",
	})
})

const storage = new GridFsStorage({
	db: mongoose.connection,
	file: (req, file) => {
		return {
			bucketName: "photos",
			filename: `${Date.now()}_${file.originalname}`,
		}
	},
})

module.exports = { storage, grid }
