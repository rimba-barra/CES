Ext.define('Erems.view.mastercluster.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.mastercluster.Grid','Erems.view.mastercluster.FormSearch'],
    alias:'widget.masterclusterpanel',
    itemId:'MasterclusterPanel',
    gridPanelName:'masterclustergrid',
    formSearchPanelName:'masterclusterformsearch'
});
