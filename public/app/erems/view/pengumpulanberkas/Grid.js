Ext.define('Erems.view.pengumpulanberkas.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.pengumpulanberkasgrid',
    store:'Pengumpulanberkas',
    bindPrefixName:'Pengumpulanberkas',
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
                    itemId: 'colms_block',
                    width: 100,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block'
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
                    itemId: 'colms_purchase_date',
                    width: 100,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
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
                    itemId: 'colms_no_berkas',
                    width: 100,
                    dataIndex: 'berkas_no',
                    hideable: false,
                    text: 'No Berkas'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_spr_ke',
                    width: 100,
                    dataIndex: 'berkas_index',
                    hideable: false,
                    text: 'SPr ke'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tanggal_berkas',
                    width: 100,
                    dataIndex: 'berkas_date',
                    hideable: false,
                    text: 'Tanggal Berkas',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_due_date',
                    width: 100,
                    dataIndex: 'berkas_jatuhtempo_date',
                    hideable: false,
                    text: 'Due Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    width: 130,
                    dataIndex: 'berkas_status_all',
                    hideable: false,
                    text: 'Status (Semua Berkas)'
                }
                
				
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
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Cetak Surat Berkas'
                    },
                    {
                        xtype: 'button',
                        action: 'cetak_surat_berkas',
                        itemId: 'btnCetaksuratberkas',
                        margin: '0 5 0 0',
						//iconCls: 'icon-setting',
                        text: 'Cetak Surat Berkas',
                        disabled: true,
                    },
                    {
                        xtype: 'button',
                        action: 'generate_spr',
                        itemId: 'btnGeneratespr',
                        margin: '0 5 0 0',
						//iconCls: 'icon-setting',
                        text: 'Generate SPr Berkas',
                        disabled: true,
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


