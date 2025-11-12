import fs from 'node:fs';
import axios from 'axios';
import aws from 'aws-sdk';
import open from 'open';

const awsRegion = 'xxxxxxxxx';
const awsAccessKey = 'xxxxxxxxxxxxxxxxxxxx';
const awsSecretAccessKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const awsS3Bucket = 'xxxxxxxxxxxxxx';
const runscriptKey = 'xxxxxxxxxxxxxxxxxxxxxxxx';
const runscriptSecret = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

const s3 = new aws.S3({ region: awsRegion, accessKeyId: awsAccessKey, secretAccessKey: awsSecretAccessKey });

(async function () {
  try {
    let house = process.argv[2] || 'house1';
    const script = fs.readFileSync('merge.jsx', 'utf8');

    // input files
    const templateFile = {
      href: await s3.getSignedUrl('getObject', { Bucket: awsS3Bucket, Key: 'template.indd', }),
      path: 'template.indd',
    };
    const dataFile = {
      href: await s3.getSignedUrl('getObject', { Bucket: awsS3Bucket, Key: `${house}_data.csv` }),
      path: `${house}_data.csv`,
    };
    const picFile = {
      href: await s3.getSignedUrl('getObject', { Bucket: awsS3Bucket, Key: `${house}_pic.png` }),
      path: `${house}_pic.png`,
    };
    const floorplanFile = {
      href: await s3.getSignedUrl('getObject', { Bucket: awsS3Bucket, Key: `${house}_floorplan.png` }),
      path: `${house}_floorplan.png`,
    };

    // output files
    const outputFile = {
      href: await s3.getSignedUrl('putObject', { Bucket: awsS3Bucket, Key: 'output.pdf', ContentType: 'application/octet-stream' }),
      path: 'output.pdf',
    };

    // request data
    const data = {
      inputs: [templateFile, dataFile, picFile, floorplanFile],
      outputs: [outputFile],
      args: [{ name: 'DataFile', value: `${house}_data.csv` }],
      script: script,
    };

    const auth = { username: runscriptKey, password: runscriptSecret };
    let url = 'https://runscript.typefi.com/api/v2/job';
    let response = await axios.post(url, data, { auth: auth, 'Content-Type': 'application/json' });
    const jobId = response.data._id;
    console.log(`Job ${jobId}`);

    // poll every second for job status, break when complete
    url = 'https://runscript.typefi.com/api/v2/job/' + jobId;
    for (; ;) {
      response = await axios.get(url, { auth: auth });
      console.log(response.data.status);
      if (response.data.status === 'complete') {
        break;
      }
      await setTimeout(_ => { }, 1000); // sleep for 1 second
    }

    // get presigned output PDF URL
    url = await s3.getSignedUrl('getObject', { Bucket: awsS3Bucket, Key: 'output.pdf' });

    // download PDF
    response = await axios.get(url, { responseType: 'arraybuffer' });
    const fileData = Buffer.from(response.data, 'binary');
    fs.writeFileSync('output.pdf', fileData);

    // open PDF in preferred local app
    await open('output.pdf');

  } catch (error) {
    console.error(error);
  }
})();
