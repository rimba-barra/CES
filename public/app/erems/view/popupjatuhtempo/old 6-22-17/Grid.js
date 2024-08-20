Ext.define('Erems.view.popupjatuhtempo.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterPosisiGridStore',
        idProperty: 'cac_id',
        extraParams: {}
    },
    alias:'widget.popupjatuhtempogrid',
    
    bindPrefixName:'Popupjatuhtempo',
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
});


