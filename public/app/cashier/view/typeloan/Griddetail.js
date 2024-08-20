Ext.define('Cashier.view.typeloan.Griddetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.typeloandetailgrid',
    store: 'Typeloaninterest',
    bindPrefixName: 'Typeloaninterest',
    itemId: 'Typeloaninterest',
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
                    itemId: 'colms_interestdate',
                    dataIndex: 'interestdate',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Interest Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_value',
                    dataIndex: 'value',
                    titleAlign: 'left',
                    align: 'left',
                    width: 100,
                    hideable: false,
                    text: 'Value'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_value',
                    dataIndex: 'value',
                    titleAlign: 'left',
                    align: 'left',
                    width: 100,
                    hideable: false,
                    text: 'Value'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_flag_percentage',
                    dataIndex: 'flag_percentage',
                    titleAlign: 'left',
                    align: 'left',
                    width: 100,
                    hideable: false,
                    text: 'Flag Percent'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    titleAlign: 'left',
                    align: 'left',
                    width: 200,
                    hideable: false,
                    text: 'Value'
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
                        text: 'Add Interest',
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
                id: 'pagingtypeloandetail',
                width: 360,
                displayInfo: true,
                store: 'Typeloaninterest'
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


