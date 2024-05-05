const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../../config/config.json");
const sequelize = new Sequelize(config.development);

// get one from tb myproject
async function getOneProject(id) {
  let query = `SELECT public."MyProjects".name, 
  public."MyProjects".id,
  public."MyProjects".start_date, 
  public."MyProjects".end_date, 
  public."MyProjects".description, 
  public."MyProjects".technologies, 
  public."MyProjects".image, 
  public."MyProjects"."createdAt", 
  public."MyProjects".user_id,
  public.tb_users.name as author_name
  FROM public."MyProjects"
  LEFT JOIN public.tb_users 
  ON public."MyProjects".user_id = public.tb_users.id
  WHERE public."MyProjects".id = ${id};`;
  const getOne = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  return getOne;
}

// get all from tb myproject
async function getAllProject() {
  let query = `SELECT public."MyProjects".name, 
  public."MyProjects".id,
  public."MyProjects".start_date, 
  public."MyProjects".end_date, 
  public."MyProjects".description, 
  public."MyProjects".technologies, 
  public."MyProjects".image, 
  public."MyProjects"."createdAt", 
  public."MyProjects".user_id,
  public.tb_users.name as author_name
  FROM public."MyProjects"
  LEFT JOIN public.tb_users 
  ON public."MyProjects".user_id = public.tb_users.id`;

  const getAll = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  return getAll;
}

// get all my projects
async function getMyProjects(id) {
  let query = `SELECT public."MyProjects".name, 
  public."MyProjects".id,
  public."MyProjects".start_date, 
  public."MyProjects".end_date, 
  public."MyProjects".description, 
  public."MyProjects".technologies, 
  public."MyProjects".image, 
  public."MyProjects"."createdAt", 
  public."MyProjects".user_id,
  public.tb_users.name as author_name
  FROM public."MyProjects"
  LEFT JOIN public.tb_users 
  ON public."MyProjects".user_id = public.tb_users.id
  WHERE public.tb_users.id = ${id};`;

  const getProjects = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  return getProjects;
}

// post data to tb myproject
async function postProject(payload, id) {
  if (
    payload.projectName !== "" &&
    payload.projectName !== undefined &&
    payload.startDate !== "" &&
    payload.startDate !== undefined &&
    payload.endDate !== "" &&
    payload.endDate !== undefined &&
    payload.endDate >= payload.startDate &&
    payload.description !== "" &&
    payload.description !== undefined &&
    payload.image !== "" &&
    payload.image !== undefined
  ) {
    let query = `INSERT INTO "MyProjects" (name, start_date, end_date, description, technologies, image,user_id) VALUES ('${
      payload.projectName
    }', '${payload.startDate}', '${payload.endDate}', '${
      payload.description
    }', '${payload.technologies.join(",")}', '${payload.image}',${id})`;
    const insertDB = await sequelize.query(query, {
      type: QueryTypes.INSERT,
    });

    return insertDB;
  } else {
    console.log("Variabel tidak boleh kosong (string kosong) atau undefined.");
    return false;
  }
}

// delete data from tb myproject
async function deleteProject(id) {
  let query = `DELETE FROM "MyProjects" WHERE id = ${id};`;
  const delProject = await sequelize.query(query, {
    type: QueryTypes.DELETE,
  });

  return delProject;
}

// update data from tb myproject
async function updateProject(id, payload) {
  if (
    payload.projectName !== "" &&
    payload.projectName !== undefined &&
    payload.startDate !== "" &&
    payload.startDate !== undefined &&
    payload.endDate !== "" &&
    payload.endDate !== undefined &&
    payload.endDate >= payload.startDate &&
    payload.description !== "" &&
    payload.description !== undefined &&
    payload.image !== "" &&
    payload.image !== undefined
  ) {
    let query = `UPDATE "MyProjects" SET name ='${
      payload.projectName
    }', start_date='${payload.startDate}', end_date ='${
      payload.endDate
    }',image = '${payload.image}'
    ,description= '${
      payload.description
    }', technologies = '${payload.technologies.join(",")}' WHERE id=${id}`;
    const updateProject = await sequelize.query(query, {
      type: QueryTypes.UPDATE,
    });
    return updateProject;
  } else {
    console.log("Variabel tidak boleh kosong (string kosong) atau undefined.");
    return false;
  }
}

// post data user to tb_user
async function postNewUser(payload) {
  if (
    payload.registerName !== "" &&
    payload.registerName !== undefined &&
    payload.registerEmail !== "" &&
    payload.registerEmail !== undefined &&
    payload.hashedPassword !== "" &&
    payload.hashedPassword !== undefined
  ) {
    let query = `INSERT INTO tb_users (name, email, password) VALUES ('${payload.registerName}', '${payload.registerEmail}', '${payload.hashedPassword}')`;

    const newUser = await sequelize.query(query, {
      type: QueryTypes.INSERT,
    });
    return newUser;
  } else {
    console.log("Variabel tidak boleh kosong (string kosong) atau undefined.");
    return false;
  }
}

async function getOneUser(email) {
  let query = `SELECT * FROM tb_users WHERE email = '${email}'`;
  const user = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return user[0];
}

module.exports = {
  postProject,
  getAllProject,
  getOneProject,
  updateProject,
  deleteProject,
  postNewUser,
  getOneUser,
  getMyProjects,
};
