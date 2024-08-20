Ext.define('Cashier.view.loaner.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.loaner.Grid','Cashier.view.loaner.FormSearch'],
    alias:'widget.loanerpanel',
    itemId:'LoanerPanel',
    gridPanelName:'loanergrid',
    formSearchPanelName:'loanerformsearch'
});
