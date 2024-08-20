Ext.define('Erems.view.mastercustomer.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.mastercustomer.Grid','Erems.view.mastercustomer.FormSearch'],
    alias:'widget.mastercustomerpanel',
    itemId:'MastercustomerPanel',
    gridPanelName:'mastercustomergrid',
    formSearchPanelName:'mastercustomerformsearch'
});
