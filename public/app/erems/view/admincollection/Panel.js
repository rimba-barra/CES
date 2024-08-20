Ext.define('Erems.view.admincollection.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.admincollection.Grid','Erems.view.admincollection.FormSearch'],
    alias:'widget.admincollectionpanel',
    itemId:'AdmincollectionPanel',
    gridPanelName:'admincollectiongrid',
    formSearchPanelName:'admincollectionformsearch'
});