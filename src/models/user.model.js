const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      enum: ['student', 'company_hr', 'recruiter', 'admin'],
      default: 'student'
    },
    defaultPortal: {
      type: String,
      enum: ['Student Portal', 'Company Portal', 'Admin Portal'],
      default: 'Student Portal'
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
