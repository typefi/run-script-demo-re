# run-script-demo-re

RunScript Real Estate brochure demo

## Setup

1. Create a Typefi Run Script account at [runscript.typefi.com](https://runscript.typefi.com).
2. Create an AWS account at [aws.amazon.com](https://aws.amazon.com) and setup an S3 bucket.
3. Upload the files `house1_data.csv`, `house1_floorplan.png`, `house1_pic.png`, `house2_data.csv`, `house2_floorplan.png`, `house2_pic.png` and `template.indd` to your S3 bucket.
4. Duplicate the `run (redacted).js` file and call it `run.js`.
5. Edit `run.js` and enter keys and values on lines 7-12.
6. `$ npm install`

## Running

### Locally

1. Open Adobe InDesign 2025
2. Open `merge_local.jsx` in VSCode and click _Run Without Debugging_
3. View the results in `output.pdf`

### In the Cloud at Typefi RunScript

1. `$ npm run house1` should create the house1 PDF and open it locally
2. `$ npm run house2` should create the house2 PDF and open it locally

## S3

Your S3 should look something like this:

<img width="1572" height="760" alt="s3" src="https://github.com/user-attachments/assets/463d9669-107c-4f67-8f81-176cf484d199" />

## House1

<img width="750" height="970" alt="house1" src="https://github.com/user-attachments/assets/b7050977-9cab-4ab2-a293-235809b1f7b5" />

## House2

<img width="747" height="970" alt="house2" src="https://github.com/user-attachments/assets/a6cf8fef-5cc2-4c23-9991-b7454a20f194" />
