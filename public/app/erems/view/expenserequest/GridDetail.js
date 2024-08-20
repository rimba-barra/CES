Ext.define('Erems.view.expenserequest.GridDetail', {
    extend:'Erems.library.template.view.GridDS2',
    storeConfig:{
        id:'ExpenseRequestDetailGridStore',
        idProperty:'expensedetail_id',
        extraParams:{
            mode_read:'detaillist'
        }
    },
    alias: 'widget.expenserequestgriddetail',
    height: 200,
    columnLines: true,
    useActionCol:true,
    useAddNewButton:true,
    itemId:'ExpenseRequestgriddetail',
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
                dataIndex: 'cluster_cluster',
                text: 'Kawasan'
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
                xtype: 'actioncolumn',
                width: 50,
                hidden: false,
                resizable: false,
                align: 'right',
                items: me.showActionColItem()
                    
            }


            //   me.generateActionColumn()
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

            me.showAddNewButton()
            ]
        });

        me.callParent(arguments);
    },
    showAddNewButton:function(){
        var hidden = false;
        hidden = this.useAddNewButton?false:true;
        var x  = {
                xtype: 'button',
                hidden: false,
                itemId: 'btnAddNew',
                margin: '0 5 0 0',
                action: 'addNewDetail',
                iconCls: 'icon-new',
                text: 'Add New',
                hidden:hidden
            };
       return x;
    },
    showActionColItem:function(){
        if(!this.useActionCol)return [];
        var x =  [
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
        ];
        return x;
    }
});