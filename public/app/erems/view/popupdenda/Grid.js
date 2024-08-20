Ext.define('Erems.view.popupdenda.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.popupdendagrid',
    storeConfig: {
        id: 'PopupdendaGridStore',
        idProperty: 'payment_id',
        extraParams: {}
    },
    bindPrefixName: 'Popupdenda',
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
                    width: 60,
                    align: 'center',
                    dataIndex: 'cluster_code',
                    text: 'Kawasan'
                },{
                    xtype: 'gridcolumn',
                    width: 50,
                    align: 'center',
                    dataIndex: 'block_code',
                    text: 'Block'
                },{
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },{
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer'
                },{
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    width: 70,
                    dataIndex: 'duedate',
                    hideable: false,
                    text: 'Duedate'
                },{
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    width: 70,
                    dataIndex: 'payment_payment_date',
                    hideable: false,
                    text: 'Payment Date'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    dataIndex: 'remaining_denda',
                    hideable: false,
                    text: 'Denda'
                },{
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'scheduletype_scheduletype',
                    hideable: false,
                    text: 'Schedule Type'
                },{
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'termin',
                    hideable: false,
                    text: 'Termin'
                },{ // added by rico 10052023
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'pricetype_pricetype',
                    hideable: false,
                    text: 'Pricetype'
                }
              
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
                items: [{
                        xtype: 'button',
                        action: 'printkurangbayar',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Print'
                    },
					{
                        xtype: 'button',
                        action: 'export_excel',
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export Excel'
                    }]
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
