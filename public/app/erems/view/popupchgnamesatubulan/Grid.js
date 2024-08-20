Ext.define('Erems.view.popupchgnamesatubulan.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.popupchgnamesatubulangrid',
    storeConfig: {
        id: 'PopupchgnamesatubulanGridStore',
        idProperty: 'payment_id',
        extraParams: {}
    },
    bindPrefixName: 'Popupchgnamesatubulan',
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
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    align: 'center',
                    dataIndex: 'cluster_cluster',
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    align: 'center',
                    dataIndex: 'block_block',
                    hideable: false,
                    text: 'Block Code'
                },
                 {
                    xtype: 'gridcolumn',
                    width: 70,
                    align: 'center',
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    width: 100,
                    dataIndex: 'purchaseletter_purchaseletter_no',
                    hideable: false,
                    text: 'Purchase No'
                },
               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 100,
                    dataIndex: 'customernew_name',
                    hideable: false,
                    text: 'Customer Name'
                },
                
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_new_customer_name',
                    width: 120,
                    dataIndex: 'customerold_name',
                    
                    hideable: false,
                    text: 'New Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_reason',
                    width: 100,
                    dataIndex: 'reasonchgname_reasonchgname',
                    hideable: false,
                    text: 'Reason'
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
