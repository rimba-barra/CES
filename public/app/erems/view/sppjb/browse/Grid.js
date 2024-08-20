Ext.define('Erems.view.sppjb.browse.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.sppjbbrowsegrid',
    store: 'Purchaseletterv2',
    bindPrefixName: 'Purchaseletter',
    
    newButtonLabel: 'New Purchaseletter',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: { 
              selType: 'checkboxmodel',
              mode: 'SINGLE',
              allowDeselect: true               
            },
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
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 80,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 80,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 70,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tanggal_pesanan',
                    width: 130,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Letter Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_nomor_pesanan',
                    width: 120,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Purchase Letter No.'
                },{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_jual',
                    width: 100,
                    dataIndex: 'harga_jual',
                    hideable: false,
                    text: 'Harga Jual'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 100,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },{
                    xtype: 'numbercolumn',
                    itemId: 'colms_total_payment',
                    width: 100,
                    dataIndex: 'total_payment',
                    hideable: false,
                    text: 'Total Payment'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_sales_name',
                    width: 100,
                    dataIndex: 'salesman_name',
                    hideable: false,
                    text: 'Sales Name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_member_name',
                    width: 100,
                    dataIndex: 'clubname',
                    hideable: false,
                    text: 'Member Name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tgl_akad',
                    width: 100,
                    dataIndex: 'akad_realisasiondate',
                    hideable: false,
                    text: 'Tgl Akad',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_jenis_um',
                    width: 100,
                    dataIndex: 'uangmukatype',
                    hideable: false,
                    text: 'Jenis UM'
                }
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