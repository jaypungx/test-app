const sha256 = require("js-sha256");

const dbconfig = {
  host: "localhost",
  user: "root",
  password:
    sha256.hmac(
      "a8cd72ee7348096b0cab6fe3d80bcf51b7b9ee48b44fa89f02378824f6383240",
      "71a4e8fdd9caa60a4aaa4735e7e363b1a4918c2daffbe5f161e57d0a75db0f77"
    ) + "Z+",
  database: "stuman"
};

module.exports = dbconfig;
