Ext.define('Cashier.view.masterpenandatangan.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.masterpenandatangangrid',
    store: 'Masterpenandatangan',
    bindPrefixName: 'Masterpenandatangan',
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
                    header: 'Penandatangan ID',
                    dataIndex: 'penandatangan_id',
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
                    itemId: 'colms_inisial',
                    width: 150,
                    dataIndex: 'inisial',
                    hideable: false,
                    text: 'Inisial'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 150,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jabatan',
                    width: 150,
                    dataIndex: 'jabatan',
                    hideable: false,
                    text: 'Jabatan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_departemen',
                    width: 150,
                    dataIndex: 'departemen',
                    hideable: false,
                    text: 'Departemen'
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sequence',
                    width: 150,
                    dataIndex: 'sort',
                    hideable: false,
                    text: 'Sequence'
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