Ext.define('Cashier.view.voucher.AttachmentdetailGrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.voucherattachmentdetailgrid',
    storeConfig: {
        id: 'AttachmentdetailGridStore',
        idProperty: 'attachment_id',
        extraParams: {
            mode_read: 'voucherattachment',
            kasbank_id: 0
        },
    },
    height: 200,
    bindPrefixName: 'Voucher',
    itemId: 'Voucherattachmentdetailgrid',
    title: 'Attachment',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
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
                    width: 50,
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
                    itemId: 'colms_module',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'module',
                    hideable: false,
                    text: 'Module'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    width: 110,
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
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
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
                        itemId: 'btnDeleteAtc',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        text: 'View',
                        itemId: 'btnReadattachment',
                        action: 'read',
                        iconCls: 'icon-search',
                        bindAction: me.bindPrefixName + 'Read'
                    }
                ]
            },
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


