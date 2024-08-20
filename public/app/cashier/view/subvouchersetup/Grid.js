Ext.define('Cashier.view.subvouchersetup.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.subvouchersetupgrid',
    store: 'Subvouchersetup',
    bindPrefixName: 'Subvouchersetup',
    itemId: 'Subvouchersetup',
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
                    itemId: 'colms_subvoucher_code',
                    width: 120,
                    dataIndex: 'subvoucher_code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subvoucher_name',
                    width: 120,
                    dataIndex: 'subvoucher_name',
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subvoucher_desc',
                    width: 200,
                    dataIndex: 'subvoucher_desc',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_active',
                    dataIndex: 'active',
                    trueText: '&#10003;',
                    falseText: '',
                    titleAlign: 'center',
                    align: 'center',
                    width: 70,
                    hideable: false,
                    text: 'Flag'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


