const Bundlr = require("@bundlr-network/client");
const fs = require("fs");

async function main() {
  const privateKey = JSON.parse(fs.readFileSync("wallet.json").toString());

  const bundlr = new Bundlr(
    "http://node2.bundlr.network",
    "arweave",
    privateKey
  );
  // Upload data
  // const dataToUpload = "<p>Good Evening Web3 Foundation Nepal</p>";
  const tags = [{ name: "Content-Type", value: "text/html" }];
  try {
    const receipt = await bundlr.uploadFile("./index.html", tags);
    console.log(`Text file uploaded ==> https://arweave.net/${receipt.id}`);
  } catch (e) {
    console.log("Error uploading file ", e);
  }
}

main();
