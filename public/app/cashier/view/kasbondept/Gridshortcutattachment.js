Ext.define('Cashier.view.kasbondept.Gridshortcutattachment', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.kasbondeptgridshortcutattachment',
    store: 'Kasbondeptshortcutattachment',
    bindPrefixName: 'KasbondeptshortcutAttachment',
    itemId: 'Kasbondepshortcutattachment',
    title: 'COA',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemscustome(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            features: [
                {
                    ftype: 'summary',
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                //me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    width: 250,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'filename',
                    hideable: false,
                    text: 'File Name.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_filesize',
                    width: 55,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'filesize',
                    hideable: false,
                    text: 'Size(Kb).'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remarks',
                    width: 250,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    width: 140,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Addon'
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItemscustome: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                  /*  {
                        text: 'Add attachment',
                        itemId: 'btnAddattachment',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    }, */
                    {
                        text: 'View',
                        itemId: 'btnReadattachment',
                        action: 'read',
                        iconCls: 'icon-search',
                        bindAction: me.bindPrefixName + 'Read'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingkasbondeptshortcutattachment',
                width: 360,
                displayInfo: true,
                store: 'Kasbondeptshortcutattachment',
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
                    defaultIcon: 'icon-search',
                    iconCls: ' ux-actioncolumn icon-search act-update',
                    action: 'view',
                    itemId: 'btnView',
                    altText: 'View Attachment',
                    tooltip: 'View Attachment'
                }
            ]
        }
        return ac;

    },
});


