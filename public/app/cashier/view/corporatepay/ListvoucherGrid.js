Ext.define('Cashier.view.corporatepay.ListvoucherGrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.listvouchergrid',
    storeConfig: {
        id: 'ListVoucherGridStore',
        idProperty: 'corporatepaydetail_id',
        extraParams: {
            mode_read: 'corporatepaydetail'
        }
    },
    height: 180,
    bindPrefixName: 'Corporatepay',
    itemId: 'Corporatepaydetail',
    title: 'Voucher Detail',
    newButtonLabel: 'Add New',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function() {
        var me = this;
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            features: [{
                ftype: 'summary',
            }],
            columns: [{
                    xtype: 'rownumberer',
                    width: 35,
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'vid',
                    hideable: false,
                    text: 'VoucherID',
                    flex: 2
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Voucher No',
                    flex: 2
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'vendor_name',
                    hideable: false,
                    text: 'Vendor Name',
                    flex: 2
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'short_description',
                    hideable: false,
                    text: 'Description (Short)',
                    flex: 2,
                    /*renderer: function(val, meta, rec) {

                        if (val != "") {
                            return val;
                        }

                        if (rec.get('description').length <= 20) {
                            return rec.get('description');
                        }

                        return Ext.util.Format.substr(rec.get('description'), 0, 20) + '...';
                    },*/
                    editor: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align:left'
                    }
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'bank_code',
                    hideable: false,
                    text: 'Bank Code',
                    flex: 2
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'vendor_bank_name',
                    hideable: false,
                    text: 'Bank Name',
                    flex: 2
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'vendor_bank_account_name',
                    hideable: false,
                    text: 'Bank Account Name',
                    flex: 2
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'vendor_bank_account_no',
                    hideable: false,
                    text: 'Bank Account No',
                    flex: 2
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description',
                    flex: 2,
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    flex: 2
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'vendor_bank_currency',
                    hideable: false,
                    text: 'Currency',
                    flex: 2
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'emails',
                    hideable: false,
                    text: 'Emails',
                    flex: 2,
                    editor: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align:left'
                    },
                }, {
                    xtype: 'gridcolumn',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'beneficiary_address',
                    hideable: false,
                    text: 'Beneficiary Address',
                    flex: 2,
                    editor: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align:left'
                    },
                },
                me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
    },
    viewConfig: {
        forceFit: true
    },
    generateDockedItems: function() {
        var me = this;
        var dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            height: 28,
            items: [{
                xtype: 'button',
                action: 'create',
                hidden: false,
                // disabled:true,
                itemId: 'btnCreate',
                margin: '0 5 0 0',
                iconCls: 'icon-new',
                text: 'Add New',
                bindAction: me.bindPrefixName + 'Create'
            }, {
                xtype: 'button',
                action: 'destroy',
                disabled: true,
                itemId: 'btnDelete',
                bindAction: me.bindPrefixName + 'Delete',
                iconCls: 'icon-delete',
                text: 'Delete Selected'
            }, ]
        }, ];
        return dockedItems;
    },
});