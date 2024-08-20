Ext.define('Cashier.view.masterlimitkasbon.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.masterlimitkasbongrid',
    store: 'Masterlimitkasbon',
    bindPrefixName: 'Masterlimitkasbon',
    newButtonLabel: 'Add New',
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
                    header: 'id_limitkason',
                    dataIndex: 'id_limitkasbon',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_name',
                    width: 150,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'Company'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_user',
                    width: 150,
                    dataIndex: 'username',
                    hideable: false,
                    text: 'User'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_limit',
                    width: 50,
                    dataIndex: 'limit_cashbon',
                    hideable: false,
                    text: 'Limit'
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_limit_aging',
                    width: 100,
                    dataIndex: 'limit_aging',
                    hideable: false,
                    text: 'Aging Days Limit'
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_tipekasbondept',
                    width: 100,
                    dataIndex: 'tipekasbondept',
                    hideable: false,
                    text: 'Cashbon Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    width: 150,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Add on'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addby',
                    width: 150,
                    dataIndex: 'addby_name',
                    hideable: false,
                    text: 'Add By'
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_modion',
                    width: 150,
                    dataIndex: 'modion',
                    hideable: false,
                    text: 'Modify on'
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_modion',
                    width: 150,
                    dataIndex: 'modiby_name',
                    hideable: false,
                    text: 'Modify By'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
//	
//	generateActionColumn: function() {
//        var me = this;
//        var ac = {
//            xtype: 'actioncolumn',
//            hidden: true,
//            itemId: 'actioncolumn',
//            width: 50,
//            resizable: false,
//            align: 'right',
//            hideable: false,
//            items: [
//                {
//                    text: 'Edit',
//                    iconCls: 'icon-edit',
//                    bindAction: me.bindPrefixName+'Update',
//                    altText: 'Edit',
//                    tooltip: 'Edit'
//                },
//                {
//                    text: 'Delete',
//                    iconCls: 'icon-delete',
//                    bindAction: me.bindPrefixName+'Delete',
//                    altText: 'Delete',
//                    tooltip: 'Delete'
//                },
//				{
//                    text: 'View',
//                    iconCls: 'icon-search',
//                    className:'view',
//                    bindAction: me.bindPrefixName + 'Read',
//                    altText: 'View',
//                    tooltip: 'View'
//                }
//            ]
//        };
//        return ac;
//    }
});