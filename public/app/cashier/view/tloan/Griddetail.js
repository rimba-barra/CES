Ext.define('Cashier.view.tloan.Griddetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.tloangriddetail',
    store: 'Tloanpayment',
    bindPrefixName: 'Tloandetail',
    itemId: 'Tloandetail',
    title: 'lOAN PAYMENT',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemscustome(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            features: [
                {
                    ftype: 'summary',
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_payment_date',
                    width: 120,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'payment_date',
                    hideable: false,
                    text: 'Payment Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_payment_no',
                    width: 180,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'payment_no',
                    hideable: false,
                    text: 'Payment No.'
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 100,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'type',
                    hideable: false,
                    text: 'Type'
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 250,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },              
             
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 150,
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');
                        return  "Sum Total : " + summaryvalue;
                    }
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
   generateDockedItemscustome: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        text: 'Add new',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },

                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingtloandetail',
                width: 360,
                displayInfo: true,
                store: 'Tbankcoadetail',
                hideRefresh: true,
                listeners: {
                    afterrender: function (tbar) {
                        if (tbar.hideRefresh) {
                            tbar.down('#refresh').hide();
                        }
                    }

                }
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        }

        return ac;

    },
});


