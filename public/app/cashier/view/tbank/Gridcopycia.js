Ext.define('Cashier.view.tbank.Gridcopycia', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.tbankcopyciagrid',
    store: 'Tcashadvance',
    bindPrefixName: 'Tbank',
    itemId: 'Tbankcopycia',
    title: 'Copy Cash in Advance',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 50,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 250,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'Company'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    dataIndex: 'department',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Department'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    dataIndex: 'voucher_no',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Evidence No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_accept_date',
                    dataIndex: 'accept_date',
                    type: 'string',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Accept Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_transno',
                    dataIndex: 'transno',
                    width: 80,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Trans No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
            ]
        });

        me.callParent(arguments);
    },

});


