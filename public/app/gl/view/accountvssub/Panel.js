Ext.define('Gl.view.accountvssub.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Gl.view.accountvssub.Grid', 'Gl.view.accountvssub.FormSearch'],
    alias: 'widget.accountvssubpanel',
    itemId: 'AccountvssubPanel',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'vbox', // Arrange child items vertically
        align: 'stretch', // Each takes up full width
        padding: 2
    },
    gridPanelName: 'accountvssubgrid',
    formSearchPanelName: 'accountvssubformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    border: false,
                    items: [
                                {
                                    xtype: me.formSearchPanelName,
                                }
                            ]
                },
                {
                    xtype: me.gridPanelName,
                    flex: 1
                },
            ],
        });

        me.callParent(arguments);
    }
});
