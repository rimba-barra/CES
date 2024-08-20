Ext.define('Erems.view.expenserequestview.Grid', {
    extend:'Erems.library.template.view.GridDS2',
    storeConfig:{
        id:'ExpenseRequestViewGridStore',
        idProperty:'expense_id',
        extraParams:{}
    },
    alias: 'widget.expenserequestviewgrid',
    
    bindPrefixName: 'Expenserequestview',
    newButtonLabel: 'New Payment_id',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype:'gridcolumn',
                width: 100,
                hidden:false
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'expense_no',
                    text: 'Expense No',
                    width:150
                },
                {
                    dataIndex: 'department_department',
                    text: 'Department',
                    width:70
                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'expense_date',
                    text: 'Request Date'
                },
                {
                    dataIndex: 'user_user_fullname',
                    text: 'Request By'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'total_amount',
                    text: 'Amount'
                },
                {
                    dataIndex: 'approved',
                    text: 'Approved',
                    xtype: 'booleancolumn',
                    width:50,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'approve_date',
                    text: 'Approve Date'
                },
                {
                    dataIndex: 'voucher_no',
                    text: 'Voucher Code'
                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'voucher_date',
                    text: 'Voucher Date'
                },
                {
                    dataIndex: 'paymentmethod_paymentmethod',
                    text: 'Payment Method'
                },
                {
                    dataIndex: 'reference_no',
                    text: 'Reference No'
                },
                me.generateActionColumn()
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
            hideable: false,
            items: [
                
                {
                    text: 'View',
                    iconCls: 'icon-search',
                    className:'view',
                    bindAction: me.bindPrefixName + 'View',
                    altText: 'View',
                    tooltip: 'View'
                }
            ]
        };
        return ac;
    },
     generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            
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