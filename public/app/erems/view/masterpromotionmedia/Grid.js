Ext.define('Erems.view.masterpromotionmedia.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masterpromotionmediagrid',
    store: 'Masterpromotionmedia',
    bindPrefixName: 'Masterpromotionmedia',
    newButtonLabel: 'New Mediapromotion',
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
                    dataIndex: 'mediapromotion',
                    hideable: false,
                    text: 'Media Promotion'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_mediapromotion_kategori',
                    width: 100,
                    dataIndex: 'mediapromotion_kategori',
                    hideable: false,
                    text: 'Media Promotion Kategori'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_des',
                    width: 100,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});