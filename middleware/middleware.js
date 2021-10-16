// This function uses res.locals which contains response local variables scoped to the request.
function passUserToView(req, res, next) {
    res.locals.user = req.user ? req.user : null;
    next();
}

export {
    passUserToView
}