Ext.define('Hrd.view.sanctiontype.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.sanctiontype.Grid','Hrd.view.sanctiontype.FormSearch'],
    alias:'widget.sanctiontypepanel',
    itemId:'SanctiontypePanel',
    gridPanelName:'sanctiontypegrid',
    formSearchPanelName:'sanctiontypeformsearch'
});