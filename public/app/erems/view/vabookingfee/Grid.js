Ext.define('Erems.view.vabookingfee.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    store: 'Vabookingfee',
    alias:'widget.vabookingfeegrid',
    bindPrefixName:'Vabookingfee',
    newButtonLabel:'Payment',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'ID',
                    dataIndex: 'bookingfee_id',
                    itemId: 'colva_bookingfee_id',                                     
                    hidden: true,
                    hideable: false,
                    width: 40,
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'No. VA BCA',
                    itemId: 'colva_nomor_va',                                     
                    dataIndex: 'nomor_va',                                     
                    hideable: false,
                    width: 100                  
                },
                {
                    xtype: 'gridcolumn',
                    text: 'No. VA Mandiri',
                    itemId: 'colva_nomor_vamandiri',                                     
                    dataIndex: 'nomor_vamandiri',                                     
                    hideable: false,
                    width: 100                  
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Customer Name',
                    itemId: 'colva_customer_name',                                     
                    dataIndex: 'customer_name',                                    
                    hideable: false,
                    width: 100                  
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Amount',
                    itemId: 'colva_amount',                                     
                    dataIndex: 'amount',
                    hideable: false,
                    align: 'right',
                    width: 100                  
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Receipt No.',
                    itemId: 'colva_receipt_no',                                     
                    dataIndex: 'receipt_no',
                    hideable: false,
                    width: 100                  
                },
                {
                    xtype: 'datecolumn',
                    text: 'Payment Date',
                    format: 'd-m-Y',
                    itemId: 'colva_payment_date',                                     
                    dataIndex: 'payment_date',                                    
                    hideable: false,
                    align: 'center',
                    width: 100                  
                },
                {
                    xtype:'booleancolumn',
                    itemId: 'colva_status',                                     
                    dataIndex:'status',
                    text:'Payment',
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Payment Method',
                    itemId: 'colva_paymentmethod',
                    dataIndex: 'paymentmethod',
                    hideable: false,
                    width: 100                  
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colva_notes',                                     
                    text: 'Notes',
                    dataIndex: 'notes',                                    
                    hideable: false,
                    width: 300
                },
                {
                    xtype: 'datecolumn',
                    text: 'Modified Date',
                    itemId: 'colva_modion',                                     
                    format: 'd-m-Y',
                    dataIndex: 'modion',                                    
                    hideable: false,
                    align: 'center',
                    width: 100                  
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colva_modifiedby',                                     
                    text: 'Modified By',
                    dataIndex: 'modifiedby',                                    
                    hideable: false,
                    width: 100                  
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
                        disabled: true,
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
    },
});


