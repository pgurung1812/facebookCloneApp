const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "../config/.env" });

cloudinary.config({
  cloud_name: "dqd8vam1s",
  api_key: "723982662875874",
  api_secret: "YMN7y8xb7gQqg6JU5FVO2O7mbZ8"   
});

module.exports = cloudinary;
