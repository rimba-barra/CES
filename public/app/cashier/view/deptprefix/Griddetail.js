Ext.define('Cashier.view.deptprefix.Griddetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.deptprefixdetailgrid',
    store: 'Deptprefixdetail',
    bindPrefixName: 'Deptprefixdetail',
    itemId: 'Deptprefixdetail',
    title: 'Detail',
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
                    itemId: 'colms_projectcode',
                    width: 100,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'projectcode',
                    hideable: false,
                    text: 'Project Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptcode',
                    width: 100,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'ptcode',
                    hideable: false,
                    text: 'Pt Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'Pt Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_deptprefix',
                    dataIndex: 'deptprefix',
                    titleAlign: 'left',
                    align: 'left',
                    width: 100,
                    hideable: false,
                    text: 'Department Prefix'
                },
             
                me.generateActionColumndetail()
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
                        text: 'Add Department Prefix',
                        itemId: 'btnAdd',
                        action: 'create',
                        disabled: true,
                        hidden: true,
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },

                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingdeptprefixdetail',
                width: 360,
                displayInfo: true,
                store: 'Deptprefixdetail'
            }
        ];
        return dockedItems;
    },
    generateActionColumndetail: function () {
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


