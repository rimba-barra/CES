Ext.define('Erems.view.masteralasangantinama.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masteralasangantinamagrid',
    store: 'Masteralasangantinama',
    bindPrefixName: 'Masteralasangantinama',
    newButtonLabel: 'New Alasan Ganti Nama',
    initComponent: function() {
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
                    itemId: 'colms_id',
                    width: 60,
                    align: 'right',
                    dataIndex: 'code',
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'reasonchgname',
                    hideable: false,
                    text: 'Alasan ganti nama'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});