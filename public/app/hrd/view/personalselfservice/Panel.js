Ext.define('Hrd.view.personalselfservice.Panel', {
    extend: 'Hrd.library.template.view.Panel',
    requires: ['Hrd.view.personalselfservice.Grid', 'Hrd.view.personalselfservice.FormSearch'],
    alias: 'widget.personalselfservicepanel',
    itemId: 'PersonalselfservicePanel',
    gridPanelName: 'personalselfservicegrid',
    formSearchPanelName: 'personalselfserviceformsearch'
});
