Ext.define('Erems.view.buktipemilik.Hgbajbgrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.buktipemilikhgbajbgrid',
    store: 'Hgbajb',
    requires: [
        //'Erems.library.template.component.Sourcemoneycombobox'
    ],
    //bindPrefixName: 'Purchaseletter',
    //newButtonLabel: 'New Purchaseletter_no',
    height: 200,
    /*plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],*/
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
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
                    itemId: 'colms_hgbinduk',
                    width: 100,
                    dataIndex: 'hgbinduk',
                    hideable: false,
                    text: 'HGB / HPL Induk'
                },
                // {
                    // xtype: 'gridcolumn',
                    // itemId: 'colms_ttdajb',
                    // width: 100,
                    // dataIndex: 'ajb_sign_date',
                    // hideable: false,
                    // text: 'TTD AJB',
					// renderer: Ext.util.Format.dateRenderer('d-m-Y')
                // },
				// {
                    // xtype: 'gridcolumn',
                    // itemId: 'colms_notaris',
                    // width: 100,
                    // dataIndex: 'ajb_notaris_date',
                    // hideable: false,
                    // text: 'Notaris AJB Date',
					// renderer: Ext.util.Format.dateRenderer('d-m-Y')
                // },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_ajb_number',
                    width: 100,
                    dataIndex: 'ajb_number',
                    hideable: false,
                    text: 'AJB Number'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_ajb_date',
                    width: 100,
                    dataIndex: 'ajb_date',
                    hideable: false,
                    text: 'AJB Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgbname',
                    width: 100,
                    dataIndex: 'ajb_name',
                    hideable: false,
                    text: 'Nama AJB'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_notaris_ajb',
                    width: 100,
                    dataIndex: 'notaris_ajb',
                    hideable: false,
                    text: 'Notaris AJB'
                },
				// {
                    // xtype: 'gridcolumn',
                    // itemId: 'colms_skmht_date',
                    // width: 100,
                    // dataIndex: 'ajb_skmht_date',
                    // hideable: false,
                    // text: 'SKMHT Date',
					// renderer: Ext.util.Format.dateRenderer('d-m-Y')
                // },
				// {
                    // xtype: 'gridcolumn',
                    // itemId: 'colms_apht_date',
                    // width: 100,
                    // dataIndex: 'ajb_apht_date',
                    // hideable: false,
                    // text: 'APHT Date',
					// renderer: Ext.util.Format.dateRenderer('d-m-Y')
                // },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgbnumber',
                    width: 100,
                    dataIndex: 'hgb_number',
                    hideable: false,
                    text: 'HGB No / Splitz No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgb_date',
                    width: 100,
                    dataIndex: 'hgb_date',
                    hideable: false,
                    text: 'HGB Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgbnumber',
                    width: 100,
                    dataIndex: 'hgb_number',
                    hideable: false,
                    text: 'HGB Number'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgb_date',
                    width: 100,
                    dataIndex: 'hgb_date',
                    hideable: false,
                    text: 'HGB Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_hgb_name',
                    width: 100,
                    dataIndex: 'pt_hgb_name',
                    hideable: false,
                    text: 'PT HGB Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_hgb_no',
                    width: 100,
                    dataIndex: 'pt_hgb_no',
                    hideable: false,
                    text: 'PT HGB No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_hgb_date',
                    width: 100,
                    dataIndex: 'pt_hgb_date',
                    hideable: false,
                    text: 'PT HGB Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_ajb_validasipphselesai_date',
                    width: 100,
                    dataIndex: 'ajb_validasipphselesai_date',
                    hideable: false,
                    text: 'Validasi PPh Selesai',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				// {
                    // xtype: 'gridcolumn',
                    // itemId: 'colms_hgb_tocustomer_date',
                    // width: 100,
                    // dataIndex: 'hgb_tocustomer_date',
                    // hideable: false,
                    // text: 'HGB to Cust',
					// renderer: Ext.util.Format.dateRenderer('d-m-Y')
                // },
				// {
                    // xtype: 'gridcolumn',
                    // itemId: 'colms_hgb_tocontractor_date',
                    // width: 100,
                    // dataIndex: 'hgb_tocontractor_date',
                    // hideable: false,
                    // text: 'HGB to Cont',
					// renderer: Ext.util.Format.dateRenderer('d-m-Y')
                // },
				{
					xtype: 'gridcolumn',
					hidden: true,
					dataIndex: 'is_hgbajb_detail',
					hideable: false,
					text: 'is_hgbajb_detail'
				},
				/*{
                    xtype: 'actioncolumn',
                    hidden: false,
                    itemId: 'showactionform',
                    width: 100,
                    resizable: false,
                    align: 'center',
                    hideable: false,
					text: 'Action',
                    items: [
                        {
                            //icon: 'app/crm/images/icons/notes.png',
							action: 'view_hgbajb',
                            altText: 'View',
                            tooltip: 'View'
                        },
						{
                            //icon: 'app/crm/images/icons/notes.png',
							action: 'edit_hgbajb',
                            altText: 'Edit',
                            tooltip: 'Edit'
                        },
						{
                            //icon: 'app/crm/images/icons/notes.png',
							action: 'delete_hgbajb',
                            altText: 'Delete',
                            tooltip: 'Delete'
                        }
                    ]
                },*/
				


                //   me.generateActionColumn()
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
         
                items: [
                    {
                        xtype: 'button',
                        action: 'add_hgbajb',
                        hidden: true,
                        itemId: 'btnNews',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-new',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'Add New HGB / AJB'
                    },
					{
                        xtype: 'button',
                        action: 'edit_hgbajb',
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-edit',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'Edit',
						disabled: true
                    },
					{
                        xtype: 'button',
                        action: 'delete_hgbajb',
                        hidden: true,
                        itemId: 'btnDelete',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-delete',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'Delete',
						disabled: true
                    },
					{
                        xtype: 'button',
                        action: 'view_hgbajb',
                        hidden: false,
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-search',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'View',
						disabled: true
                    }
                ]
            },
            /*{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    }
});