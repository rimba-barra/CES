Ext.define('Cashier.view.voucher.ApprovaldetailGrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.voucherapprovaldetailgrid',
    storeConfig: {
        id: 'GridapprovaldetailStore',
        idProperty: 'voucher_approval_id',
        extraParams: {
            mode_read: 'voucherapprovaldetail',
            kasbank_id: 0
        },
    },
    bindPrefixName: 'Voucher',
    itemId: 'Voucherapprovaldetailgrid',
    title: 'COA',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
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
                    width: 150,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'approval_by_email',
                    hideable: false,
                    text: 'Approval By'
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


