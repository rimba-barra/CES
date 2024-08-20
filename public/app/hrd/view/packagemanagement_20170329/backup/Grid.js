Ext.define('Hrd.view.backup.packagemanagement.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.packagemanagementgrid',
    storeConfig: {
        id: 'PackagemanagementGridStore',
        idProperty: 'pmdocument_id',
        extraParams: {}
    },
    bindPrefixName: 'Packagemanagement',
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
                    dataIndex: 'code',
                    text: 'Code',
                    width: 80,
                },
                {
                    dataIndex: 'package_name',
                    text: 'Document Name',
                    width: 200,
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});