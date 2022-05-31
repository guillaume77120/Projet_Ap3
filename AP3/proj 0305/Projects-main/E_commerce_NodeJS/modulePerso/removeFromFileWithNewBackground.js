const {
  RemoveBgResult,
  removeBackgroundFromImageUrl,
  removeBackgroundFromImageFile,
} = require("remove.bg");
/*
const localFile = "./local/file/name.jpg";
const outputFile = `${__dirname}/out/img-removed-from-file.png`;*/

function removebg(path, outputFile) {
  removeBackgroundFromImageFile({
    path: path,
    apiKey: "AYsDE1RixKuiQdF1z6wH7mya", //ZKKk6MydjXjMoqzKXJxxhKpG
    size: "regular",
    type: "auto",
    scale: "50%",
    outputFile,
  })
    .then((result) => {
      console.log(`File saved to ${outputFile}`);
    })
    .catch((errors) => {
      console.log(JSON.stringify(errors));
    });
}

module.exports = removebg;
