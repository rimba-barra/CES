Ext.define('Erems.view.sempatmonitoring.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'SempatmonitoringGridStore',
        idProperty: 'cac_id',
        extraParams: {}
    },
    alias:'widget.sempatmonitoringgrid',
    
    bindPrefixName:'Sempatmonitoring',
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
                    xtype: 'rownumberer'
                },
               
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cluster_code',
                    width:100,
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
                    width:250,
                    text: 'Customer Name'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'purchase_date',
                    format:'d-m-Y',
                    width:80,
                    text: 'Purchase Date'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    width:150,
                    dataIndex: 'harga_total_jual',
                    text: 'Sales Price'
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
                items: [
                    {
                        xtype: 'button',
                        action: 'export_excel',
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export Excel'
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
});


