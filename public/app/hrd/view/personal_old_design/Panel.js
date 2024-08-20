
Ext.define('Hrd.view.personal.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.personal.Grid','Hrd.view.personal.FormSearch'],
    alias:'widget.personalpanel',
    itemId:'PersonalPanel',
    gridPanelName:'personalgrid',
    formSearchPanelName:'personalformsearch'
});