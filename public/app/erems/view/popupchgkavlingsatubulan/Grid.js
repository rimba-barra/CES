Ext.define('Erems.view.popupchgkavlingsatubulan.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.popupchgkavlingsatubulangrid',
    storeConfig: {
        id: 'PopupchgkavlingsatubulanGridStore',
        idProperty: 'payment_id',
        extraParams: {}
    },
    bindPrefixName: 'Popupchgkavlingsatubulan',
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
            defaults:{
                 xtype: 'gridcolumn',
                 width: 80,
                 align: 'left',
            },
            columns: [
                {
                    xtype: 'rownumberer'
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
                 
                    dataIndex: 'customer_name',
                    text: 'Customer Name'
                },
                {
                    xtype:'datecolumn',
                    dataIndex: 'purchaseletter_purchase_date',
                    text: 'Purchase Date'
                },
                {
                
                    dataIndex: 'purchaseletter_purchaseletter_no',
                    text: 'Purchase Number'
                },
                {
                   xtype:'numbercolumn',
                    align:'right',
                    dataIndex: 'purchaseletter_harga_total_jual',
                    text: 'Sales Price'
                },
                {
                   
                    dataIndex: 'purchaseletter2_purchaseletter_no',
                    text: 'New Purchase No'
                },
                {
                    xtype:'datecolumn',  
                    dataIndex: 'purchaseletter2_purchase_date',
                    text: 'New Purchase Date'
                },
                {
                  
                    dataIndex: 'cluster2_cluster',
                    text: 'New Cluster'
                },
                {
                   
                    dataIndex: 'block2_block',
                    text: 'New Block'
                },
                {
                    
                    dataIndex: 'unit2_unit_number',
                    text: 'New Unit'
                },
                {
                    xtype:'numbercolumn',
                    align:'right',
                    dataIndex: 'purchaseletter2_harga_total_jual',
                    text: 'New Salesprice'
                    
                },
                {
                    xtype:'booleancolumn',
                    dataIndex:'purchaseletterrevision_is_approve',
                    text:'Approved',
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype:'datecolumn',
                    dataIndex: 'purchaseletterrevision_approve_date',
                    text: ' Approve Date',
                    format:'d-m-Y'
                }
                
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
                        action: 'export_excel',
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export Excel'
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
