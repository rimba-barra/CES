Ext.define('Cashier.view.installmentpayment.Grid',{
    extend:'Cashier.library.template.view.GridDS2',
    alias:'widget.installmentpaymentgrid',
    storeConfig:{
        id:'PaymentGridStore',
        idProperty:'payment_id',
        extraParams:{}
    },
   // store:'Installmentpayment',
    bindPrefixName:'Installmentpayment',
    newButtonLabel:'New Payment',
    initComponent: function() {
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
                    itemId: 'colms_code',
                    width: 60,
                    align: 'right',
                    dataIndex: 'cluster_code',
                    text: 'Code'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    width: 100,
                    dataIndex: 'cluster_cluster',
                    hideable: false,
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 100,
                    dataIndex: 'block_block',
                    hideable: false,
                    text: 'Block'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_payment_no',
                    width: 130,
                    dataIndex: 'payment_no',
                    hideable: false,
                    text: 'Payment No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_receipt_no',
                    width: 100,
                    dataIndex: 'receipt_no',
                    hideable: false,
                    text: 'Receipt No'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    itemId: 'colms_payment_date',
                    width: 100,
                    dataIndex: 'payment_date',
                    hideable: false,
                    text: 'Payment Date'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    width: 100,
                    dataIndex: 'duedate',
                    hideable: false,
                    text: 'Due Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_valid_date',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Valid Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_giro_state',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Giro State'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_payment_value',
                    width: 100,
                    dataIndex: 'payment',
                    hideable: false,
                    text: 'Payment Value',
                    align:'right'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 100,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_denda',
                    width: 100,
                    dataIndex: 'denda',
                    hideable: false,
                    text: 'Denda',
                    align:'right'
                },
                
               
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
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
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
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
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden:true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                
                        iconCls: 'icon-print',
                        text: 'Print'
                    },
                    {
                        xtype: 'button',
                        action: 'printx',
                       
                        margin: '0 5 0 0',
                
                        iconCls: 'icon-pdf',
                        text: 'Print PDF'
                    },
                    {
                        xtype: 'button',
                        action: 'printvoucher',
                       
                        margin: '0 5 0 0',
                
                        iconCls: 'icon-pdf',
                        text: 'Print Voucher PDF'
                    },
                    {
                        xtype: 'button',
                        action: 'fontselect',
                       
                        margin: '0 5 0 0',
                
                        iconCls: 'icon-pdf',
                        text: 'Print Select Font'
                    },
                   
                    {
                        xtype: 'button',
                        action: 'printdos',
                       
                        margin: '0 5 0 0',
                
                        iconCls: 'icon-new',
                        text: 'Print DOS'
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