/*Ext.define('Hrd.view.overtimetransaction.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.overtimetransaction.Grid','Hrd.view.overtimetransaction.FormSearch'],
    alias:'widget.overtimetransactionpanel',
    itemId:'OvertimetransactionPanel',
    gridPanelName:'overtimetransactiongrid',
    formSearchPanelName:'overtimetransactionformsearch'
    
});
*/
Ext.define('Hrd.view.overtimetransaction.Panel', {
    extend: 'Hrd.library.box.view.directviewinput.Panel',
    // extend: 'Ext.form.Panel',
    requires: ['Hrd.view.overtimetransaction.Grid','Hrd.view.overtimetransaction.FormSearch','Hrd.view.overtimetransaction.FormData'],
     alias:'widget.overtimetransactionpanel',
    itemId:'OvertimetransactionPanel',
    gridPanelName:'overtimetransactiongrid',
    formSearchPanelName:'overtimetransactionformsearch',
    formDataName: 'overtimetransactionformdata',
    formDataWidth: '100%',
    bindPrefixName: 'Overtimetransaction',
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
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});