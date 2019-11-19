/**
 * Lists and delete the labels containing strings listed in 'labelsToDeleteArray'
 * Only matching labels are deleted. E-mails threads are kept.
 * 
 * 1. You need to agree to Term of Services before on https://script.google.com/
 * 2. Then, enable GMail API in menu Resources > Advanced Google Services
 * 3. Edit labelsToDeleteArray to match your labels to clean up
 * 4. Then Run : Menu Run > Run function > deleteLabels
 * 5. See Logs : Menu View > Logs
 *
 */
function deleteLabels() {
  /////////////////////////////////////////
  // List here the label substrings to delete
  var labelsToDeleteArray = ["labelSubString1", "labelSubString2..."];
  /////////////////////////////////////////
  
  var j = 0;
  var labels = GmailApp.getUserLabels();
    
  if (labels.length == 0) {
    Logger.log('No labels found.');
  } else {
    Logger.log('Labels:');
    for (var i = 0; i < labels.length; i++) {
      var label = labels[i];
      var name = new String(label.getName())
      Logger.log('- %s', name);
      labelsToDeleteArray.forEach(function(labelToDelete) {
        if (kmpSearch(labelToDelete, name) != -1) {
          Logger.log("'"  + labelToDelete + "' found in %s", name);
         try {
           label.deleteLabel();
           Logger.log("=> Label deleted");
           j = j + 1
         } catch (e) {
           Logger.log("Can't delete label " + name + ". Error : " + e.name + ': ' + e.message);
         }
       }  
      });
    }
  }
  Logger.log(j + " label(s) deleted")
}

// search pattern in text
function kmpSearch(pattern, text) {
  if (pattern.length == 0)
    return 0; // Immediate match

  // Compute longest suffix-prefix table
  var lsp = [0]; // Base case
  for (var i = 1; i < pattern.length; i++) {
    var j = lsp[i - 1]; // Start by assuming we're extending the previous LSP
    while (j > 0 && pattern.charAt(i) != pattern.charAt(j))
      j = lsp[j - 1];
    if (pattern.charAt(i) == pattern.charAt(j))
      j++;
    lsp.push(j);
  }

  // Walk through text string
  var j = 0; // Number of chars matched in pattern
  for (var i = 0; i < text.length; i++) {
    while (j > 0 && text.charAt(i) != pattern.charAt(j))
      j = lsp[j - 1]; // Fall back in the pattern
    if (text.charAt(i) == pattern.charAt(j)) {
      j++; // Next char matched, increment position
      if (j == pattern.length)
        return i - (j - 1);
    }
  }
  return -1; // Not found
}
