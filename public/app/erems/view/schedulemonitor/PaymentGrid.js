Ext.define('Erems.view.schedulemonitor.PaymentGrid', {
    alias: 'widget.schedulemonitorpaymentgrid',
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'SencMonPaymenteGridStore',
        idProperty: 'payment_id',
        extraParams: {
            mode_read: 'payment'
        }
    },
    bindPrefixName: 'Schedulemonitor',
    newButtonLabel: 'New ',
    height: 250,
    columnLines: true,
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function () {
        var me = this;

        


        var cbf = new Erems.template.ComboBoxFields();

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            plugins: [rowEditing],
            viewConfig: {
                stripeRows: true
            },
            features: [{
                    ftype: 'summary'
                }],
            columns: [
                {
                    xtype: 'rownumberer'

                },
                {
                    xtype: 'gridcolumn',

                    width: 90,
                    dataIndex: 'payment_no',
                    hideable: false,
                    text: 'Receipt No',
                    summaryRenderer: function () {
                        return '<b>Totals:</b>';
                    }

                },
                {
                    xtype: 'datecolumn',
                    type: 'date',

                    width: 90,
                    format: 'd-m-Y',
                    dataIndex: 'payment_date',
                    hideable: false,
                    text: 'Paid Date',

                },
                {
                    xtype: 'datecolumn',
                    type: 'date',

                    width: 90,
                    format: 'd-m-Y',
                    dataIndex: 'cair_date',
                    hideable: false,
                    text: 'Cair Date',

                },
                {
                    xtype: 'numbercolumn',

                    width: 115,
                    align: 'right',
                    dataIndex: 'total_payment',
                    hideable: false,
                    text: 'Payment',
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<b>'+accounting.formatMoney(value)+'</b>';
                    }

                },
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
                        action: 'delete',
                        itemId:'btnDeletePayment',
                        hidden:true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete',
                        disabled:true
                    },
                    '->',
                    {
                        xtype: 'label',
                        text: 'Payment'
                    },
                ]
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
    }
});