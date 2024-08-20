Ext.define('Erems.view.notifikasiuser.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.notifikasiusergrid',
    store: 'Notifikasiuser',
    bindPrefixName: 'Notifikasiuser',
    newButtonLabel: 'New Notifikasi User',
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
                    xtype       : 'gridcolumn',
                    itemId      : 'colms_user_id',
                    dataIndex   : 'user_id',
                    hidden      : true
                },
                {
                    xtype       : 'gridcolumn',
                    itemId      : 'colms_notifikasi_module_id',
                    dataIndex   : 'notifikasi_module_id',
                    hidden      : true
                },
                {
                    xtype       : 'gridcolumn',
                    itemId      : 'colms_Active',
                    dataIndex   : 'Active',
                    hidden      : true
                },
                {
                    xtype       : 'gridcolumn',
                    itemId      : 'colms_user_email',
                    width       : 200,
                    dataIndex   : 'user_email',
                    text        : 'Email'
                },
                {
                    xtype       : 'gridcolumn',
                    itemId      : 'colms_module_name',
                    width       : 200,
                    dataIndex   : 'module_name',
                    hideable    : false,
                    text        : 'Module'
                },
                {
                    xtype       : 'gridcolumn',
                    itemId      : 'colms_status',
                    width       : 100,
                    dataIndex   : 'status',
                    hideable    : false,
                    text        : 'Status'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});