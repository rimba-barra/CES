Ext.define('Hrd.view.position.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.position.Grid','Hrd.view.position.FormSearch'],
    alias:'widget.positionpanel',
    itemId:'PositionPanel',
    gridPanelName:'positiongrid',
    formSearchPanelName:'positionformsearch'
});