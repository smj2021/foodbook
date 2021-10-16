import { Profile } from '../models/prfile.js'


function show(req, res) {
    Profile.findById(req.params.id)
        .then(function (profile) {
            Profile.findById(req.user.profile).then(function (userProfile) {
                res.render('profiles/show', {
                    title: `${profile.name}'s profile`,
                    profile,
                    userProfile,
                })
            })
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/')
        })
}

export {
    show
}