Ext.define('Erems.view.backlog.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.backloggrid',
    storeConfig: {
        id: 'BacklogGridStore',
        idProperty: 'payment_id',
        extraParams: {}
    },
    bindPrefixName: 'Backlog',
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
                    width: 70,
                    align: 'center',
                    dataIndex: 'cluster_cluster',
                    text: 'Cluster'
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
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'unit_land_size',
                    hideable: false,
                    text: 'LT'
                },{
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'unit_building_size',
                    hideable: false,
                    text: 'LB'
                },{
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Pembeli'
                },{
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'pricetype_pricetype',
                    hideable: false,
                    text: 'Carabayar'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'backlog_saldo_um_gl',
                    hideable: false,
                    text: 'Saldo_UM_GL'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'backlog_penerimaan',
                    hideable: false,
                    text: 'Penerimaan'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'backlog_proyeksi',
                    hideable: false,
                    text: 'Proyeksi'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'price_harga_tanah',
                    hideable: false,
                    text: 'Hrg Tanah'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'price_harga_bangunan',
                    hideable: false,
                    text: 'HrgBangunan'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'price_harga_neto',
                    hideable: false,
                    text: 'HrgNetto'
                },{
                   xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'backlog_hpp_tanah',
                    hideable: false,
                    text: 'HppTanah'
                },{
                   xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'backlog_hpp_bangunan',
                    hideable: false,
                    text: 'Hpp Bangunan'
                },{
                   xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'backlog_hpp_total',
                    hideable: false,
                    text: 'Hpp Total'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'backlog_potensial_ar',
                    hideable: false,
                    text: 'Potensial_AR'
                },{
                   xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'price_harga_ppnbangunan',
                    hideable: false,
                    text: 'PPN'
                },{
                   xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'price_harga_bbnsertifikat',
                    hideable: false,
                    text: 'BBN'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'price_harga_bajb',
                    hideable: false,
                    text: 'AJB'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'price_harga_bphtb',
                    hideable: false,
                    text: 'BPHTB'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'price_harga_administrasi',
                    hideable: false,
                    text: 'Adm'
                },{
                   xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'harga_total_jual',
                    hideable: false,
                    text: 'Sales Price'
                },{
                   xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'backlog_potensial_receivable',
                    hideable: false,
                    text: 'Potensial_Receivable'
                },{
                    xtype: 'numbercolumn',
                    width: 120,
                    align:'right',
                    dataIndex: 'unit_progress',
                    hideable: false,
                    text: 'Progres Konstruksi'
                },{
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    width: 70,
                    dataIndex: 'rencana_serahterima_date',
                    hideable: false,
                    text: 'Rencana Serah Terima'
                },{
                    xtype: 'numbercolumn',
                    width: 70,
                    align:'right',
                    dataIndex: 'persen_bayar',
                    hideable: false,
                    text: 'Persen Bayar'
                }
                
              //  me.generateActionColumn()
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
