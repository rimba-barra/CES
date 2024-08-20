Ext.define('Erems.view.schedulemonitor.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.schedulemonitor.Grid','Erems.view.schedulemonitor.FormSearch'],
    alias:'widget.schedulemonitorpanel',
    itemId:'SchedulemonitorPanel',
    gridPanelName:'schedulemonitorgrid',
    formSearchPanelName:'schedulemonitorformsearch'
});
