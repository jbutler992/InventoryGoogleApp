function doGet() {
    return HtmlService.createHtmlOutputFromFile('index')
    .setSandboxMode(HtmlService.SandboxMode.NATIVE);
}

function processForm(formObject) {
    var ssID = "SpreadsheetID";
    var inventorySpreadsheet = SpreadsheetApp.openById(ssID);
    var sheet = inventorySpreadsheet.getActiveSheet();
    var lastRow = sheet.getLastRow()+1;
    var picsFolderID = "FolderForPicturesID";
    var picsFolder = DriveApp.getFolderById(picsFolderID);
    var rmNum = formObject.roomNumber;
    sheet.getRange(lastRow, 1).setValue(rmNum);
    var roomFolder = picsFolder.createFolder(rmNum);
    var counter = 2;
    for (var i in formObject){
        if (i != "roomNumber"){
            var item = roomFolder.createFile(formObject[i]);
            roomFolder.addFile(item);
            sheet.getRange(lastRow, counter).setValue(item.getUrl());
            counter += 1;
        }
    }
    return
}