Ext.define('Hrd.view.lookup.organizationchartparent.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.lookup.organizationchartparent.Grid','Hrd.view.lookup.organizationchartparent.FormSearch'],
    alias:'widget.lookuporganizationchartparentpanel',
    itemId:'LookuporganizationchartparentPanel',
    height:500,
    gridPanelName:'lookuporganizationchartparentgrid',
    formSearchPanelName:'' // lookuporganizationchartparentformsearch
});