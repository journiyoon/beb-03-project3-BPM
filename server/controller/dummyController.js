const dummy = require("mongoose-dummy");
const Users = require("../model/users");
const Boards = require("../model/boards");
const NFTs = require("../model/nfts");
const Posts = require("../model/posts");
const Reviews = require("../model/reviews");
const Charts = require("../model/charts");

module.exports = {
	create: async (req, res) => {
		for (let i = 0; i < 10; i++) {
			Users.create(dummy(Users, { returnDate: true }));
			Boards.create(dummy(Boards, { returnDate: true }));
			NFTs.create(dummy(NFTs, { returnDate: true }));
			Posts.create(dummy(Posts, { returnDate: true }));
			Reviews.create(dummy(Reviews, { returnDate: true }));
		}
		res.send({ message: "success create dummy" });
	},
	update: async (req, res) => {
		Charts.updateOne(
			{ title: "봄여름가을겨울 (Still Life)" },
			{
				$set: {
					evaluations: [
						{
							popularity: 5,
							artistry: 4,
							lyrics: 5,
							individuality: 3,
							item: 1,
						},
						{
							popularity: 2,
							artistry: 3,
							lyrics: 4,
							individuality: 3,
							item: 1,
						},
					],
				},
			}
		)
			.then(() => {
				res.send({ message: "success" });
			})
			.catch((e) => {
				console.error(e);
			});
	},
};
