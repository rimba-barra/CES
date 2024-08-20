Ext.define('Cashier.view.kartupiutangacc.dataglGrid',{
    extend:'Cashier.library.template.view.GridDS2',
    alias:'widget.kartupiutangaccdataglgrid',
    store: 'Kartupiutangaccgl',
    bindPrefixName:'kartupiutangaccdataglgrid',
    itemId: 'kartupiutangaccdataglgrid',
    newButtonLabel:'New Expense_no',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            defaults: {
                xtype:'gridcolumn',
                hidden:false,
                height: 300,
            },
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 30,
                    header: 'No.'
                },
                {
                    dataIndex: 'coa_id',
                    hidden: true
                },
                {
                    dataIndex: 'kelsub_id',
                    hidden: true
                },
                {
                    dataIndex: 'journaldetail_id',
                    hidden: true
                },
                {
                    dataIndex: 'journalsubdetail_id',
                    hidden: true
                },
                {
                    dataIndex: 'voucher_date',
                    text: 'Voucher Date',
                    width:90,
                    align: 'center',
                    xtype:'datecolumn',
                    format:'d-m-Y',
                },
                {
                    dataIndex: 'voucher_no',
                    text: 'Voucher No.',
                    width:150
                },
                {
                    dataIndex: 'coa',
                    text: 'COA',
                    width: 130,
                    align: 'center'
                },
                {
                    dataIndex: 'code',
                    text: 'Sub COA',
                    width: 130,
                    align: 'center'
                },
                {
                    dataIndex: 'description',
                    text: 'Description',
                    width: 350
                },
                {
                    dataIndex: 'type',
                    text: 'Type',
                    width: 90,
                    align: 'center',
                    renderer: function(value, meta, record) {
                        var val = record.get('type');
                        if (val  == 'C') { 
                            return 'CREDIT';
                        }else if (val == 'D') { 
                            return 'DEBIT';
                        }
                        return '';
                    }
                },
                {
                    dataIndex: 'amount',
                    text: 'Amount',
                    width: 120,
                    align: 'right',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.number(record.get('amount'), '0,000.00')
                    }
                },
                {
                    dataIndex: 'kelsub',
                    text: 'Sub Group',
                    width: 70,
                    align: 'center'
                }
                // me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: true,
            items: [
                {
                    text: 'View',
                    iconCls: 'icon-search',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'View',
                    className:'view',
                    tooltip: 'View'
                },
                {
                    text: 'Kartu Piutang',
                    iconCls: 'icon-form',
                    bindAction: me.bindPrefixName + 'View',
                    altText: 'Kartu Piutang',
                    className:'view',
                    tooltip: 'Kartu Piutang'
                }
            ]
        };
        return ac;
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'label',
                        text: 'Data GL',
                        margin: '0 0 0 5'
                    },
                    {
                        xtype: 'button',
                        action: 'view',
                        hidden: true,
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-form',
                        text: 'View',
                        bindAction: me.bindPrefixName + 'Update'
                    },                   
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Print Kartu Piutang'
                    }
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