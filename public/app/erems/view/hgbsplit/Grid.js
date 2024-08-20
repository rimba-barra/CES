Ext.define('Erems.view.hgbsplit.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.hgbsplitgrid',
    store: 'Hgbsplit',
    bindPrefixName: 'Hgbsplit',
    newButtonLabel: 'New Split HGB',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
			plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype: 'cellediting',
                    clicksToEdit: 1
                })
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'booleancolumn',
                    header: 'Gabungan',
                    dataIndex: 'is_gabungan',
                    width: 75,
                    align: 'center',
                    renderer: me.inlineEditGabungan
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
                    itemId: 'colms_mhgbinduk',
                    width: 150,
                    dataIndex: 'mhgbinduk',
                    hideable: false,
                    text: 'No. HGB Induk'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_hgb_no',
                    width: 150,
                    dataIndex: 'pt_hgb_no',
                    hideable: false,
                    text: 'PT HGB No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_luas',
                    width: 150,
                    dataIndex: 'pt_luas',
                    hideable: false,
                    text: 'PT Luas'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_hgb_date',
                    width: 150,
                    dataIndex: 'pt_hgb_date',
                    hideable: false,
                    text: 'PT HGB Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_name',
                    width: 150,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'PT Name'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgb_number',
                    width: 150,
                    dataIndex: 'hgb_number',
                    hideable: false,
                    text: 'No. Splitz'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgb_gsgu_luas',
                    width: 100,
                    dataIndex: 'hgb_gsgu_luas',
                    hideable: false,
                    text: 'Luas'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgb_date',
                    width: 150,
                    dataIndex: 'hgb_date',
                    hideable: false,
                    text: 'Tgl. Terbit',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Nama Customer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_no_hpl_induk',
                    width: 150,
                    dataIndex: 'mhgbinduk',
                    hideable: false,
                    text: 'No HPL Induk'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_hpl_no_gs',
                    width: 150,
                    dataIndex: 'hpl_no_gs',
                    hideable: false,
                    text: 'No GS/NIB'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_hpl_luas',
                    width: 150,
                    dataIndex: 'hpl_luas',
                    hideable: false,
                    text: 'Luas HPL'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_hpl_date',
                    width: 150,
                    dataIndex: 'hpl_date',
                    hideable: false,
                    text: 'Tgl Terbit HPL',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_hpl_skpt_no',
                    width: 150,
                    dataIndex: 'hpl_skpt_no',
                    hideable: false,
                    text: 'SKPT No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ajb_date',
                    width: 150,
                    dataIndex: 'ajb_date',
                    hideable: false,
                    text: 'AJB Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ajb_no',
                    width: 150,
                    dataIndex: 'ajb_number',
                    hideable: false,
                    text: 'AJB No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ajb_name',
                    width: 150,
                    dataIndex: 'ajb_name',
                    hideable: false,
                    text: 'AJB Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ijb_date',
                    width: 150,
                    dataIndex: 'ajb_date',
                    hideable: false,
                    text: 'IJB Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ijb_no',
                    width: 150,
                    dataIndex: 'ajb_number',
                    hideable: false,
                    text: 'IJB No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ijb_name',
                    width: 150,
                    dataIndex: 'ajb_name',
                    hideable: false,
                    text: 'IJB Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_notaris',
                    width: 150,
                    dataIndex: 'notaris',
                    hideable: false,
                    text: 'Notaris'
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
                height: 70,
                items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: '100%',
                            bodyStyle: 'background:none;border:0px',
                            items: [
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        width: '100%',
                                        bodyStyle: 'background:none;border:0px',
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
                                        ]
                                    },
                                    {xtype: 'splitter', width: 30},
                                    {
                                        
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        width: '100%',
                                        bodyStyle: 'background:none;border:0px',
                                        items: [
                                                    {xtype: 'splitter', width: 30},
                                                    {
                                                        xtype: 'radiogroup',
                                                        fieldLabel: 'View Grid',
                                                        name: 'radiogroup_view_grid',
                                                        width: '90%',
                                                        items: [
                                                                    {
                                                                        xtype     : 'radiofield',
                                                                        boxLabel  : 'Atas Nama PT',
                                                                        name      : 'view_grid',
                                                                        inputValue: 'atas_nama_pt',
                                                                        id        : 'viewgrid1',
                                        //                                margin    : '0 5 0 0',
                                                                    }, {
                                                                        xtype     : 'radiofield',
                                                                        boxLabel  : 'Atas Nama User',
                                                                        name      : 'view_grid',
                                                                        inputValue: 'atas_nama_user',
                                                                        id        : 'viewgrid2'
                                                                    }, {
                                                                        xtype     : 'radiofield',
                                                                        boxLabel  : 'Keseluruhan',
                                                                        name      : 'view_grid',
                                                                        inputValue: 'keseluruhan',
                                                                        id        : 'viewgrid3',
                                                                        checked   : true
                                                                    }, {
                                                                        xtype     : 'radiofield',
                                                                        boxLabel  : 'HPL',
                                                                        name      : 'view_grid',
                                                                        inputValue: 'hpl',
                                                                        id        : 'viewgrid4'
                                                                    }, {
                                                                        xtype     : 'radiofield',
                                                                        boxLabel  : 'Exs. Gabungan',
                                                                        name      : 'view_grid',
                                                                        inputValue: 'exs_gabungan',
                                                                        id        : 'viewgrid5'
                                                                    }, {
                                                                        xtype     : 'radiofield',
                                                                        boxLabel  : 'AJB',
                                                                        name      : 'view_grid',
                                                                        inputValue: 'ajb',
                                                                        id        : 'viewgrid6'
                                                                    },
                                                                    {
                                                                        xtype     : 'radiofield',
                                                                        boxLabel  : 'IJB',
                                                                        name      : 'view_grid',
                                                                        inputValue: 'ijb',
                                                                        id        : 'viewgrid7'
                                                                    }
                                                        ]
                                                    }
                                                ]
                                    
                                    }
                                    
                            ]
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
    inlineEditGabungan: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_gabungan';
        return this.comboBoxFieldGen(name, record, true);  
    },
    comboBoxFieldGen: function(name, record, enable){
		if (record.get(name)) {
			var a = '<input type="checkbox" name="'+name+'" data=' + record.get("hgbajb_id") + ' checked disabled/>';
		} else {
			var a = '<input type="checkbox" name="'+name+'" data=' + record.get("hgbajb_id") + ' />';
		}
        return a;  
    }
	
});