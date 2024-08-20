Ext.define('Erems.view.formundanganajb.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.formundanganajbgrid',
    store:'Formundanganajb',
    bindPrefixName:'Formundanganajb',
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
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Purchase No'
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
                    itemId: 'colms_construction',
                    width: 150,
                    dataIndex: 'construction',
                    hideable: false,
                    text: 'Construction %'
                },
        		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_imb_no',
                    width: 150,
                    dataIndex: 'imb_no',
                    hideable: false,
                    text: 'No IMB'
                },
				
        		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgbinduk',
                    width: 150,
                    dataIndex: 'hgbinduk',
                    hideable: false,
                    text: 'No HGB Induk'
                },

        		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgb_number',
                    width: 150,
                    dataIndex: 'hgb_number',
                    hideable: false,
                    text: 'No HGB Customer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ajb_number',
                    width: 150,
                    dataIndex: 'ajb_number',
                    hideable: false,
                    text: 'No AJB'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_hgb_no',
                    width: 200,
                    dataIndex: 'pt_hgb_no',
                    hideable: false,
                    text: 'No HGB Atas Nama PT'
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
                //    {
                //        xtype: 'button',
                //        action: 'create',
                //        hidden: true,
                //        itemId: 'btnNew',
                //        margin: '0 5 0 0',
                //        iconCls: 'icon-new',
                //        bindAction: me.bindPrefixName + 'Create',
                //        text: me.newButtonLabel
                //    },
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
                    //added by anas 27052021                    
                    {
                        xtype: 'button',
                        action: 'print_doc',
                        disabled: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        //bindAction: me.bindPrefixName+'Print',
                        iconCls: 'icon-print',
                        text: 'Print'
                    },
                   //end added by anas
                    {
                        xtype: 'button',
                        action: 'ExporttoExcel',
                        itemId: 'btnExporttoExcel',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export to Excel',
                        // bindAction: me.bindPrefixName + 'ExporttoExcel'
                    },
                //    {
                //        xtype: 'button',
                //        action: 'destroy',
                //        disabled: true,
                //        hidden: true,
                //        itemId: 'btnDelete',
                //        bindAction: me.bindPrefixName + 'Delete',
                //        iconCls: 'icon-delete',
                //        text: 'Delete Selected'
                //    },
                //    {
                //        xtype: 'button',
                //        action: 'print',
                //        hidden: true,
                //        itemId: 'btnPrint',
                //        margin: '0 5 0 0',
                //        bindAction: me.bindPrefixName + 'Print',
                //        iconCls: 'icon-print',
                //        text: 'Print / Save'
                //    },
				// 	{
                //        xtype: 'button',
                //        action: 'lrp_project_setting',
                //        itemId: 'btnLRPProjectSetting',
                //        margin: '0 5 0 0',
				// 		//iconCls: 'icon-setting',
                //        text: 'Setting LRP Project'
                //    },
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


