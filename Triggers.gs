function deleteTriggers(){
  
  var triggers = ScriptApp.getProjectTriggers();

  triggers.forEach(function(trigger){

    try{
      ScriptApp.deleteTrigger(trigger);
    } catch(e) {
      throw e.message;
    };

  });

};

function testPullResponses(){
   var spreadsheetId = 'XXXXXXXXX';
  var rangeName = 'A2:B21'; //The range of the 20 ALTs in Koga city
  var values = [[`Ethan Reeder`]];
  var form = FormApp.openById('XXXXXXXXXXX');
var formResponses = form.getResponses();
for (var i = 0; i < formResponses.length; i++) {
  var formResponse = formResponses[i];
  var itemResponses = formResponse.getItemResponses();
  for (var j = 0; j < itemResponses.length; j++) {
    var itemResponse = itemResponses[j];
    Logger.log('Response #%s to the question "%s" was "%s"',
        (i + 1).toString(),
        itemResponse.getItem().getTitle(),
        itemResponse.getResponse());
        values[0].push(itemResponse.getResponse());
  }

}
  Logger.log(values);
   var value = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;
          var range = 'A'+value.length;
          var valueRange = Sheets.newRowData();
          valueRange.values = values;
          var appendRequest = Sheets.newAppendCellsRequest();
          appendRequest.sheetId = spreadsheetId;
          appendRequest.rows = [valueRange];
          var result = Sheets.Spreadsheets.Values.append(valueRange, spreadsheetId, range, {
            valueInputOption: "USER_ENTERED"
          });
}
