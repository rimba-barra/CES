Ext.define('Cashier.view.vdrequest.Gridapprovaldetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vdrequestgridapprovaldetail',
    store: 'VDRequestapprovaldetail',
    bindPrefixName: 'VDRequestapprovalDetail',
    itemId: 'VDRequestapprovaldetail',
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
                    itemId: 'colms_apptype',
                    width: 50,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'approval_type',
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sequence',
                    width: 50,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'sequence',
                    hideable: false,
                    text: 'Level'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_appstatus',
                    width: 50,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'approval_status',
                    hideable: false,
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_appby',
                    width: 300,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'approval_by',
                    hideable: false,
                    text: 'Approval By',
                    renderer: function (value, metaData, record) {
                        return record.get('user_email') + ' ('+record.get('user_fullname')+')';
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_appnotes',
                    width: 250,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'approval_notes',
                    hideable: false,
                    text: 'Notes'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_appdate',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'approval_date',
                    hideable: false,
                    text: 'Approve Date'
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
                    {
                        xtype: 'button',
                        action: 'refresh',
                        disabled: true,
                        padding: '0 0 10 0',
                        itemId: 'btnRefresh',
                        margin: '0 0 10 0',
                        iconCls: 'icon-refresh',
                        text: 'Refresh',
                        bindAction: me.bindPrefixName + 'Read'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        padding: '0 0 10 0',
                        itemId: 'btnEdit',
                        margin: '0 0 10 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        itemId: 'btnDelete',
                        padding: '0 0 10 0',
                        margin: '0 0 10 0',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'trackingapproval',
                        // disabled: true,
                        itemId: 'btnTracking',
                        padding: '0 0 10 0',
                        margin: '0 0 10 0',
                        iconCls: 'icon-search',
                        text: 'Log'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingvoucherrequestdetail',
                width: 360,
                displayInfo: true,
                store: 'VDRequestapprovaldetail',
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
                    altText: 'View approval',
                    tooltip: 'View approval'
                }
            ]
        }
        return ac;

    },
});


