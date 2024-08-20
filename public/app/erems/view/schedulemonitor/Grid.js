Ext.define('Erems.view.schedulemonitor.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.schedulemonitorgrid',
    storeConfig: {
        id: 'SchedulemonitorGridStore',
        idProperty: 'purchaseletter_id',
        extraParams: {}
    },
    bindPrefixName: 'Schedulemonitor',
    newButtonLabel: 'New Schedule Monitor',
    initComponent: function () {
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
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster_code',
                    text: 'Kawasan'
                },{
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },{
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                },{
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'purchase_date',
                    format:'d-m-Y',
                    hideable: false,
                    text: 'Tanggal Pesanan'
                },{
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Nomor Pesanan'
                },{
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'pricetype_pricetype',
                    hideable: false,
                    text: 'Price Type'
                },{
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },{
                    xtype: 'numbercolumn',
                    width: 150,
                    dataIndex: 'harga_total_jual',
                    hideable: false,
                    align:'right',
                    text: 'Harga Jual'
                },{
                    xtype: 'numbercolumn',
                    width: 150,
                    dataIndex: 'total_tagihan',
                    hideable: false,
                    align:'right',
                    text: 'Total Tagihan (Schedule)'
                },{
                    xtype: 'numbercolumn',
                    width: 150,
                    dataIndex: 'total_payment',
                    hideable: false,
                    align:'right',
                    text: 'Payment ( +/- CDN )'
                },{
                    xtype: 'numbercolumn',
                    width: 150,
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    align:'right',
                    text: 'Remaining Balance (Schedule)'
                },
                {
                    xtype: 'numbercolumn',
                    width: 150,
                    dataIndex: 'real_remaining_balance',
                    hideable: false,
                    align:'right',
                    text: 'Selisih'
                }
                
              //  me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        itemId:'btnEdit',
                        action: 'edit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        disabled:true
                    },
                    {
                        xtype: 'button',
                        action: 'excel',
                        margin: '0 5 0 0',
                        iconCls: 'icon-excel',
                        text: 'Download Excel'
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            
           
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
            items: []
        };
        return ac;
    },
});
