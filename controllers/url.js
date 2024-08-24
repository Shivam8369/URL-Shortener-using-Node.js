// const shortid = require('shortid');
const { nanoid } = require("nanoid");

const URL = require("../models/url");

async function GenerateShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const generatedId = nanoid(8);

  await URL.create({
    shortId: generatedId,
    redirectURL: body.url,
    visitedHistory: [],
  });

  const domain = 'https://url-shortener-0vhl.onrender.com';
  // const domain = 'http://localhost:8001'
  return res.render("home", {id: generatedId, domains: domain});
  // return res.json({ id: generatedId });
}

async function redirectToOriginal(req, res) {
  const getShortid = req.params.shortid;

  const entry = await URL.findOneAndUpdate(
    { shortId: getShortid, },
    {
      $push: {
        visitedHistory: {
            timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).json({ error: "URL not found" });
  }
  res.redirect(entry.redirectURL);
}

async function getAnalytics(req,res) {
    const getShortid = req.params.shortid;

    const data = await URL.findOne({shortId: getShortid});

    if(!data) return res.status(404).json({error: "URL not found"});

    return res.json({totalClicks: data.visitedHistory.length});
}


async function getAllData(req,res) {

  const allUrl = await URL.find({});

  res.render("analytics",{urls : allUrl});
  
}

module.exports = {
  GenerateShortURL,
  redirectToOriginal,
  getAnalytics,
  getAllData,
};
