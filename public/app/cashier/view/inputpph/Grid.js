Ext.define('Cashier.view.inputpph.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.inputpphgrid',
    store: 'Inputpph',
    bindPrefixName: 'InputpphGrid',
    itemId: 'InputpphGrid',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: null,
            selType: 'cellmodel',
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ],
            columns: [
                {
                    xtype: 'checkcolumninputpph',
                    text: 'Flag',
                    sortable: false,
                    width: 40,
                    disabled: true
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Journal SubGL ID',
                    width: 100,
                    dataIndex: 'journalsubdetail_id'
                },
                {
                    xtype: 'checkcolumninputpph',
                    text: 'Flag PPH',
                    width: 60,
                    sortable: false,
                    dataIndex: 'flag_pph'
                },
                {
                    xtype: 'datecolumn',
                    text: 'Date',
                    width: 100,
                    format:'d-m-Y',
                    dataIndex: 'document_date',
                    align: 'center',
                    editor: {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Document No.',
                    width: 150,
                    dataIndex: 'document_no',
                    editor: 'textfield'
                },
                {
                    xtype: 'datecolumn',
                    text: 'Receive Date',
                    width: 100,
                    format:'d-m-Y',
                    dataIndex: 'receive_date',
                    align: 'center',
                    editor: {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Voucher No.',
                    width: 150,
                    dataIndex: 'voucher_no'
                },
                {
                    xtype: 'datecolumn',
                    text: 'Voucher Date',
                    width: 100,
                    format:'d-m-Y',
                    dataIndex: 'voucher_date',
                    align: 'center',
                },
                {
                    xtype: 'gridcolumn',
                    text: 'COA',
                    width: 100,
                    dataIndex: 'coa'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Sub Group COA',
                    width: 100,
                    dataIndex: 'kelsub'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Sub COA',
                    width: 100,
                    dataIndex: 'code'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Amount',
                    width: 100,
                    dataIndex: 'amount',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.number(record.get('amount'), '0,000.00')
                    }
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Sub Description',
                    width: 250,
                    dataIndex: 'description'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Journal Sub Description',
                    width: 250,
                    dataIndex: 'keterangan',
                    renderer: function(value, metaData) {
                        metaData.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                }
            ]
        });

        me.callParent(arguments);
    },
});


