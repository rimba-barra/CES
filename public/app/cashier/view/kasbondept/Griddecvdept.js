Ext.define('Cashier.view.kasbondept.Griddecvdept', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.kasbondeptgriddecvdept',
    store: 'Kasbondeptdecvdept',
    bindPrefixName: 'Kasbondept',
    itemId: 'Kasbondeptdecvdept',
    title: 'COA',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemscustome(),
            viewConfig: {
            },
           // selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            features: [
                {
                    ftype: 'summary',
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
               // me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Voucher Dept No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    width: 120,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subgl',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'voucher_date',
                    hideable: false,
                    text: 'Voucher Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subgl',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'user_fullname',
                    hideable: false,
                    text: 'User'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_indexdata',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'vid',
                    hideable: false,
                    text: 'Voucher ID'
                },
            
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 150,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'cashier_voucher_no',
                    hideable: false,
                    text: 'Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remarks',
                    width: 150,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'status',
                    hideable: false,
                    text: 'Status'
                },
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItemscustome: function () {
        var me = this;
        var dockedItems = [
            {
              
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingkasbondeptdecvdept',
                width: 360,
                displayInfo: true,
                store: 'Kasbondeptdecvdept',
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
          
        }

        return ac;

    },
});


