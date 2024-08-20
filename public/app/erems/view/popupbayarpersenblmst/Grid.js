Ext.define('Erems.view.popupbayarpersenblmst.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.popupbayarpersenblmstgrid',
    storeConfig: {
        id: 'PopupbayarpersenblmstGridStore',
        idProperty: 'payment_id',
        extraParams: {}
    },
    bindPrefixName: 'Popupbayarpersenblmst',
    newButtonLabel: 'New Form Order AJB',
    initComponent: function () {
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
                    xtype: 'rownumberer',
                    width:30
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster_cluster',
                    text: 'Kawasan'
                },{
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },{
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                },{
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'purchase_date',
                    format:'d-m-Y',
                    hideable: false,
                    text: 'Tanggal Pesanan'
                },{
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Nomor Pesanan'
                },{
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'harga_total_jual',
                    hideable: false,
                    align:'right',
                    text: 'Harga Jual'
                },{
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },{
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'pricetype_pricetype',
                    hideable: false,
                    text: 'Cara Bayar'
                },{
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'total_payment',
                    hideable: false,
                    align:'right',
                    text: 'Total Payment'
                },{
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'persen_bayar',
                    hideable: false,
                    text: 'Bayar %'
                },{
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'last_progress_date',
                    format:'d-m-Y',
                    hideable: false,
                    text: 'Tgl Progress'
                },{
                    xtype: 'numbercolumn',
                
                    width: 100,
                    dataIndex: 'unit_progress',
                    hideable: false,
                    text: 'Progress Bangunan %'
                },
             
                {
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'realisation_serahterima_date',
                    format:'d-m-Y',
                    hideable: false,
                    text: 'Rencana BAST'
                },
                // added by rico 16112021
                {
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'akad_realisasiondate',
                    format:'d-m-Y',
                    hideable: false,
                    text: 'Akad Realisasi Date'
                },
                
              //  me.generateActionColumn()
            ],
            bbar:[
                '',
                {
                    xtype: 'tbfill'
                },
                '',
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    action: 'export_excel',
                    itemId: 'btnPrint',
                    margin: '0 5 0 0',
                    align:'right',
                    iconCls: 'icon-print',
                    text: 'Export Excel'
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
                items: []
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            
           
        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: []
        };
        return ac;
    },
});
