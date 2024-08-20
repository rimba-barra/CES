Ext.define('Cashier.view.kasbondept.Griddetaillog', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.kasbondeptgriddetaillog',
    store: 'Kasbondeptdetaillog',
    bindPrefixName: 'Kasbondept',
    itemId: 'Kasbondeptdetaillog',
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
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    width: 150,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'module',
                    hideable: false,
                    text: 'Type',
               
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'action',
                    hideable: false,
                    text: 'Action'
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_notes',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'notes',
                    hideable: false,
                    text: 'Notes'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_transdate',
                    width: 130,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'transaction_date',
                    hideable: false,
                    text: 'Transaction Date'
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
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_effdate',
                    width: 130,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'eff_date',
                    hideable: false,
                    text: 'Eff Date'
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


