Ext.define('Hrd.view.transferkrypayroll.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.transferkrypayrollpanel',
    itemId: 'TransferkrypayrollPanel',
    gridPanelName: 'transferkrypayrollgrid',
    formSearchPanelName: 'transferkrypayrollformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    width: 200,
                    height: 100,
                    margin: '20',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Proses Transfer Data Karyawan ke Payroll',
                            action: 'proses',
                            height:100
                            
                        }
                    ]
                }

            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    id: 'toolbarTransferkrypayrollID',
                    height: 28,
                    defaults: [
                        {
                            xtype: 'button',
                            margin: '0 5 0 0'
                        }
                    ],
                    items: [
                        {
                            action: 'create',
                            iconCls: 'icon-new',
                            hidden: true,
                            text: 'Add'
                        },
                        {
                            action: 'edit',
                            iconCls: 'icon-edit',
                            hidden: true,
                            text: 'Edit'
                        },
                        {
                            action: 'save',
                            text: 'Save',
                            hidden: true,
                            iconCls: 'icon-save',
                        },
                        {
                            action: 'cancel',
                            iconCls: 'icon-cancel',
                            hidden: true,
                            text: 'Cancel'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});