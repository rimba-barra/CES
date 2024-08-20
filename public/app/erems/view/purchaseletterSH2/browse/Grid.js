Ext.define('Erems.view.purchaseletter.browse.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.purchaseletterbrowsegrid',
    store: 'Purchaseletter',
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
                    width: 60,
                    align: 'right',
                    dataIndex: 'cluster',
                    text: 'Kawasan'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 70,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Block / Kav'
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
                    width: 100,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Tanggal Pesanan'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_nomor_pesanan',
                    width: 120,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Nomor Pesanan'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_harga_jual',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Harga Jual'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Customer Name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_total_payment',
                    width: 100,
                    dataIndex: 'total_payment',
                    hideable: false,
                    text: 'Total Payment'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_sales_name',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Sales Name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_member_name',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Member Name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tgl_akad',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Tgl Akad'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_jenis_um',
                    width: 100,
                    dataIndex: 'code',
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