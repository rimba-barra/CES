Ext.define('Erems.view.townplanning.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.townplanning.Grid','Erems.view.townplanning.FormSearch'],
    alias:'widget.townplanningpanel',
    itemId:'TownplanningPanel',
    gridPanelName:'townplanninggrid',
    formSearchPanelName:'townplanningformsearch'
});
