Ext.define('Hrd.view.leavegiving.Panel', {
    extend: 'Hrd.library.box.view.directviewinput.Panel',
    // extend: 'Ext.form.Panel',
    requires: ['Hrd.view.leavegiving.Grid', 'Hrd.view.leavegiving.FormSearch', 'Hrd.view.leavegiving.FormData'],
    alias: 'widget.leavegivingpanel',
    itemId: 'LeavegivingPanel',
    gridPanelName: 'leavegivinggrid',
    formSearchPanelName: 'leavegivingformsearch',
    formDataName: 'leavegivingformdata',
    formDataWidth: '100%',
    bindPrefixName: 'Leavegiving',
    fsCollapsed: false,
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            autoScroll: true,
            items: [
                {
                    // xtype:'panel',
                    //html:'hello'
                    xtype: me.gridPanelName,
                    region: 'west',
                    width: 400
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    items: [
                        {
                            xtype: me.formSearchPanelName,
                            region: 'north',
                            split: true,
                        },
                        {
                            xtype: me.formDataName,
                            region: 'south',
                            width: me.formDataWidth
                        }

                    ]
                }

            ],
            /*,
             */
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            action: 'create',
                            hidden: true,
                            iconCls: 'icon-new',
                            bindAction: me.bindPrefixName + 'Create',
                            text: me.newButtonLabel
                        },
                        {
                            xtype: 'button',
                            action: 'edit',
                            disabled: true,
                            iconCls: 'icon-edit',
                            text: 'Edit'
                        },
                        {
                            xtype: 'button',
                            action: 'save',
                            margin: '0 5 0 0',
                            iconCls: 'icon-save',
                            disabled: true,
                            text: 'Save'
                        },
                        {
                            xtype: 'button',
                            action: 'cancel',
                            iconCls: 'icon-cancel',
                            disabled: true,
                            text: 'Cancel'
                        },
                        {
                            xtype: 'button',
                            action: 'delete',
                            disabled: true,
                            iconCls: 'icon-delete',
                            text: 'Delete'
                        },/* 2020 08 27 wulan comment
                        {
                            xtype: 'button',
                            action: 'print',
                            iconCls: 'icon-print',
                            text: 'Print'
                        },*/
                        //added by michael 20220614 | untuk keperluan Cuti Hotel
                        {
                            xtype: 'button',
                            action: 'param',
                            iconCls: 'icon-new',
                            text: 'Parameter Cuti'
                        },
                        {
                            xtype: 'button',
                            action: 'paramph',
                            iconCls: 'icon-new',
                            text: 'Parameter Cuti Public Holiday'
                        },
                        {
                            xtype: 'button',
                            action: 'parameo',
                            iconCls: 'icon-new',
                            text: 'Parameter Cuti Extra Off/Extra Leave'
                        },
                        //end added by michael 20220614 | untuk keperluan Cuti Hotel
                        {
                            xtype: 'button',
                            action: 'habis',
                            iconCls: 'icon-new',
                            text: 'Habis Cuti'
                        },
                        {
                            xtype: 'button',
                            action: 'proses',
                            iconCls: 'icon-new',
                            text: 'Recalculate'
                        },
                        // {
                        //     xtype: 'button',
                        //     action: 'generate',
                        //     iconCls: 'icon-new',
                        //     text: 'Generate Cuti'
                        // },
                        {
                            xtype: 'button',
                            action: 'refresh',
                            iconCls: 'icon-new',
                            text: 'Refresh'
                        },
                        //added by anas 06122021
                        {
                            xtype: 'button',
                            action: 'kompensasiextraleave',
                            iconCls: 'icon-new',
                            text: 'Kompensasi Extra Leave'
                        }
                        

                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});