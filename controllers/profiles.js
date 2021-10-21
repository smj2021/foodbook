import { Profile } from '../models/profile.js'

function index(req, res) {
    Profile.find({})
        .then(function (profiles) {
            res.render('profiles/index', {
                title: 'Foodies',
                profiles,
            })
        })
}

function show(req, res) {
    Profile.findById(req.params.id)
        .then(function (profile) {
            Profile.findById(req.user.profile)
                .then(function (userProfile) {
                    res.render('profiles/show', {
                        title: `${profile.name}'s Profile`,
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

function edit(req, res) {
    Profile.findById(req.params.id)
        .then(function (profile) {
            res.render('profiles/edit', {
                title: `Editing ${profile.name}'s Profile`,
                profile
            })
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/')
        })
}

function update(req, res) {
    Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(function (profile) {
            res.redirect(`/profiles/${profile._id}`)
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/')
        })
}

export {
    index,
    show,
    edit,
    update
}