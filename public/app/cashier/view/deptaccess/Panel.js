Ext.define('Cashier.view.deptaccess.Panel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Cashier.view.deptaccess.Grid',
        'Cashier.view.deptaccess.Griduseraccess',
        'Cashier.view.deptaccess.FormSearch'
    ],
    alias: 'widget.deptaccesspanel',
    itemId: 'Deptaccess',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'vbox', // Arrange child items vertically
        align: 'stretch', // Each takes up full width
        padding: 2
    },
    gridPanelName: 'deptaccessgrid',
    formSearchPanelName: 'deptaccessformsearch',
    gridPaneluseraccess: 'deptaccessgriduseraccess',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldcontainer',
                    align: 'right',
                    region: 'center',
                    bodyBorder: false,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            border: false,
                            items: [

                                {
                                    xtype: me.gridPanelName,
                                    flex: 1,
                                    height: 550,
                                    width: 300,
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            border: false,
                            bodyBorder: false,
                            items: [
                                {
                                    xtype: 'tbspacer',
                                    height: 230,
                                    width: 80,
                                },
                                {
                                    xtype: 'button',
                                    name: 'btntodesctionation',
                                    action: 'btntodesctionation',
                                    id: 'btntodesctionation',
                                    text: '>>',
                                    margin: '10 5 3 20',
                                },
                                {
                                    xtype: 'button',
                                    name: 'btntosource',
                                    action: 'btntosource',
                                    id: 'btntosource',
                                    text: '<<',
                                    margin: '10 5 3 20',
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            border: false,
                            bodyBorder: false,
                            items: [
                                {
                                    xtype: me.gridPaneluseraccess,
                                    flex: 1,
                                    height: 550,
                                    width: 920,
                                },
                            ]
                        },
                    ]
                },
            ],
        });

        me.callParent(arguments);
    }
});

