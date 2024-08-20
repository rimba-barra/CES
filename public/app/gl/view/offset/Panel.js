Ext.define('Gl.view.offset.Panel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Gl.view.offset.Accountdebetgrid',
        'Gl.view.offset.Accountcreditgrid',
        'Gl.view.offset.FormSearch'
    ],
    alias: 'widget.offsetpanel',
    itemId: 'OffsetPanel',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'vbox', // Arrange child items vertically
        align: 'stretch', // Each takes up full width
        padding: 3
    },
    height: 500,
    gridDebet: 'accountdebetgrid',
    gridCredit: 'accountcreditgrid',
    formSearchPanelName: 'offsetformsearch',   
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyBorder: false,
                    border: false,
                    bodyPadding: 0,
                    bodyStyle: 'background-color:#dfe8f5;',
                    items: [
                        {
                            xtype: 'splitter',
                            width: '30'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: me.formSearchPanelName,
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            bodyBorder: false,
                            border: false,
                            bodyPadding: 0,
                            bodyStyle: 'background-color:#dfe8f5;',
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'draggriddebet',
                                    itemId: 'btnDraggriddebet',
                                    iconCls: 'icon-submit',
                                    text: 'Drag to Debit',
                                    padding: 5,
                                    enableKeyEvents: true,
                                    listeners: {
                                        afterRender: function(thisForm, options){
                                            this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                                                enter: console.log('test data'),
                                                scope: this
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    height: 6
                                },
                                {
                                    xtype: 'button',
                                    action: 'draggridcredit',
                                    itemId: 'btnDraggridcredit',
                                    iconCls: 'icon-submit',
                                    text: 'Drag to Credit',
                                    padding: 5,
                                    enableKeyEvents: true,
                                    listeners: {
                                        specialkey: function(field, e){
                                            if (e.getKey() == e.ENTER) {
                                                alert('button credit');
                                            }
                                        }
                                    },
                                },
                            ]
                        },
                    ]

                },
                {
                    xtype: 'tbspacer',
                    height: 15
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyBorder: false,
                    border: false,
                    bodyPadding: 0,
                    bodyStyle: 'background-color:#dfe8f5;',
                    items: [
                        {
                            xtype: 'splitter',
                            width: '30'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: me.gridDebet,
                                    height: 140
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '25'
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            bodyBorder: false,
                            border: false,
                            bodyPadding: 0,
                            bodyStyle: 'background-color:#dfe8f5;',
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'dragdebettocombo',
                                    itemId: 'btnDragdebettocombo',
                                    iconCls: 'icon-submit',
                                    text: 'Drag to Combo',
                                    padding: 5,
                                },
                                {
                                    xtype: 'tbspacer',
                                    height: 6
                                },
                                {
                                    xtype: 'button',
                                    action: 'draggriddebet_togridcredit',
                                    itemId: 'btnDraggriddebet_togridcredit',
                                    iconCls: 'icon-submit',
                                    text: 'Drag to Grid Credit',
                                    padding: 5,
                                },
                            ]
                        },
                    ]

                },
                {
                    xtype: 'tbspacer',
                    height: 15
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyBorder: false,
                    border: false,
                    bodyPadding: 0,
                    bodyStyle: 'background-color:#dfe8f5;',
                    items: [
                        {
                            xtype: 'splitter',
                            width: '30'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: me.gridCredit,
                                    height: 140
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '25'
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            bodyBorder: false,
                            border: false,
                            bodyPadding: 0,
                            bodyStyle: 'background-color:#dfe8f5;',
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'dragcredittocombo',
                                    itemId: 'btnDragcredittocombo',
                                    iconCls: 'icon-submit',
                                    text: 'Drag to Combo',
                                    padding: 5,
                                },
                                {
                                    xtype: 'tbspacer',
                                    height: 6
                                },
                                {
                                    xtype: 'button',
                                    action: 'draggridcredit_togriddebet',
                                    itemId: 'btnDraggridcredit_togriddebet',
                                    iconCls: 'icon-submit',
                                    text: 'Drag to Grid Debit',
                                    padding: 5,
                                },
                            ]
                        },
                    ]

                },
                {
                    xtype: 'tbspacer',
                    height: 15
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyBorder: false,
                    border: false,
                    bodyPadding: 0,
                    bodyStyle: 'background-color:#dfe8f5;',
                    items: [
                        {
                            xtype: 'splitter',
                            width: '400'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyBorder: false,
                            border: false,
                            bodyPadding: 0,
                            bodyStyle: 'background-color:#dfe8f5;',
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'process',
                                    itemId: 'btnProcess',
                                    iconCls: 'icon-submit',
                                    text: 'Process',
                                    padding: 5,
                                },
                                {
                                    xtype: 'tbspacer',
                                    height: 6
                                },
                                {
                                    xtype: 'button',
                                    action: 'cancel',
                                    itemId: 'btnCancel',
                                    iconCls: 'icon-cancel',
                                    text: 'Cancel',
                                    padding: 5,
                                },
                                {
                                    xtype: 'tbspacer',
                                    height: 15
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
