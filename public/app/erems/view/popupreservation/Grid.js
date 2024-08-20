/// Create by Rico 15072021
Ext.define('Erems.view.popupreservation.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.popupreservationgrid',
    store          : 'Popupreservation',
    bindPrefixName : '',
    newButtonLabel : 'New',
    initComponent  : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : {},
            defaults    : {
                xtype : 'gridcolumn',
                width : 100,
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'reservation_no',
                    width: 150,
                    dataIndex: 'reservation_no',
                    hideable: false,
                    text: 'Reservation No'
                },
                {
                    xtype: 'gridcolumn',
                    width: 130,
                    align: 'center',
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    align: 'center',
                    dataIndex: 'block_code',
                    hideable: false,
                    text: 'Block Code'
                },
                 {
                    xtype: 'gridcolumn',
                    width: 70,
                    align: 'center',
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },
                {
                    xtype:'datecolumn',
                    dataIndex: 'reservation_date',
                    text: ' Reservation Date',
                    format:'d-m-Y'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'customer_name',
                    width: 120,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'submit_by',
                    width: 100,
                    dataIndex: 'submit_by',
                    hideable: false,
                    text: 'Sales Name'
                },
                {
                    xtype:'booleancolumn',
                    dataIndex:'is_approve',
                    text:'Approved',
                    align: 'center',
                    falseText: ' ',
                    width: 70,
                    trueText: '&#10003;'
                },
                {
                    xtype:'datecolumn',
                    dataIndex: 'approve_date',
                    text: ' Approve Date',
                    format:'d-m-Y'
                },
                {
                    xtype:'booleancolumn',
                    dataIndex:'is_reject',
                    text:'Rejected',
                    align: 'center',
                    falseText: ' ',
                    width: 70,
                    trueText: '&#10003;'
                },
                {
                    xtype:'datecolumn',
                    dataIndex: 'reject_date',
                    text: 'Reject Date',
                    format:'d-m-Y'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'status',
                    width: 60,
                    dataIndex: 'status',
                    hideable: false,
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'progress',
                    width: 60,
                    dataIndex: 'progress',
                    hideable: false,
                    text: 'Progress'
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'export_excel',
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export Excel'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    }
});
