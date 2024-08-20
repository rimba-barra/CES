Ext.define('Erems.view.popupcairksng.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.popupcairksnggrid',
    storeConfig: {
        id: 'PopupcairksngGridStore',
        idProperty: 'payment_id',
        extraParams: {}
    },
    bindPrefixName: 'Popupcairksng',
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
            columns: [{
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
                    xtype: 'gridcolumn',
       
                    width: 130,
                    dataIndex: 'salesman_employee_name',
                    hideable: false,
                    text: 'Salesman'
                },
                 {
                    xtype: 'gridcolumn',
       
                    width: 130,
                    dataIndex: 'note',
                    hideable: false,
                    text: 'Note'
                },
               
                
              //  me.generateActionColumn()
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
