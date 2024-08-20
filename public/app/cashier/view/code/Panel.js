Ext.define('Cashier.view.code.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.code.Grid','Cashier.view.code.FormSearch'],
    alias:'widget.codepanel',
    itemId:'CodePanel',
    gridPanelName:'codegrid',
    formSearchPanelName:'codeformsearch'
});
