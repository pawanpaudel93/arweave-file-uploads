const Arweave = require("arweave");
const fs = require("fs");

async function main() {
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });

  const data = fs.readFileSync("./me.png");
  const key = JSON.parse(fs.readFileSync("wallet.json"));

  let transaction = await arweave.createTransaction({ data: data }, key);
  transaction.addTag("Content-Type", "image/png");

  await arweave.transactions.sign(transaction, key);
  let uploader = await arweave.transactions.getUploader(transaction);

  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(
      `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
    );
  }
  console.log(`Image uploaded ==> https://arweave.net/${transaction.id}`);
}

main();
