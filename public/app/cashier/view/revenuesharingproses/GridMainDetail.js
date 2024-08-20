Ext.define('Cashier.view.revenuesharingproses.GridMainDetail', {
    extend        : 'Cashier.library.template.view.Grid',
    alias         : 'widget.revenuesharingprosesdetailgrid',
    store         : 'Revenuesharingprosesdetail',
    bindPrefixName: 'Revenuesharingprosesdetail',
    initComponent : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: {},
            dockedItems: me.generateDockedItems(),
            viewConfig : {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype : 'gridcolumn',
                width : 100,
                hidden: false
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_cluster',
                    width    : 100,
                    hideable : false,
                    dataIndex: 'cluster_code',
                    text     : 'Cluster Code'
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_unit_number',
                    width    : 60,
                    dataIndex: 'unit_number',
                    hideable : false,
                    text     : 'Unit'
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_payment_date',
                    width    : 80,
                    dataIndex: 'payment_date',
                    hideable : false,
                    text     : 'Payment Date',
                    renderer : Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype    : 'numbercolumn',
                    itemId   : 'colms_payment',
                    width    : 150,
                    dataIndex: 'payment',
                    align    : 'right',
                    hideable : false,
                    text     : 'Payment Value'
                },
                {
                    xtype    : 'numbercolumn',
                    itemId   : 'colms_rs_payment',
                    width    : 150,
                    dataIndex: 'rs_payment',
                    align    : 'right',
                    hideable : false,
                    text     : 'Revenue Sharing Value'
                },
                {
                    xtype    : 'numbercolumn',
                    itemId   : 'colms_rs_total_partner_dpp',
                    width    : 150,
                    dataIndex: 'rs_total_partner_dpp',
                    align    : 'right',
                    hideable : false,
                    text     : 'RS-Partner-DPP'
                },
                {
                    xtype    : 'numbercolumn',
                    itemId   : 'colms_rs_total_partner_ppn',
                    width    : 150,
                    dataIndex: 'rs_total_partner_ppn',
                    align    : 'right',
                    hideable : false,
                    text     : 'RS-Partner-PPN'
                },
                {
                    xtype    : 'numbercolumn',
                    itemId   : 'colms_rs_total_partner_pph',
                    width    : 150,
                    dataIndex: 'rs_total_partner_pph',
                    align    : 'right',
                    hideable : false,
                    text     : 'RS-Partner-PPH'
                },
                {
                    xtype    : 'numbercolumn',
                    itemId   : 'colms_rs_total_ciputra_dpp',
                    width    : 150,
                    dataIndex: 'rs_total_ciputra_dpp',
                    align    : 'right',
                    hideable : false,
                    text     : 'RS-Ciputra-DPP'
                },
                {
                    xtype    : 'numbercolumn',
                    itemId   : 'colms_rs_total_ciputra_ppn',
                    width    : 150,
                    dataIndex: 'rs_total_ciputra_ppn',
                    align    : 'right',
                    hideable : false,
                    text     : 'RS-Ciputra-PPN'
                },
                {
                    xtype    : 'numbercolumn',
                    itemId   : 'colms_rs_total_ciputra_pph',
                    width    : 150,
                    dataIndex: 'rs_total_ciputra_pph',
                    align    : 'right',
                    hideable : false,
                    text     : 'RS-Ciputra-PPH'
                },
            ]
        });

        me.callParent(arguments);
    },

    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype      : 'pagingtoolbar',
                dock       : 'bottom',
                width      : 360,
                displayInfo: true,
                store      : this.getStore()
            }
        ];
        return dockedItems;
    }
});