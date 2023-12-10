const express = require("express");
const app = express();
const BlogsRouter = require("./Routes/BlogsRouter");
const { connectToDb } = require("./config/Db");
const cors = require("cors");
const apicache = require("apicache");
const redis = require("redis");
const rateLimit = require("express-rate-limit");
const ipfilter = require("express-ipfilter").IpFilter;

// Redis Cache
let RedisCache = apicache.options({
  redisClient: redis.createClient(),
}).middleware;

// Rate Limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 2,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// IP List
const ips = ["127.0.0.1"];

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectToDb();

// app.use(RedisCache("30 seconds"));
app.use(limiter);
app.use(ipfilter(ips, { mode: "deny" }));

app.use("/api/v1/blogs", BlogsRouter);

// Handling All other routes with 404 Error
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

module.exports = app;
