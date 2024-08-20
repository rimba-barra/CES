Ext.define('Erems.view.recommendedtocancel.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.recommendedtocancelgrid',
    store:'Recommendedtocancel',
    bindPrefixName:'Recommendedtocancel',
   // itemId:'',
    newButtonLabel:'New Recommended To Cancel',
	id: 'recommendedtocancelgrid',
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
                    itemId: 'colms_cluster',
                    width: 100,
                    align: 'right',
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
                    itemId: 'colms_customer_name',
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
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
                    itemId: 'colms_type_name',
                    width: 150,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_jual',
                    width: 150,
                    dataIndex: 'harga_jual',
                    text: 'Harga Jual'
                },
		 {
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_netto',
                    width: 150,
                    dataIndex: 'harga_netto',
                    text: 'Harga Netto'
                },
		{
                    xtype: 'numbercolumn',
                    itemId: 'colms_total_payment',
                    width: 150,
                    dataIndex: 'total_payment',
                    text: 'Total Bayar'
                },
				{
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_pay',
                    width: 50,
                    resizable: false,
                    align: 'center',
                    dataIndex: 'is_pay',
                    text: 'Pays',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_salesman',
                    width: 150,
                    dataIndex: 'salesman_name',
                    hideable: false,
                    text: 'Salesman'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_clubname',
                    width: 150,
                    dataIndex: 'clubname',
                    hideable: false,
                    text: 'Citra Club Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pricetype',
                    width: 100,
                    dataIndex: 'pricetype',
                    hideable: false,
                    text: 'Price Type'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_bank_name',
                    width: 150,
                    dataIndex: 'bank_name',
                    hideable: false,
                    text: 'Bank Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_progress',
                    width: 75,
                    dataIndex: 'progress',
                    hideable: false,
                    text: 'Progress'
                },
				/*{
                    xtype: 'gridcolumn',
                    itemId: 'colms_berkas',
                    width: 150,
                    dataIndex: 'berkas',
                    hideable: false,
                    text: 'Berkas'
                },*/
				{
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_alreadyakad',
                    width: 50,
                    resizable: false,
                    align: 'center',
                    dataIndex: 'is_alreadyakad',
                    text: 'Akad',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
				/*{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pengakuan',
                    width: 150,
                    dataIndex: 'pengakuan',
                    hideable: false,
                    text: 'Pengakuan'
                },*/
				/*{
                    xtype: 'gridcolumn',
                    itemId: 'colms_uangmukatype',
                    width: 150,
                    dataIndex: 'uangmukatype',
                    hideable: false,
                    text: 'Jenis UM'
                },*/
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_recommended_tocancel',
                    width: 150,
                    dataIndex: 'recommended_tocancel',
                    hideable: false,
                    text: 'Recommended By'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_recommended_tocancel_date',
                    width: 150,
                    dataIndex: 'recommended_tocancel_date',
                    hideable: false,
                    text: 'Recommended Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
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
                        xtype: 'button',
						hidden: false,
						disabled: true,
						itemId: 'btnViewNote',
						margin: '0 5 0 0',
						action: 'viewnote',
						iconCls: 'icon-search',
						text: 'View Note'
                    },
					{
                        xtype: 'button',
						hidden: false,
						disabled: true,
						itemId: 'btnCreateCancellation',
						margin: '0 5 0 0',
						action: 'createcancellation',
						iconCls: 'icon-new',
						text: 'Cancel Purchaseletter'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: false,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    },
                    // added by rico 06042023
                    {
                        xtype: 'button',
                        action: 'printdocument',
                        hidden: false,
                        disabled: true,
                        itemId: 'btnPrintDocument',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Documents'
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
    },
	
	/*generateActionColumn: function() {
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
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };
        return ac;
    }*/
});


