Ext.define('Erems.view.discountcollection.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.discountcollection.Grid','Erems.view.discountcollection.FormSearch'],
    alias:'widget.discountcollectionpanel',
    itemId:'DiscountcollectionPanel',
    gridPanelName:'discountcollectiongrid',
    formSearchPanelName:'discountcollectionformsearch'
});