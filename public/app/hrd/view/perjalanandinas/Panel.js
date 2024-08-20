
Ext.define('Hrd.view.perjalanandinas.Panel', {
    extend: 'Hrd.library.box.view.directviewinput.Panel',
    // extend: 'Ext.form.Panel',
    requires: ['Hrd.view.perjalanandinas.Grid','Hrd.view.perjalanandinas.FormSearch','Hrd.view.perjalanandinas.FormData'],
     alias:'widget.perjalanandinaspanel',
    itemId:'PerjalanandinasPanel',
    gridPanelName:'perjalanandinasgrid',
    formSearchPanelName:'perjalanandinasformsearch',
    formDataName: 'perjalanandinasformdata',
    formDataWidth: '100%',
    bindPrefixName: 'Perjalanandinas',
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
                        }/*,/*, wulan comment 20200827
                        {
                            xtype: 'button',
                            action: 'print',
                            iconCls: 'icon-print',
                            text: 'Print'
                        }*/
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});