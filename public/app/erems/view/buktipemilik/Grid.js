Ext.define('Erems.view.buktipemilik.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.buktipemilikgrid',
    store: 'Buktipemilik',
    bindPrefixName: 'Buktipemilik',
    newButtonLabel: 'New Bukti Kepemilikan',
	id: 'buktipemilikgrid',
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
                    xtype: 'rownumberer',
                    width: 40,
					resizable: true
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kawasan',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 100,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cust_name',
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
                    xtype: 'gridcolumn',
                    itemId: 'colms_imb_no',
                    width: 150,
                    dataIndex: 'imb_no',
                    hideable: false,
                    text: 'IMB Number'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_imb_date',
                    width: 150,
                    dataIndex: 'imb_date',
                    hideable: false,
                    text: 'IMB Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_imb_buy_date',
                    width: 150,
                    dataIndex: 'imb_buy_date',
                    hideable: false,
                    text: 'IMB Date Beli',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_imb_legal_date',
                    width: 150,
                    dataIndex: 'imb_legal_date',
                    hideable: false,
                    text: 'IMB Date Legal',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_imb_pecahan_no',
                    width: 150,
                    dataIndex: 'imb_pecahan_no',
                    hideable: false,
                    text: 'IMB No (Pecahan)'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_reg_pecahan_date',
                    width: 150,
                    dataIndex: 'reg_pecahan_date',
                    hideable: false,
                    text: 'Tgl. Reg (Pecahan)',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_imb_khusus_no',
                    width: 150,
                    dataIndex: 'imb_khusus_no',
                    hideable: false,
                    text: 'IMB No (Khusus)'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_reg_khusus_date',
                    width: 150,
                    dataIndex: 'reg_khusus_date',
                    hideable: false,
                    text: 'Tgl. Reg (Khusus)',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_payment_percentage',
                    width: 150,
                    dataIndex: 'payment_percentage',
					align: 'right',
                    hideable: false,
                    text: 'Progress Pembayaran (%)'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_total_remaining_denda',
                    width: 150,
                    dataIndex: 'total_remaining_denda',
					align: 'right',
                    hideable: false,
                    text: 'Remaining Denda'
                },
                		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_type_name',
                    width: 150,
                    dataIndex: 'unit_type_name',
                    hideable: false,
                    text: 'Type Unit'
                },
                		{
                    xtype: 'numbercolumn',
                    itemId: 'colms_unit_land_size',
                    width: 150,
                    dataIndex: 'unit_land_size',
                    hideable: false,
                    text: 'Luas Tanah'
                },
                		{
                    xtype: 'numbercolumn',
                    itemId: 'colms_unit_building_size',
                    width: 150,
                    dataIndex: 'unit_building_size',
                    hideable: false,
                    text: 'Luas Bangunan'
                },
				/*{
                    xtype: 'gridcolumn',
                    itemId: 'colms_imb_note',
                    width: 300,
                    dataIndex: 'imb_note',
                    hideable: false,
                    text: 'Notes'
                },*/
                /*{
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    width: 150,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Added Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },*/
                
                //me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
	
	//===========================
	generateContextMenu:function(){
     var contextmenu = [
     {
     text: 'Coba',
     itemId: 'mnuEdit',
     iconCls: 'icon-form-add',
     action: 'update'
     },
     {
     text: 'Delete',
     itemId: 'mnuDelete',
     iconCls: 'icon-delete',
     action: 'destroy'
     }
     ];
     return contextmenu;
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
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName+'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName+'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName+'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName+'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    },
					{
                        xtype: 'button',
                        action: 'view',
                        hidden: false,
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        //padding:5,
                        iconCls: 'icon-search',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'View',
						disabled: true
                    },
					//add on 3 nov 2016
					{
                        xtype: 'button',
                        action: 'viewpphpayment',
                        hidden: false,
                        itemId: 'btnViewPphPayment',
                        margin: '0 5 0 0',
                        //padding:5,
                        iconCls: 'icon-form',
                        text: 'View PPH Payment',
						disabled: true
                    },
					//end add 3 nov 2016
                    // added by rico 06042023
                    {
                        xtype: 'button',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnPrintCoverNotes',
                        margin: '0 0 0 0',
                        action: 'printcovernotes',
                        iconCls: 'icon-print',
                        text: 'Cover Notes',
                    },
                    // added by rico 14082023
                    {
                        xtype: 'button',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnPrintOrderAkta',
                        margin: '0 0 0 0',
                        action: 'printorderakta',
                        iconCls: 'icon-print',
                        text: 'Order Akta Pinjam Pakai',
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnPrintSuratBiaya',
                        margin: '0 0 0 0',
                        action: 'printsuratbiaya',
                        iconCls: 'icon-print',
                        text: 'Surat Biaya Legalitas',
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnPrintOrderAJB',
                        margin: '0 0 0 0',
                        action: 'printorderajb',
                        iconCls: 'icon-print',
                        text: 'Order AJB',
                    },
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
            items: [
               
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName+'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
				{
                    text: 'View',
                    iconCls: 'icon-search',
                    //bindAction: me.bindPrefixName+'Update',
                    altText: 'View',
                    tooltip: 'View'
                }
                /*{
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName+'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }*/
            ]
        };
        return ac;
    }

});