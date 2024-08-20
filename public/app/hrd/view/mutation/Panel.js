Ext.define('Hrd.view.mutation.Panel', {
    extend: 'Hrd.library.template.view.Panel',
    requires: ['Hrd.view.mutation.Grid', 'Hrd.view.mutation.FormSearch'],
    alias: 'widget.mutationpanel',
    itemId: 'MutationPanel',
    gridPanelName: 'mutationgrid',
    formSearchPanelName: 'mutationformsearch'
});
