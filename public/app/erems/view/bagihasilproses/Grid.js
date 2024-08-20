Ext.define('Erems.view.bagihasilproses.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.bagihasilprosesgrid',
    store:'Bagihasilproses',
    bindPrefixName:'Bagihasilproses',
   // itemId:'',
    newButtonLabel:'New LRP Process',
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
                    itemId: 'colms_purchaseletter_id',
                    width: 50,
                    align: 'right',
					hidden: true,
                    dataIndex: 'purchaseletter_id',
                    text: 'ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    width: 100,
					hideable: false,
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 60,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 60,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_landsize',
                    width: 80,
                    dataIndex: 'land_size',
                    hideable: false,
                    text: 'Land Size'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelebihan',
                    width: 100,
                    dataIndex: 'kelebihan',
                    hideable: false,
                    text: 'Land Over size'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_building_size',
                    width: 80,
                    dataIndex: 'building_size',
                    hideable: false,
                    text: 'Building Size'
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
                    itemId: 'colms_firstpurchase_date',
                    width: 120,
                    dataIndex: 'firstpurchase_date',
                    hideable: false,
                    text: 'First Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    width: 120,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
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
                    width: 100,
					hideable: false,
                    dataIndex: 'pricetype',
                    text: 'Price Type'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_netto',
                    width: 150,
                    dataIndex: 'harga_netto',
					align: 'right',
                    hideable: false,
                    text: 'Harga Netto'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_total_jual',
                    width: 150,
                    dataIndex: 'harga_total_jual',
					align: 'right',
                    hideable: false,
                    text: 'Harga Total Jual'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_total_payment',
                    width: 150,
                    dataIndex: 'total_payment',
					align: 'right',
                    hideable: false,
                    text: 'Total Bayar'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_progress_contruction',
                    width: 150,
                    dataIndex: 'progress_contruction',
					align: 'right',
                    hideable: false,
                    text: 'Construction Progress (%)'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_progress_pembayaran',
                    width: 150,
                    dataIndex: 'progress_pembayaran',
					align: 'right',
                    hideable: false,
                    text: 'Payment Percentage (%)'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_cogs',
                    width: 150,
                    dataIndex: 'cogs',
					align: 'right',
                    hideable: false,
                    text: 'COGS'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_nlrp',
                    width: 150,
                    dataIndex: 'nlrp',
					align: 'right',
                    hideable: false,
                    text: 'Nilai LRP (Maximum)'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_total_nlrp',
                    width: 150,
                    dataIndex: 'total_nlrp',
					align: 'right',
                    hideable: false,
                    text: 'Total LRP Sudah Dibagi'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_bunga_lrp_amount',
                    width: 150,
                    dataIndex: 'bunga_lrp_amount',
					align: 'right',
                    hideable: false,
                    text: 'Bunga LRP'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_bunga_lrp_amount_paid',
                    width: 150,
                    dataIndex: 'bunga_lrp_amount_paid',
					align: 'right',
                    hideable: false,
                    text: 'Bunga LRP Sudah Dibagi'
                },
				
				
                me.generateActionColumn()
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
                        xtype      : 'button',
                        action     : 'create',
                        hidden     : true,
                        itemId     : 'btnNew',
                        margin     : '0 5 0 0',
                        iconCls    : 'icon-new',
                        bindAction : me.bindPrefixName + 'Create',
                        text       : me.newButtonLabel
                    },
                    {
                        xtype   : 'button',
                        action  : 'update_bunga',
                        itemId  : 'btnBunga',
                        margin  : '0 5 0 0',
                        iconCls : 'icon-new',
                        text    : 'LRP Interest Process (Bunga)',
                        ctxMenu : true,
                    },
                    {
                        xtype   : 'button',
                        action  : 'summary_report',
                        itemId  : 'btnSummary',
                        margin  : '0 5 0 0',
                        iconCls : 'icon-new',
                        text    : 'Summary Report',
                        ctxMenu : true,
                    },
                    // {
                        // xtype: 'button',
                        // action: 'destroy',
                        // disabled: true,
                        // hidden: true,
                        // itemId: 'btnDelete',
                        // bindAction: me.bindPrefixName + 'Delete',
                        // iconCls: 'icon-delete',
                        // text: 'Delete Selected'
                    // },
                    // {
                        // xtype: 'button',
                        // action: 'print',
                        // hidden: true,
                        // itemId: 'btnPrint',
                        // margin: '0 5 0 0',
                        // bindAction: me.bindPrefixName + 'Print',
                        // iconCls: 'icon-print',
                        // text: 'Print / Save'
                    // }
                ]
            },
            {
                xtype       : 'pagingtoolbar',
                dock        : 'bottom',
                width       : 360,
                displayInfo : true,
                store       : this.getStore()
            }
        ];
        return dockedItems;
    }
	
});


