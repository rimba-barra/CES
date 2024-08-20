Ext.define('Erems.view.expenserequest.GridDetailUnit', {
   extend:'Erems.library.template.view.GridDS2',
    storeConfig:{
        id:'ExpenseRequestDetailUnitGridStore',
        idProperty:'unit_id',
        extraParams:{
            mode_read:'detailbyunit'
        }
    },
    alias: 'widget.expenserequestgriddetailunit',
    
    height: 200,
    columnLines: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
            contextMenu: [],
            dockedItems: [],
            defaults: {
                xtype:'gridcolumn',
                width: 100,
                hidden:false
            },
            viewConfig: {
                stripeRows: true
            },
            columns: [
                {
                    xtype: 'rownumberer'

                },
                {
                    dataIndex: 'expense_expense_no',
                    text: 'Expense Request No',
                    width:170
                },
                {
                    dataIndex: 'cluster_cluster',
                    text: 'Cluster'
                },
                {
                    dataIndex: 'block_block',
                    text: 'Block'
                },
                {
                    dataIndex: 'unit_unit_number',
                    text: 'Unit'
                },
                {
                    dataIndex: 'paymenttype_paymenttype',
                    text: 'Payment Type'
                },
                {
                    dataIndex: 'description',
                    text: 'Description'
                },
                {
                    xtype:'numbercolumn',
                    align:'right',
                    dataIndex: 'amount',
                    text: 'Amount'
                },
                {
                    dataIndex: 'expensetype_expensetype',
                    text: 'Expense Type'
                },
                {
                    dataIndex: 'description',
                    text: 'Status'
                }
                
              


                //   me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});