const User = require("../models/user");

exports.addAttempt = async (req, res, next) => {
    const id = req.params.id;
    const [attemptsRemaining, maxAttempts, attempts] = await getAttemptsRemaining(id);
  
    if (attemptsRemaining) {
      try {
        // Find the user with the given ID and update the attempts field
        const user = await User.findByIdAndUpdate(id, { $inc: { attempts: 1 } }, { new: true });
  
        // Return the updated user object as a JSON response
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the user.' });
      }
    } else {
      // If there are no attempts remaining, return a 403 Forbidden response
      res.status(403).json({ error: 'No attempts remaining.' });
    }
  };

async function getAttemptsRemaining(id) {
    try {
      // Find the user with the given ID
      const user = await User.findById(id);
  
      // Calculate the attempts remaining by subtracting the attempts from the max attempts
      const attemptsRemaining = user.maxAttempts - user.attempts;
  
      // Return an array with the attempts remaining and the max attempts if attemptsRemaining > 0,
      // or an array with a single false value if attemptsRemaining <= 0
      if (attemptsRemaining > 0) {
        return [true, user.maxAttempts, user.attempts];
      } else {
        return [false];
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while retrieving the attempts remaining.');
    }
  }