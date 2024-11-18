const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req,res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req,res,next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ 
      where: {id: Number(id)},
      include: {playlists: true},
    });
    if (user) {
      res.json(user);
    } else {
      next({ status:404, message: "user ID is invalid"});
    }
  } catch (e) {
    next(e);
  }
});

router.post("/:id/playlists", async (req,res,next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: {id: Number(id)} });
    if (user) {
      const playlist = await prisma.playlist.create({
        data: { name, description, ownerID: Number(id) },
      });
    res.status(201).json(playlist);
    } else {
      next({ status: 404, message: "user ID is invalid"});
    }
  } catch (e) {
    next(e);
  }
})