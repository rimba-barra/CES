
Ext.define('Hrd.view.transferdata.Panel', {
    extend: 'Hrd.library.box.view.directviewinput.Panel',
    // extend: 'Ext.form.Panel',
    requires: ['Hrd.view.transferdata.Grid','Hrd.view.transferdata.FormSearch','Hrd.view.transferdata.FormData'],
     alias:'widget.transferdatapanel',
    itemId:'TransferdataPanel',
    gridPanelName:'transferdatagrid',
    formSearchPanelName:'transferdataformsearch',
    formDataName: 'transferdataformdata',
    formDataWidth: '100%',
    bindPrefixName: 'Transferdata',
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
                    width: 360
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
                        },
                        {
                            xtype: 'button',
                            action: 'print',
                            iconCls: 'icon-print',
                            text: 'Print'
                        },
                        {
                            xtype: 'button',
                            action: 'import',
                            iconCls: 'icon-new',
                            text: 'Import'
                        },
                        {
                            xtype: 'button',
                            action: 'deletebatch',
                            iconCls: 'icon-new',
                            text: 'Delete Batch'
                        },
                        {
                            xtype: 'button',
                            action: 'process',
                            iconCls: 'icon-new',
                            text: 'Proses'
                        },
                        {
                            xtype: 'button',
                            action: 'transfer',
                            iconCls: 'icon-new',
                            text: 'Transfer'
                        },
                        {
                            xtype: 'button',
                            action: 'updatetunjangan',
                            iconCls: 'icon-new',
                            text: 'Update Tj Tetap'
                        },
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});