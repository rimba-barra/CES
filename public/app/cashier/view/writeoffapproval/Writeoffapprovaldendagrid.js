Ext.define('Cashier.view.writeoffapproval.Writeoffapprovaldendagrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.writeoffapprovaldendagrid',
    storeConfig: {
        id: 'writeoffapprovaldendaStore',
        idProperty: 'writeoffdetail_id',
        extraParams: {
            mode_read: 'writeoffdenda',
            writeoff_id: 0
        },
    },
    bindPrefixName: 'Writeoffapproval',
    newButtonLabel: 'New Pencairan',
    height: 200,
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function() {
        var me = this;

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            plugins: [rowEditing],
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
                    itemId: 'colms_schedule_id',
                    width: 120,
                    dataIndex: 'schedule_id',
                    hidden:true,
                    text: 'Schedule ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 120,
                    dataIndex: 'description',
                    text: 'Description'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    width: 120,
                    dataIndex: 'amount',
                    text: 'Amount',
                    renderer: function (v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                        return 0;
                    },
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_remaining_balance',
                    width: 120,
                    dataIndex: 'remaining_balance',
                    text: 'Remaining Denda',
                    renderer: function (v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                        return 0;
                    },
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_writeoff',
                    width: 120,
                    dataIndex: 'writeoff',
                    text: 'Writeoff Amount',
                    summaryType: 'sum',
                    tip: 'Insert payment on first record.',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');

                    },
                    renderer: function (v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                        return 0;
                    },
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        //currencyFormat: true,
                        fieldStyle: 'text-align:right'
                    },
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_after_writeoff',
                    width: 120,
                    dataIndex: 'after_writeoff',
                    text: 'After Writeoff'
                },
				
				me.generateActionColumn()
            ],
        });

        me.callParent(arguments);
    },
	
	generateDockedItems: function() {
		
        var me = this;

        var dockedItems = [
            /*{
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
                        bindAction: me.bindPrefixName+'Create',
                        text: me.newButtonLabel
                    }
                ]
            },*/
            /*{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
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
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
//                    bindAction: me.bindPrefixName+'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
//                    bindAction: me.bindPrefixName+'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };
        return ac;
    }
	
});