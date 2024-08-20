Ext.define('Gl.view.documentnumbering.Panel',{
    extend:'Gl.library.template.view.Panel',
    requires:['Gl.view.documentnumbering.Grid','Gl.view.documentnumbering.FormSearch'],
    alias:'widget.documentnumberingpanel',
    itemId:'DocumentnumberingPanel',
    gridPanelName:'documentnumberinggrid',
    formSearchPanelName:'documentnumberingformsearch'
});
