Ext.define('Erems.view.popupakadkredit.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterPosisiGridStore',
        idProperty: 'cac_id',
        extraParams: {}
    },
    alias:'widget.popupakadkreditgrid',
    
    bindPrefixName:'Popupakadkredit',
   // itemId:'',
    newButtonLabel:'New CAC',
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
                    width:30
                },
                
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cluster_cluster',
                    text: 'Cluster',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'block_block',
                    text: 'Block',
                    width:80
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_unit_number',
                    text: 'Unit',
                    width:80
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchase Letter No.',
                    width:150
                },
                /*
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'type_name',
                    text: 'Tipe Rumah',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_land_size',
                    text: 'Luas Tanah',
                    width:70
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_building_size',
                    text: 'Luas Bangunan',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'type_building_class',
                    text: 'Group',
                    width:70
                },
                */
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'customer_name',
                    text: 'Nama Customer',
                    width:150
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'purchase_date',
                    text: 'Purchase Date',
                    width:100
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'last_duedate',
                    text: 'Last UM Date',
                    width:100
                },
                {
                    xtype: 'gridcolumn',  
                    dataIndex: 'last_duedate_age',
                    text: 'Umur UM (days)',
                    width:90
                },
                {
                 xtype: 'gridcolumn',  
                    dataIndex: 'last_duedate_age_week',
                    text: 'Umur UM (weeks)',
                    width:90
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'rencana_serahterima_date',
                    text: 'Rencana Serah Terima',
                    width:150
                },
                /*
                {
                    xtype: 'gridcolumn',                 
                    dataIndex: 'pricetype_pricetype',
                    text: 'Payment ',
                    width:80
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'akad_realisasiondate',
                    text: 'Tanggal akad',
                    width:90
                },
                */
                
           
               
                
                
             
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
                   /*
                    {
                        xtype: 'button',
                        action: 'excel_page',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export this page'
                    },
                     {
                        xtype: 'button',
                        action: 'excel_selected',
                        itemId: 'btnExportSelected',
                        disabled: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export selected'
                    },
                     {
                        xtype: 'button',
                        action: 'excel_all',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export all'
                    }
                */
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


