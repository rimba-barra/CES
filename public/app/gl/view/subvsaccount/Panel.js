Ext.define('Gl.view.subvsaccount.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Gl.view.subvsaccount.Grid', 'Gl.view.subvsaccount.FormSearch'],
    alias: 'widget.subvsaccountpanel',
    itemId: 'SubvsaccountPanel',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'vbox', // Arrange child items vertically
        align: 'stretch', // Each takes up full width
        padding: 2
    },
    gridPanelName: 'subvsaccountgrid',
    formSearchPanelName: 'subvsaccountformsearch',
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
