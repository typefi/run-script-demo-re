// Get the paths to all the files we're working with
var templateFilename = "template.indd";
var dataFilename = app.scriptArgs.getValue('DataFile');
var pdfFilename = "output.pdf";

// Open the InDesign document template
var template = app.open(File(templateFilename));

// Access the data merge properties of the template
var dataMerge = template.dataMergeProperties;

// Select the data source
dataMerge.selectDataSource(File(dataFilename));

// Perform the data merge to a new document
// This merges all records into a single new InDesign document
dataMerge.mergeRecords();

// Close the template without saving changes
template.close(SaveOptions.NO);

// Export the merged document to PDF
var mergedDoc = app.documents[0]; // The newly merged document
mergedDoc.exportFile(ExportFormat.PDF_TYPE, File(pdfFilename), app.pdfExportPresets.itemByName('[High Quality Print]'));

// Close the merged document without saving changes
mergedDoc.close(SaveOptions.NO);
