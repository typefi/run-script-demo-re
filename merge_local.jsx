// Get the current folder
var scriptPath = $.fileName;
var folder = scriptPath.substr(0, scriptPath.lastIndexOf("/")) + "/";

// Get the paths to all the files we're working with
var templateFilename = folder + "template.indd";
var dataFilename = folder + "house1_data.csv";
var pdfFilename = folder + "output.pdf";

// Open the InDesign document template
var template = app.open(File(templateFilename));

// Access the data merge properties of the template
var dataMerge = template.dataMergeProperties;

// Select the data source
dataMerge.selectDataSource(File(dataFilename));

// Perform the data merge to a new document
// This merges all records into a single new InDesign document
dataMerge.mergeRecords();

// Export the merged document to PDF
var mergedDoc = app.activeDocument; // The newly merged document
mergedDoc.exportFile(ExportFormat.PDF_TYPE, File(pdfFilename));

// Close the merged document and the template without saving changes
mergedDoc.close(SaveOptions.NO);
template.close(SaveOptions.NO);