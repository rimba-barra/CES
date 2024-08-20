Ext.define('Erems.view.biayalegalitas.browse.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.biayalegalitasbrowsegrid',
    store: 'Purchaseletterbl',
    bindPrefixName: 'Purchaseletter',
    
    newButtonLabel: 'New Purchaseletter',
    initComponent: function() {
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
                    itemId: 'colms_kawasan',
                    width: 150,
                    align: 'right',
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster_code',
                    width: 150,
                    align: 'right',
                    dataIndex: 'cluster_code',
                    text: 'Cluster Code'
                },
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_block',
//                    width: 80,
//                    dataIndex: 'block',
//                    hideable: false,
//                    text: 'Block'
//                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 80,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_nomor_pesanan',
                    width: 120,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Purchase Letter No.'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 100,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pricetype',
                    width: 100,
                    dataIndex: 'pricetype',
                    hideable: false,
                    text: 'Pricetype'
                },{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_netto',
                    width: 100,
                    dataIndex: 'harga_netto',
                    hideable: false,
                    text: 'Harga Netto'
                },{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_total_jual',
                    width: 100,
                    dataIndex: 'harga_total_jual',
                    hideable: false,
                    text: 'Harga Total Jual'
                },{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_bphtb',
                    width: 100,
                    dataIndex: 'harga_bphtb',
                    hideable: false,
                    text: 'BPHTB'
                },{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_bbnsertifikat',
                    width: 100,
                    dataIndex: 'harga_bbnsertifikat',
                    hideable: false,
                    text: 'BBN'
                },{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_bajb',
                    width: 100,
                    dataIndex: 'harga_bajb',
                    hideable: false,
                    text: 'BAJB'
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'purpose_code',
                    hideable: false,
                    hidden: true,
                    text: 'purpose_code',
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
                dock: 'bottom',
         
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        hidden: false,
                        itemId: 'btnNews',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-new',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'Select Unit'
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