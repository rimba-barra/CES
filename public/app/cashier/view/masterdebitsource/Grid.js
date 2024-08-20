Ext.define('Cashier.view.masterdebitsource.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.masterdebitsourcegrid',
    store: 'Masterdebitsource',
    bindPrefixName: 'Masterdebitsource',
    itemId: 'MasterdebitsourceGrid',
    title: 'Debit Source',
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
                    itemId: 'colms_bank_name',
                    dataIndex: 'bank_name',
                    titleAlign: 'left',
                    align: 'left',
                    width: 200,
                    hideable: false,
                    text: 'Bank'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_debitsource',
                    dataIndex: 'debitsource',
                    titleAlign: 'left',
                    align: 'left',
                    width: 130,
                    hideable: false,
                    text: 'Debit Source'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_acc_no',
                    dataIndex: 'acc_no',
                    titleAlign: 'left',
                    align: 'left',
                    width: 130,
                    hideable: false,
                    text: 'Account Number'
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
                        text: 'Add Debit Source',
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
                id: 'pagingmasterdebitsource',
                width: 360,
                displayInfo: true,
                store:'Masterdebitsource'
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


