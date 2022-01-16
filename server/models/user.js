import mongoose from 'mongoose';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username cannot be blank'],
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank'],
  },
  routines: {
    type: [Object],
    default: {
      name: 'Standard strength',
      days: [
        {
          day: 0,
          exercises: [
            {
              name: 'Bench press',
              sets: 3,
              weight: 160,
              rest: 180,
              reps: 5,
            },
            {
              name: 'Squat',
              sets: 3,
              weight: 200,
              rest: 180,
              reps: 5,
            },
            {
              name: 'Deadlift',
              sets: 3,
              weight: 250,
              rest: 180,
              reps: 5,
            },
          ],
        },
        {
          day: 2,
          exercises: [
            {
              name: 'Bench press',
              sets: 3,
              weight: 160,
              rest: 180,
              reps: 5,
            },
            {
              name: 'Squat',
              sets: 3,
              weight: 200,
              rest: 180,
              reps: 5,
            },
            {
              name: 'Deadlift',
              sets: 3,
              weight: 250,
              rest: 180,
              reps: 5,
            },
          ],
        },
        {
          day: 4,
          exercises: [
            {
              name: 'Bench press',
              sets: 3,
              weight: 160,
              rest: 180,
              reps: 5,
            },
            {
              name: 'Squat',
              sets: 3,
              weight: 200,
              rest: 180,
              reps: 5,
            },
            {
              name: 'Deadlift',
              sets: 3,
              weight: 250,
              rest: 180,
              reps: 5,
            },
          ],
        },
      ],
    },
  },
});

UserSchema.methods = {
  _hashPassword(password) {
    return hash(password);
  },
  authenticateUser(password) {
    return compare(password, this.password);
  },
  generateAuthToken() {
    const token = jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );
    return token;
  },
};

export default mongoose.model('User', UserSchema);
