Ext.define('Erems.view.sspssb.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.sspssbgrid',
    store: 'Sspssb',
    bindPrefixName: 'Sspssb',
    newButtonLabel: 'New SSP & SSB',
	id: 'sspssbgrid',
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
                    itemId: 'colms_tax_year',
                    width: 100,
                    align: 'right',
                    dataIndex: 'tax_year',
                    text: 'Tahun Pajak'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_nop',
                    width: 150,
                    dataIndex: 'nop',
                    text: 'NOP'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_jual',
                    width: 150,
                    dataIndex: 'harga_jual',
					align: 'right',
                    hideable: false,
                    text: 'Harga Jual'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_npop',
                    width: 150,
                    dataIndex: 'npop',
					align: 'right',
                    hideable: false,
                    text: 'NPOP'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_npoptkp',
                    width: 150,
                    dataIndex: 'npoptkp',
					align: 'right',
                    hideable: false,
                    text: 'NPOPTKP'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_npopkp',
                    width: 150,
                    dataIndex: 'npopkp',
					align: 'right',
                    hideable: false,
                    text: 'NPOPKP'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_bphtb_persen',
                    width: 100,
                    dataIndex: 'bphtb_persen',
					align: 'right',
                    hideable: false,
                    text: '% BPHTB'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_bphtb_value',
                    width: 150,
                    dataIndex: 'bphtb_value',
					align: 'right',
                    hideable: false,
                    text: 'BPHTB'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_totalbayar_value',
                    width: 150,
                    dataIndex: 'totalbayar_value',
					align: 'right',
                    hideable: false,
                    text: 'Total Bayar'
                },
				
                /*{
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    width: 150,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Added Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },*/
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
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
                },
				{
                    text: 'View',
                    iconCls: 'icon-search',
                    className:'view',
                    bindAction: me.bindPrefixName + 'Read',
                    altText: 'View',
                    tooltip: 'View'
                }
            ]
        };
        return ac;
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
                        text: 'Print / Save'
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