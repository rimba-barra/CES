Ext.define('Cashier.view.vdposting.Griddesc', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vdpostinggriddesc',
    store: 'VDPostingdesc',
    bindPrefixName: 'VDPostingDesc',
    itemId: 'VDPostingdesc',
    title: 'COA',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemsdesc(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                me.generateActionColumndesc(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_indexdata',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'indexdata',
                    hideable: false,
                    text: 'Index Data'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_posting_no',
                    width: 150,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'posting_no',
                    hideable: false,
                    text: 'Posting No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_receipt_no',
                    width: 150,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'receipt_no',
                    hideable: false,
                    text: 'Receipt No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItemsdesc: function () {
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
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: false,
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
                        hidden: false,
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
                id: 'pagingvoucherrequestdesc',
                width: 360,
                displayInfo: true,
                store: 'VDPostingdesc',
                hideRefresh: true,
                listeners: {
                    afterrender: function (tbar) {
                        if (tbar.hideRefresh) {
                            tbar.down('#refresh').hide();
                        }
                    }

                }
            }
        ];
        return dockedItems;
    },
    generateActionColumndesc: function () {
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


