const asyncHandler = require('express-async-handler')


const refresh = asyncHandler(async (req, res) => {
   
    if (req.session.user) {
         console.log(req.session);
         res.status(200).json(req.session.user)
    } else {
       res.status(500).json('user not authenticated')
    }
})

module.exports = {
    refresh
 
}