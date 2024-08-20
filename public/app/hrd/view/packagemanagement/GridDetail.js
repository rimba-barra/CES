Ext.define('Hrd.view.packagemanagement.GridDetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.packagemanagementgriddetail',
    storeConfig: {
        id: 'PackagemanagementGridDetailStore',
        idProperty: 'pmdocument_detail_id',
        extraParams: {
            mode_read: 'packagemanagementdetaillist'
        }
    },
    bindPrefixName: 'Packagemanagement',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            contextMenu: me.generateContextMenu(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    dataIndex: 'jenisdokumen_code',
                    text: 'Doc Code',
                    width: 250,
                    name: 'jenisdokumen_code',
                    sortable: true
                },
                {
                    dataIndex: 'jenisdokumen_description',
                    text: 'Doc Description',
                    width: 250,
                    name: 'jenisdokumen_description',
                    sortable: true
                }, {
                    width: 120,
                    dataIndex: 'bobot',
                    hideable: false,
                    text: 'Bobot (%)',
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        text: 'Add new',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                ]
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 60,
            hidden: false,
            resizable: false,
            align: 'center',
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }]
        };

        return ac;
    }
});