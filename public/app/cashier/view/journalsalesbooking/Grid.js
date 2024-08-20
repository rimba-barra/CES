Ext.define('Cashier.view.journalsalesbooking.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.journalsalesbookinggrid',
    store: 'Journalsalesbooking',
    bindPrefixName: 'Journalsalesbooking',
    itemId: 'Journalsalesbooking',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype: 'cellediting',
                    clicksToEdit: 1
                })
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'datecolumn',
                    itemId: 'colms_booking_date',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'booking_date',
                    width: 90,
                    hideable: false,
                    text: 'Booking Date',
                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                    submitFormat: 'Y-m-d H:i:s.u',
                    style: 'font-weight:bold;',
                    editor: {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                        submitFormat: 'Y-m-d H:i:s.u'
                    },
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    dataIndex: 'cluster',
                    titleAlign: 'center',
                    align: 'left',
                    width: 100,
                    hideable: false,
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'unit_number',
                    width: 90,
                    hideable: false,
                    text: 'Unit No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_type',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'productcategory',
                    width: 90,
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sales_date',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'sales_date',
                    width: 80,
                    hideable: false,
                    text: 'Sales Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_price',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'unit_price',
                    width: 100,
                    hideable: false,
                    text: 'Price',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_total_payment',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'total_payment',
                    width: 100,
                    hideable: false,
                    text: 'Total Payment',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
              
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pricetype',
                    dataIndex: 'pricetype',
                    width: 100,
                    titleAlign: 'left',
                    align: 'left',
                    hideable: false,
                    text: 'Payment Method'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_handover_date',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'handover_date',
                    width: 80,
                    hideable: false,
                    text: 'Handover Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_payment_percentage',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'payment_percentage',
                    width: 80,
                    hideable: false,
                    text: '% Payment'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_construction_percentage',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'construction_percentage',
                    width: 80,
                    hideable: false,
                    text: '% Construction'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    dataIndex: 'ptname',
                    titleAlign: 'center',
                    align: 'center',
                    width: 200,
                    hideable: false,
                    text: 'PT'
                }
                
            ],
            bbar: [
            '',
            {
                xtype: 'tbfill'
            },
            '',
            {
                xtype: 'tbfill'
            },
            {
                xtype: 'button',
                action: 'generate',
                disabled: false,
                hidden: false,
                itemId: 'btnGenerate',
                margin: '0 5 0 0',
                iconCls: 'icon-add',
                text: 'Generate Sales Book'
            }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 0,
                items: [
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
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
                ],

            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            dataIndex: 'status',
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },
                {
                    xtype: 'button',
                    action: 'posting',
                    hidden: true,
                    itemId: 'btnPosting',
                    icon: 'app/main/images/icons/posting.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Posting',
                    text: 'Payment'
                },
                {
                    xtype: 'button',
                    action: 'unposting',
                    hidden: true,
                    itemId: 'btnUnposting',
                    icon: 'app/main/images/icons/unposting.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Unposting',
                    text: 'Un-Payment'
                },
            ],

        };
        return ac;
    }
});


