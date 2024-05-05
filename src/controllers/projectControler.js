const generalService = require("../service/generalService");
const handleData = require("../service/handleData");

let data = [];

// Menampilkan halaman proyek
async function getProjects(req, res) {
  let dataDb = await generalService.getAllProject();
  let data = handleData.sendViewDataProject_toForm(dataDb);

  

  // mengambil 50 karakter pertama dari description
  data.forEach((data) => {
    if (data.description.length > 50) {
      data.description = data.description.substring(0, 50) + "...";
    }
  });
  let isLogin = req.session.isLogin;
  let user = req.session.user;
  if (user) {
    let username = user.name;
    let author_id =user.user_id
    let myProject = await generalService.getMyProjects(author_id)
    let myProject_data = handleData.sendViewDataProject_toForm(myProject)
    let otherData = data.filter(itemData=>!myProject_data.some(itemMyProject=>itemMyProject.id===itemData.id))
    console.log("data",data)
    console.log("myproject",myProject_data)
    console.log("otherData",otherData)
    let oth
    res.render("myProject", { myProject_data, otherData, isLogin, username});
  } else {
    res.render("myProject", { data, isLogin });
  }
}

// Menampilkan halaman penambahan proyek
function addProjectGet(req, res) {
  let isLogin = req.session.isLogin;
  let user = req.session.user;
  if (user) {
    let username = user.name;
    res.render("addProject", { data, isLogin, username });
  } else {
    res.render("addProject", { data, isLogin });
  }
}

// Menambahkan proyek
async function addProjectPost(req, res) {
  let dataForm = req.body;
  user_id =  req.session.user.user_id
  let url_image = req.file.filename
  let data = handleData.getDataProject_fromForm(dataForm,url_image);
  const post = await generalService.postProject(data,user_id);
  if (post) {
    res.redirect("/project");
    console.log("input benar");
  } else {
    console.log("salah input");
  }
}

// Menampilkan halaman edit proyek
async function editProjectGet(req, res) {
  let id = parseInt(req.params.id);
  let dataDB = await generalService.getOneProject(id);
  let data = handleData.sendViewDataProject_toForm(dataDB)[0];
  let isLogin = req.session.isLogin;
  let user = req.session.user;
  if (user) {
    let username = user.name;
    res.render("editProject", { data, isLogin, username });
  } else {
    res.render("editProject", { data, isLogin });
  }
}

// Mengedit proyek
async function editProjectPost(req, res) {
  let dataForm = req.body;
  let image =  req.file.filename
  let id = parseInt(req.params.id);
  let data = handleData.getDataProject_fromForm(dataForm,image);
  const edit = await generalService.updateProject(id, data);
  if (edit) {
    res.redirect("/project");
    console.log("input benar");
  } else {
    console.log("salah input");
  }
}

// Menghapus proyek
async function deleteProjectPost(req, res) {
  let id = parseInt(req.params.id);
  await generalService.deleteProject(id);
  res.redirect("/project");
}

// Menampilkan halaman detail proyek
async function viewProjectGet(req, res) {
  let id = parseInt(req.params.id);
  let dataDB = await generalService.getOneProject(id);
  let data = handleData.sendViewDataProject_toForm(dataDB)[0];
  let isLogin = req.session.isLogin;
  let user = req.session.user;
  if (user) {
    let username = user.name;
    res.render("detilProject", { data, isLogin, username });
    console.log("data nama",data.name)
  } else {
    res.render("detilProject", { data, isLogin });
    console.log("data nama",dataDB)
  }
}

// Objek untuk mengekspor fungsi-fungsi
const projectController = {
  get: getProjects,
  add: {
    get: addProjectGet,
    post: addProjectPost,
  },
  edit: {
    get: editProjectGet,
    post: editProjectPost,
  },
  del: {
    post: deleteProjectPost,
  },
  view: {
    viewProjectGet: viewProjectGet,
  },
};

module.exports = projectController;
