Ext.define('Hrd.view.mtatatertib.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.mtatatertibgrid',
    storeConfig: {
        id: 'MtatatertibGridStore',
        idProperty: 'tatatertib_id',
        extraParams: {}
    },
    bindPrefixName: 'Mtatatertib',
    newButtonLabel: 'New Dokumen',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'disiplin_item',
                    text: 'Disiplin dan Tata Tertib',
                    width:'600'
                },
                {
                    dataIndex: 'bobot',
                    text: 'Bobot',
                    width:'80'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});