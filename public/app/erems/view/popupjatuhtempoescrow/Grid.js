/// Create by Erwin.S 15042021
Ext.define('Erems.view.popupjatuhtempoescrow.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.popupjatuhtempoescrowgrid',
    store          : 'Popupjatuhtempoescrow',
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
                    itemId: 'colms_cluster',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type_name',
                    width: 150,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_plafon',
                    width: 150,
                    dataIndex: 'plafon',
                    hideable: false,
                    text: 'Plafon'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_persen_pencairan',
                    width: 75,
                    dataIndex: 'persen_pencairan',
                    hideable: false,
                    text: '% Pencairan'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_nilai_cair',
                    width: 150,
                    dataIndex: 'nilai_cair',
                    hideable: false,
                    align: 'right',
                    text: 'Nilai Cair'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_duedate_escrow',
                    width: 150,
                    dataIndex: 'duedate_escrow',
                    hideable: false,
                    text: 'Target (Due Date Escrow)',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_firstpurchase_date',
                    width: 150,
                    dataIndex: 'firstpurchase_date',
                    hideable: false,
                    text: 'First Purchase Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    width: 150,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Purchase Letter No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pricetype',
                    width: 150,
                    dataIndex: 'pricetype',
                    hideable: false,
                    text: 'Price Type'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_plafon_kpr',
                    width: 150,
                    dataIndex: 'plafon_kpr',
                    hideable: false,
                    text: 'Plafon KPR'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_bank_kpr',
                    width: 150,
                    dataIndex: 'bank_kpr',
                    hideable: false,
                    text: 'Bank KPR'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_netto',
                    width: 150,
                    dataIndex: 'harga_netto',
                    hideable: false,
                    text: 'Harga Netto'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_total_jual',
                    width: 150,
                    dataIndex: 'harga_total_jual',
                    hideable: false,
                    text: 'Harga Total Jual'
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
                        itemId: 'btnExport',
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
