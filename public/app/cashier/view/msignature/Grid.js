Ext.define('Cashier.view.msignature.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.msignaturegrid',
    store: 'Signature',
    bindPrefixName: 'MSignature',
    itemId: 'MSignature',
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
                    itemId: 'colms_signature_name',
                    width: 120,
                    dataIndex: 'signature_name',
                    hideable: false,
                    text: 'Signature Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_position',
                    width: 120,
                    dataIndex: 'position',
                    hideable: false,
                    text: 'Position'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_max_range',
                    dataIndex: 'max_range',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Maximal Range Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_signature_note',
                    width: 200,
                    dataIndex: 'signature_note',
                    hideable: false,
                    text: 'Signature Note'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


