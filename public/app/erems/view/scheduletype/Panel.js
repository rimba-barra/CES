Ext.define('Erems.view.scheduletype.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.scheduletype.Grid','Erems.view.scheduletype.FormSearch'],
    alias:'widget.scheduletypepanel',
    itemId:'ScheduletypePanel',
    gridPanelName:'scheduletypegrid',
    formSearchPanelName:'scheduletypeformsearch'
});