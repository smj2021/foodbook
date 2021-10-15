import mongoose from 'mongoose'


const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  aboutMe: String,
  
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)


export {
  Profile
}