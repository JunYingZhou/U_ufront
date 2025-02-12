"use strict";
const common_vendor = require("../common/vendor.js");
const publicKey = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM51dgYtMyF+tTQt80sfFOpSV27a7t9uaUVeFrdGiVxscuizE7H8SMntYqfn9lp8a5GH5P1/GGehVjUD2gF/4kcCAwEAAQ==";
function encryptByRsa(txt) {
  const encryptor = new common_vendor.J();
  encryptor.setPublicKey(publicKey);
  return encryptor.encrypt(txt);
}
exports.e = encryptByRsa;
