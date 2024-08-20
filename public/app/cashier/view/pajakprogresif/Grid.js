Ext.define('Cashier.view.pajakprogresif.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.pajakprogresifgrid',
    store: 'Pajakprogresif',
    bindPrefixName: 'Pajakprogresif',
    itemId: 'Pajakprogresif',
    newButtonLabel: 'Add New',
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
                    itemId: 'persentaseprogdetail_id',
                    width: 30,
                    dataIndex: 'persentaseprogdetail_id',
                    hidden: true,
                    text: 'ID'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'tipepajakdetail_id',
                    width: 120,
                    dataIndex: 'tipepajakdetail_id',
                    hideable: false,
                    hidden: true,
                    text: 'Tipe Pajak'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'tipepajakdetail',
                    width: 120,
                    dataIndex: 'tipepajakdetail',
                    hideable: false,
                    text: 'Tipe Pajak'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'sequence',
                    width: 50,
                    dataIndex: 'sequence',
                    hideable: false,
                    text: 'Seq'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'persentase',
                    width: 50,
                    dataIndex: 'persentase',
                    hideable: false,
                    text: 'Persen',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right',
                    emptyText: 0,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'min_amount',
                    width: 150,
                    dataIndex: 'min_amount',
                    hideable: false,
                    text: 'Min. Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right',
                    emptyText: 0,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'max_amount',
                    width: 150,
                    dataIndex: 'max_amount',
                    hideable: false,
                    text: 'Max. Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right',
                    emptyText: 0,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'factor_amount',
                    width: 150,
                    dataIndex: 'factor_amount',
                    hideable: false,
                    text: 'Factor Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right',
                    emptyText: 0,
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


