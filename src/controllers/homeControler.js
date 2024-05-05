const generalService = require("../service/generalService")
async function homeGet(req, res) {
  let isLogin = req.session.isLogin;
  let user = req.session.user;
  console.log(req.session)
  if (user) {
    let userId = user.user_id
    let username = user.name
    let myProject= await generalService.getMyProjects(userId)
    console.log("myProject",myProject)
    res.render("index", { isLogin,username,myProject});

  }
  else {
    res.render("index", { isLogin });
  }

}

module.exports = homeGet;
