Ext.define('Cashier.view.mastercheque.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.masterchequegrid',
    bindPrefixName: 'Mastercheque',
    storeConfig: {
        id: 'MasterChequeInGridStore',
        idProperty: 'cheque_id',
        extraParams: {},
    },
    // itemId:'',
    newButtonLabel: 'New Budget Coa ',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'bank_bank_name',
                    hideable: false,
                    text: 'Bank',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'series',
                    hideable: false,
                    text: 'Series'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'cheque_no',
                    hideable: false,
                    text: 'No. Cheque'
                },
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'type',
                    hideable: false,
                    text: 'Type',
                    renderer: function(value) {
                        if (value == 'C') {
                            return 'Cheque';
                        } else if (value == 'G') {
                            return 'Giro';
                        } else {
                            return '';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'amount',
                    hideable: false,
                    emptyText: 0,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'issued_date',
                    hideable: false,
                    text: 'Issued Date',
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        var tempdate;
                        if (record.get('issued_date')) {
                            var cair_date = moment(record.get('issued_date')).format("DD-MM-YYYY");
                        } else {
                            var cair_date = null;
                        }
                        var now = moment(new Date()).format("DD-MM-YYYY");

                        if (cair_date == "01-01-1900" || !cair_date) {
                            return '';
                        }
                        else {
                            var dt = new Date(cair_date);
                            return cair_date;
                        }


                    },
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'status',
                    hideable: false,
                    align: 'center',
                    text: 'Status'
                },
                me.generateActionColumn()
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
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        disabled: true,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add Cheque In'
                    },
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
//                    {
//                        xtype: 'button',
//                        action: 'void',
//                        disabled: true,
//                        itemId: 'btnVoid',
//                        margin: '0 5 0 0',
//                        iconCls: 'icon-delete',
//                        text: 'Void Cheque',
//                    },
                    {
                        xtype: 'button',
                        action: 'canceled',
                        itemId: 'btnCanceled',
                        margin: '0 5 0 0',
                        iconCls: 'icon-unapprove',
                        text: 'Cancel Cheque',
                        bindAction: me.bindPrefixName + 'Canceled'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected',
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'detailcheque',
                        disabled: true,
                        //hidden: true,
                        itemId: 'btnDetailCheque',
                        margin: '0 5 0 0',
                        iconCls: 'icon-search',
                        text: 'Detail Cheque',
                        //bindAction: me.bindPrefixName + 'Realization'
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        width: 360,
                        displayInfo: true,
                        store: this.getStore()
                    },
                ]
            },
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
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                }

            ]
        };
        return ac;
    },
});


