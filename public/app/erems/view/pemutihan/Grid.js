Ext.define('Erems.view.pemutihan.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.pemutihangrid',
    storeConfig: {
        id: 'PemutihanGridStore',
        idProperty: 'payment_id',
        extraParams: {}
    },
    bindPrefixName: 'Pemutihan',
    newButtonLabel: 'New Form Order AJB',
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
                    xtype: 'rownumberer',
                    width:30
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'cluster_cluster',
                    text: 'Kawasan'
                },{
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },{
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                },{
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'duedate',
                    format:'d-m-Y',
                    hideable: false,
                    text: 'Due Date'
                },{
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'purchaseletter_purchaseletter_no',
                    text: 'Purchaseltter No'
                },{
                    xtype: 'gridcolumn',
                    width: 250,
                    dataIndex: 'customer_name',
                    text: 'Customer Name'
                },{
                    xtype: 'numbercolumn',
                    width: 150,
                    dataIndex: 'amount',
                    hideable: false,
                    align:'right',
                    text: 'Amount'
                },{
                    xtype: 'numbercolumn',
                    width: 150,
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    align:'right',
                    text: 'Remaining Balance'
                }
                
              //  me.generateActionColumn()
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
                        action: 'bayar',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Bayar'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            
           
        ];
        return dockedItems;
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
            items: []
        };
        return ac;
    },
});
