Ext.define('Gl.view.journal.Panel',{
    extend:'Gl.library.template.view.Panel',
    requires:['Gl.view.journal.Grid','Gl.view.journal.FormSearch'],
    alias:'widget.journalpanel',
    itemId:'JournalPanel',
    id: 'journalpanelID',
    gridPanelName:'journalgrid',
    formSearchPanelName:'journalformsearch'
});
