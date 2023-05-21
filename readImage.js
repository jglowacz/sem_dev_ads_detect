import Tesseract from 'tesseract.js';
import fs from 'fs'
import sharp from 'sharp';

// get metadata of image
async function getMetadata(imgDir) {
    try {
        // read image metadata
        const metadata = await sharp(imgDir).metadata();
        // get image width and height
        const widthImage = metadata.width
        const heightImage = metadata.height
        return [widthImage, heightImage];
    } catch (error) {
        console.log(`An error occurred during processing: ${error}`);
    }
}

// max limit for tesseract image size
const TESSERACT_IMAGE_LIMIT = 32767

// crop image
async function cropImage(dir) {
    try {
        // get image metadata
        const [widthImage, heightImage] = await getMetadata(dir);
        if (heightImage > TESSERACT_IMAGE_LIMIT) {
            await sharp(dir)
                .rotate()
                .extract({ left: 1, top: 1, width: widthImage - 1, height: heightImage - 1 })
                .toFile("./images/cropped.png");
        } 
        return
    } 
    catch (error) {
        console.log(error);
    }
}

cropImage("./images/image.png")


Tesseract.recognize(
  './images/cropped.png',
  'pol',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
    fs.writeFile('./recognized/test.txt', text, err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });;
})

