Ext.define('Erems.view.popupjatuhtempofilter.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterPosisiGridStore',
        idProperty: 'cac_id',
        extraParams: {}
    },
    alias:'widget.popupjatuhtempofiltergrid',
    
    bindPrefixName:'Popupjatuhtempofilter',
   // itemId:'',
    newButtonLabel:'',
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
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    width:80,
                    dataIndex: 'duedate',
                    text: 'Due Date'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    dataIndex: 'remaining_balance',
                    text: 'Rest'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    dataIndex: 'denda',
                    text: 'Denda'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'type_code',
                    text: 'Type',
                    width:50
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sourcemoney_sourcemoney',
                    text: 'Source Money'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cluster_code',
                    width:50,
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_unit_number',
                    width:70,
                    text: 'Unit Number'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'pricetype_pricetype',
                    text: 'Price Type'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'customer_name',
                    width:150,
                    text: 'Customer Name'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'purchaseletter_purchase_date',
                    format:'d-m-Y',
                    width:80,
                    text: 'Purchase Date'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    dataIndex: 'purchaseletter_harga_total_jual',
                    text: 'Sales Price'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    dataIndex: 'billingrules_uangmuka',
                    text: 'Down Payment'
                },
                {
                    xtype: 'gridcolumn',
                    align:'left',
                    dataIndex: 'scheduletype_scheduletype',
                    text: 'Type Schedule'
                },
                
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'customer_mobile_phone',
                    width:150,
                    text: 'Handphone'
                },
				{
                    xtype: 'gridcolumn',
                    dataIndex: 'lama_tunggakan',
                    width:100,
                    text: 'Lama Tunggakan'
                },
				{
                    xtype: 'numbercolumn',
                    align:'right',
                    dataIndex: 'remaining_balance',
                    text: 'Hutang'
                },
				{
                    xtype: 'gridcolumn',
                    dataIndex: 'scheduletype_scheduletype',
                    width:100,
                    text: 'Schedule Type'
                },
				{
                    xtype: 'gridcolumn',
                    dataIndex: 'termin',
                    width:70,
                    text: 'Termin'
                },
				{
                    xtype: 'gridcolumn',
                    dataIndex: 'salesman_employee_name',
                    width:150,
                    text: 'Sales Name'
                },
				{
                    xtype: 'gridcolumn',
                    dataIndex: 'purchaseletter_clubcitra_member',
                    width:150,
                    text: 'Member'
                }
             
            ],
            bbar:[
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
                    action: 'export_excel',
                    itemId: 'btnPrint',
                    margin: '0 5 0 0',
                    align:'right',
                    iconCls: 'icon-print',
                    text: 'Export Excel'
                }
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
                items: []
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
//    generateDockedItems: function() {
//        var me = this;
//
//        var dockedItems = [
//            {
//                xtype: 'toolbar',
//                dock: 'top',
//                height: 28,
//                items: [
//                   
//                    {
//                        xtype: 'button',
//                        action: 'excel_page',
//                        margin: '0 5 0 0',
//                        iconCls: 'icon-new',
//                        text: 'Export this page'
//                    },
//                     {
//                        xtype: 'button',
//                        action: 'excel_selected',
//                        itemId: 'btnExportSelected',
//                        disabled: true,
//                        margin: '0 5 0 0',
//                        iconCls: 'icon-new',
//                        text: 'Export selected'
//                    },
//                     {
//                        xtype: 'button',
//                        action: 'excel_all',
//                        margin: '0 5 0 0',
//                        iconCls: 'icon-new',
//                        text: 'Export all'
//                    }
//                ]
//            },
//            {
//                xtype: 'pagingtoolbar',
//                dock: 'bottom',
//                width: 360,
//                displayInfo: true,
//                store: this.getStore()
//            }
//        ];
//        return dockedItems;
//    },
});


