# gmail-delete-labels
Google App Script to delete labels

1. Import this script in [GSuite Developer Hub](https://script.google.com/)

2. Accept Gsuite Developper license

3. Enable Gmail API

   When Editing Script, click on *Resources* Menu > *Advanced Google Services*
   
   Search for _Gmail API_ and *Enable* it

4. Edit labelsToDeleteArray to match the label to delete (labels containing one of this substring will be deleted).

   *The string comparison is case-sensitive* : "Later" != "LATER"

5. Run deleteLabels() function

6. See execution logs (CTRL+Enter)
