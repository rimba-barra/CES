Ext.define('Cashier.view.revenuesharing.Grid', {
    extend        : 'Cashier.library.template.view.Grid',
    alias         : 'widget.revenuesharinggrid',
    store         : 'Revenuesharing',
    bindPrefixName: 'Revenuesharing',
    newButtonLabel: '',
    initComponent : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            selModel   : Ext.create('Ext.selection.CheckboxModel', {
            }),
            viewConfig: {
            },
            dockedItems: [
                {
                    xtype : 'toolbar',
                    dock  : 'top',
                    height: 28,
                    items : [
                        {
                            xtype     : 'button',
                            action    : 'update',
                            disabled  : true,
                            hidden    : true,
                            itemId    : 'btnEdit',
                            margin    : '0 5 0 0',
                            iconCls   : 'icon-edit',
                            text      : 'Edit',
                            bindAction: me.bindPrefixName + 'Update'
                        },
                        {
                            xtype     : 'button',
                            action    : 'delete',
                            disabled  : true,
                            hidden    : true,
                            itemId    : 'btnDelete',
                            margin    : '0 5 0 0',
                            iconCls   : 'icon-delete',
                            text      : 'Unset RS',
                            bindAction: me.bindPrefixName + 'Delete'
                        },
                        {
                            xtype : 'button',
                            action: 'viewLookup',
                            itemId: 'btnView',
                            margin: '0 5 0 0',
                            iconCls: 'icon-search',
                            text    : 'View',
                            disabled: true
                        },
                        {
                            xtype   : 'button',
                            action  : 'legalitas',
                            itemId  : 'btnLegalitas',
                            margin  : '0 5 0 0',
                            iconCls : 'icon-new',
                            text    : 'Biaya Legalitas',
                            disabled: true
                        },
                        {
                            xtype: 'tbspacer',
                            flex : 1
                        },
                        {
                            xtype : 'button',
                            action: 'action0',
                            align : 'right',
                            width : 50,
                            margin: '0 5 0 0',
                            text  : '<div style="width:15px;height:15px;background-color:none;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> ALL',
                        },
                        {
                            xtype : 'button',
                            action: 'action1',
                            align : 'right',
                            width : 110,
                            margin: '0 5 0 0',
                            text  : '<div style="width:15px;height:15px;background-color:#FCD03D;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Sudah Diset',
                        },
                        {
                            xtype : 'button',
                            action: 'action2',
                            align : 'right',
                            width : 120,
                            margin: '0 5 0 0',
                            text  : '<div style="width:15px;height:15px;background-color:#FFFFFF;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Belum Diset',
                        },
                    ]
                },
                {
                    xtype      : 'pagingtoolbar',
                    dock       : 'bottom',
                    width      : 360,
                    displayInfo: true,
                    store      : this.getStore()
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype    : 'gridcolumn',
                    header   : 'Purchaseletter_ID',
                    dataIndex: 'purchaseletter_id',
                    hidden   : true
                },
                {
                    xtype : 'gridcolumn',
                    itemId: 'colms_cluster_code',
                        //width: '100%',
                    dataIndex: 'cluster_code',
                    hideable : false,
                    text     : 'Cluster Code'
                },
                {
                    xtype : 'gridcolumn',
                    itemId: 'colms_unit_number',
                        //width: '100%',
                    dataIndex: 'unit_number',
                    hideable : false,
                    text     : 'Unit Number'
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_purchaseletter_no',
                    width    : '15%',
                    dataIndex: 'purchaseletter_no',
                    hideable : false,
                    text     : 'Purchaseletter No'
                },
                {
                    xtype : 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    dataIndex: 'purchase_date',
                    hideable : false,
                    text     : 'Purchase Date',
                    renderer : Ext.util.Format.dateRenderer('d-m-Y'),
                    align    : 'center'
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_customer_name',
                    width    : '15%',
                    dataIndex: 'customer_name',
                    hideable : false,
                    text     : 'Customer Name'
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_pricetype',
                    width    : '10%',
                    dataIndex: 'pricetype',
                    hideable : false,
                    text     : 'Pricetype'
                },
                {
                    xtype    : 'booleancolumn',
                    itemId   : 'colms_is_nonppn',
                    width    : 50,
                    resizable: false,
                    align    : 'center',
                    dataIndex: 'is_nonppn',
                    text     : 'Insentif<br/>Pajak',
                    falseText: ' ',
                    trueText : '&#10003;'
                },
                {
                    xtype    : 'numbercolumn',
                    itemId   : 'colms_harga_total_jual',
                    width    : '12%',
                    dataIndex: 'harga_total_jual',
                    hideable : false,
                    text     : 'Harga Total Jual',
                    align    : 'right'
                },
                {
                    xtype    : 'numbercolumn',
                    itemId   : 'colms_total_payment',
                    width    : '12%',
                    dataIndex: 'total_payment',
                    hideable : false,
                    text     : 'Total Payment',
                    align    : 'right'
                },
                {
                    xtype : 'gridcolumn',
                    itemId: 'colms_akad_realisasiondate',
                    dataIndex: 'akad_realisasiondate',
                    hideable : false,
                    text     : 'Tgl. Akad',
                    renderer : Ext.util.Format.dateRenderer('d-m-Y'),
                    align    : 'center'
                },
                {
                    xtype : 'gridcolumn',
                    itemId: 'colms_sppjb_date',
                    dataIndex: 'sppjb_date',
                    hideable : false,
                    text     : 'Tgl. SPPJB',
                    renderer : Ext.util.Format.dateRenderer('d-m-Y'),
                    align    : 'center'
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_ppjb_date',
                    dataIndex: 'ppjb_date',
                    hideable : false,
                    text     : 'Tgl. PPJB',
                    renderer : Ext.util.Format.dateRenderer('d-m-Y'),
                    align    : 'center'
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_progress',
                    width    : '7%',
                    dataIndex: 'progress',
                    hideable : false,
                    text     : '% Konstruksi',
                    align    : 'right'
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_rangebagihasil_name',
                    width    : '10%',
                    dataIndex: 'rangebagihasil_name',
                    hideable : false,
                    text     : 'Range Bagi Hasil Name'
                },
                {
                    xtype    : 'actioncolumn',
                    hidden   : true,
                    itemId   : 'actioncolumn',
                    width    : 50,
                    resizable: false,
                    align    : 'right',
                    hideable : false,
                    items    : [
                        {
                            text      : 'Edit',
                            iconCls   : 'icon-edit',
                            bindAction: me.bindPrefixName + 'Update',
                            altText   : 'Edit',
                            tooltip   : 'Edit'
                        },
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },
    viewConfig: {
        listeners: {
            refresh: function (view) {
                var nodes, node, record, cells, j, i;
                    // get all grid view nodes
                nodes = view.getNodes();
                for (i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                        // get node record
                    record = view.getRecord(node);
                        // get level from record data    
                    if (record.get("set_rs") == "1") {
                        cells = Ext.get(node).query('td');
                            // set bacground color to all row td elements
                        for (j = 0; j < cells.length; j++) {
                            Ext.fly(cells[j]).setStyle('background-color', '#FCD03D');
                        }
                    }
                }
            }
        }
    },
});