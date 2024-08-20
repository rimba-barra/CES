Ext.define('Gl.view.asset.Panel',{
    extend:'Gl.library.box.view.Panel',
    requires:['Gl.view.asset.Grid','Gl.view.asset.FormSearch'],
    alias:'widget.assetpanel',
    itemId:'AssetPanel',
    gridPanelName:'assetgrid',
    formSearchPanelName:'assetformsearch'
});