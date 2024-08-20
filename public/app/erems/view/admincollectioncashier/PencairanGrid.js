Ext.define('Erems.view.admincollectioncashier.PencairanGrid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.admincollectioncashierpencairangrid',
    store: 'Pencairankprcashier',
   	bindPrefixName: 'Pencairankprcashier',
    newButtonLabel: 'New Pencairan',
    height: 200,
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
                    itemId: 'colms_keterangan',
                    width: 120,
                    dataIndex: 'keterangan',
                    text: 'Keterangan'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_escrow_date',
                    width: 70,
                    dataIndex: 'escrow_date',
                    hideable: false,
                    text: 'Escrow Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pengajuan_berkas_date',
                    width: 70,
                    dataIndex: 'pengajuan_berkas_date',
                    hideable: false,
                    text: 'Pengajuan<br>Berkas Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pencairan_date',
                    width: 70,
                    dataIndex: 'pencairan_date',
                    hideable: false,
                    text: 'Cair Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_persen_progress',
                    width: 55,
                    dataIndex: 'persen_progress',
                    hideable: false,
                    text: '%<br>Progress',
					align: 'right'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_persen_pencairan',
                    width: 55,
                    dataIndex: 'persen_pencairan',
                    hideable: false,
                    text: '%<br>Pencairan',
					align: 'right'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_duedate_escrow',
                    width: 70,
                    dataIndex: 'duedate_escrow',
                    hideable: false,
                    text: 'Due Date<br>Escrow',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'adada',
                    width: 70,
                    dataIndex: 'no_voucher',
                    hideable: false,
                    text: 'No.Voucher',
					
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_pencairan_amount',
                    width: 100,
                    dataIndex: 'pencairan_amount',
                    hideable: false,
                    text: 'Nilai Cair',
					align: 'right'
                },
				
				me.generateActionColumn()
            ],
			bbar: [
			{
                xtype: 'button',
                hidden: false,
                itemId: 'btnPrintSchema',
                margin: '0 5 0 0',
                action: 'printschema',
                iconCls: 'icon-print',
                text: 'Print',
			},
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
                hidden: false,
                itemId: 'btnSynchDueDate',
                margin: '0 5 0 0',
                action: 'synchduedate',
                iconCls: 'icon-refresh',
                text: 'SYNCH DUE DATE',
			},
			{
                xtype: 'button',
                hidden: false,
                itemId: 'btnSynchProgress',
                margin: '0 5 0 0',
                action: 'synchprogress',
                iconCls: 'icon-refresh',
                text: 'SYNCH PROGRESS',
			},
			{
                xtype: 'button',
                hidden: false,
                itemId: 'btnAddSchema',
                margin: '0 5 0 0',
                action: 'addschema',
                iconCls: 'icon-new',
                text: 'ADD NEW',
			},
			{
                xtype: 'button',
                hidden: false,
                itemId: 'btnGenerateSchema',
                margin: '0 5 0 0',
                action: 'generateschema',
                iconCls: 'icon-new',
                text: 'GENERATE SCHEMA',
			}
            ]
        });

        me.callParent(arguments);
    },
	
	generateDockedItems: function() {
		
        var me = this;

        var dockedItems = [
            /*{
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
                    }
                ]
            },*/
            /*{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
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
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName+'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };
        return ac;
    }
	
});