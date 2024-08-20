Ext.define('Hrd.view.transaksidinas.Panel', {
    extend: 'Hrd.library.box.view.directviewinput.Panel',
    // extend: 'Ext.form.Panel',
    requires: ['Hrd.view.transaksidinas.Grid', 'Hrd.view.transaksidinas.FormSearch', 'Hrd.view.transaksidinas.FormData'],
    alias: 'widget.transaksidinaspanel',
    itemId: 'TransaksidinasPanel',
    gridPanelName: 'transaksidinasgrid',
    formSearchPanelName: 'transaksidinasformsearch',
    formDataName: 'transaksidinasformdata',
    formDataWidth: '100%',
    bindPrefixName: 'Transaksidinas',
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
                    width:500,
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
                            
                            //width:300,
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
                        }/*,wulan comment 20200827
                        {
                            xtype: 'button',
                            action: 'print',
                            iconCls: 'icon-print',
                            text: 'Print'
                        }*/,
                        {
                            xtype: 'button',
                            action: 'update',
                            iconCls: 'icon-new',
                            text: 'Update ke Absent Record'
                        }
                        
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});