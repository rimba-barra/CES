Ext.define('Cashier.view.masterbanktype.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.masterbanktypegrid',
    store: 'Masterbanktype',
    bindPrefixName: 'Masterbanktype',
    itemId: 'MasterbanktypeGrid',
    title: 'Bank Type',
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
                    itemId: 'colms_project_name',
                    width: 200,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'project_name',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_name',
                    dataIndex: 'pt_name',
                    titleAlign: 'left',
                    align: 'left',
                    width: 200,
                    hideable: false,
                    text: 'PT'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_banktype',
                    dataIndex: 'banktype',
                    titleAlign: 'left',
                    align: 'left',
                    width: 130,
                    hideable: false,
                    text: 'Bank Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    dataIndex: 'addon',
                    titleAlign: 'left',
                    align: 'left',
                    width: 130,
                    hideable: false,
                    text: 'Add On',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i:s')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addbyname',
                    dataIndex: 'addbyname',
                    titleAlign: 'left',
                    align: 'left',
                    width: 130,
                    hideable: false,
                    text: 'Add By'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_modion',
                    dataIndex: 'modion',
                    titleAlign: 'left',
                    align: 'left',
                    width: 130,
                    hideable: false,
                    text: 'Last Modify On',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i:s')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_modibyname',
                    dataIndex: 'modibyname',
                    titleAlign: 'left',
                    align: 'left',
                    width: 130,
                    hideable: false,
                    text: 'Last Modify By'
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
                        text: 'Add Bank Type',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        text: 'Edit',
                        itemId: 'btnEdit',
                        action: 'update',
                        iconCls: 'icon-edit',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        text: 'Delete Selected',
                        itemId: 'btnDelete',
                        action: 'destroy',
                        iconCls: 'icon-delete',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Delete'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingmasterbanktype',
                width: 360,
                displayInfo: true,
                store:'Masterbanktype'
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
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
                }
            ]
        }

        return ac;

    },
});


