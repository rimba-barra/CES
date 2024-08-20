Ext.define('Erems.view.biayalegalitas.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.biayalegalitasgrid',
    store:'Biayalegalitas',
    bindPrefixName:'Biayalegalitas',
   // itemId:'',
    newButtonLabel:'New',
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
                    itemId: 'colms_cluster',
                    width: 100,
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster_code',
                    width: 100,
                    dataIndex: 'cluster_code',
                    hideable: false,
                    text: 'Cluster Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit No'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Purchaseletter No'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_nama_customer',
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Nama Customer'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pricetype',
                    width: 100,
                    dataIndex: 'pricetype',
                    hideable: false,
                    text: 'Pricetype'
                },
		{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_netto',
                    width: 100,
                    dataIndex: 'harga_netto',
                    hideable: false,
                    text: 'Harga Netto'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_total_jual',
                    width: 100,
                    dataIndex: 'harga_total_jual',
                    hideable: false,
                    text: 'Harga Total Jual'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_biaya_legal',
                    width: 100,
                    dataIndex: 'biayalegalitas_total',
                    hideable: false,
                    text: 'Biaya Legal'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_va_no',
                    width: 100,
                    dataIndex: 'va_no',
                    hideable: false,
                    text: 'VA Mandiri'
                },
                
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_va_bca',
                    width: 100,
                    dataIndex: 'va_no_bca',
                    hideable: false,
                    text: 'VA BCA'
                },
                
                
				
//                me.generateActionColumn()
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
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
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
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype      : 'button',
                        action     : 'destroy',
                        disabled   : true,
                        hidden     : true,
                        itemId     : 'btnDelete',
                        bindAction : me.bindPrefixName + 'Delete',
                        iconCls    : 'icon-delete',
                        text       : 'Delete Selected'
                    },
                    {
                        xtype    : 'button',
                        action   : 'printout',
                        disabled : true,
                        itemId   : 'btnPrintout',
                        // margin   : '0 5 0 0',
                        iconCls  : 'icon-print',
                        text     : 'Print'
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

});


