const User = require("../models/user");
const CREATEACCOUNT = require("../utils/token")

exports.createUser = (req, res, next) => {
    if (!(req.body.key == CREATEACCOUNT.CREATEACCOUNT)) {
        console.log(req.body.key);
        console.log(CREATEACCOUNT);
        res.status(500).header('Content-Type', 'application/json').json({
            message: "You Do Not Have Access To This Page!",
        });
        }
    // console.log('got createUser req');
    const user = new User({
        userName: req.body.userName,
        password: req.body.password,
        maxScore: req.body.maxScore,
        cumulativeScore: req.body.cumulativeScore,
        attempts : req.body.attempts,
        maxAttempts : req.body.maxAttempts,
    });
    // console.log(user);
    User.findOne({
        $or: [
            { userName: user.userName },
        ]
    })
    .then(foundUser => {
        if (!foundUser) {
            return user.save();
        } else {
            throw new Error("User already exists.");
        }
    })
    .then((result) => {
        res.status(201).header('Content-Type', 'application/json').json({
            message: "User added successfully",
            post: {
                ...result.toObject(),
                id: result._id,
            },
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).header('Content-Type', 'application/json').json({
            message: err.message || "Fail to create user!",
        });
    });
};

exports.getUser = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currPage = +req.query.page;
    const userQuery = User.find();
    let fetchedUser;
    if (pageSize && currPage) {
      userQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    userQuery
      .populate() // populate all fields
      .then((docs) => {
        fetchedUser = docs;
        console.log(fetchedUser);
        return User.countDocuments();
      })
      .then((count) => {
        res.status(200).header('Content-Type', 'application/json').json({
          message: "All users fetched 200!",
          posts: fetchedUser,
          maxPosts: count,
        });
      })
      .catch((error) => {
        res.status(500).header('Content-Type', 'application/json').json({
          message: "Fetching users failed!",
        });
      });
  };  
  

exports.getUserById = (req,res, next) => {
    User.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).header('Content-Type', 'application/json').json(post)
            } else {
                res.status(404).header('Content-Type', 'application/json').json({ message: "User not found!" });
            }
        })
        .catch((error) => {
            res.status(500).header('Content-Type', 'application/json').json({
                message: "Fetching user failed!",
            });
        });
};

exports.updateUser = (req, res, next) => {
    const updatedUser = {
        userName: req.body.userName,
        password: req.body.password,
        maxScore: req.body.maxScore,
        cumulativeScore: req.body.cumulativeScore,
        attempts : req.body.attempts,
        maxAttempts : req.body.maxAttempts,
    };
    // console.log(updatedUser);
    User.updateOne({ _id: req.params.id }, { $set: updatedUser })
        .then((result) => {
            res.status(200).header('Content-Type', 'application/json').json({ message: "Update is successful!" });
        })
        .catch((error) => {
            res.status(500).header('Content-Type', 'application/json').json({
                message: "Couldn't update user!",
            });
            console.log(error);
        });
};

exports.deleteUser = (req, res, next) => {
    // console.log("here");
    console.log(req.params.id);
    User.deleteOne({ _id: req.params.id })
    .then((resp) => {
        res.status(200).header('Content-Type', 'application/json').json({ message: "Delete is successful!" });
    })
    .catch((error) => {
        res.status(500).header('Content-Type', 'application/json').json({
            message: "Couldn't delete user!",
        });
    });
};