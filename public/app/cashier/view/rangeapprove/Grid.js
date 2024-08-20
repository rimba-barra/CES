Ext.define('Cashier.view.rangeapprove.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.rangeapprovegrid',
    store: 'Rangeapprove',
    bindPrefixName: 'Rangeapprove',
    itemId: 'Rangeapprove',
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
                    itemId: 'colms_ptname',
                    width: 300,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'Company'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_range',
                    width: 300,
                    dataIndex: 'range',
                    hideable: false,
                    text: 'Range'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_fromamount',
                    dataIndex: 'fromamount',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'From Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_untilamount',
                    dataIndex: 'untilamount',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'To Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                /*
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_md1',
                    width: 150,
                    dataIndex: 'md1',
                    hideable: false,
                    text: 'MD1'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_md2',
                    width: 150,
                    dataIndex: 'md2',
                    hideable: false,
                    text: 'MD2'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dir1',
                    width: 150,
                    dataIndex: 'dir1',
                    hideable: false,
                    text: 'DIR1'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dir2',
                    width: 150,
                    dataIndex: 'dir2',
                    hideable: false,
                    text: 'DIR2'
                },
                */
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


