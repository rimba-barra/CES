Ext.define('Erems.view.popupbelumajb.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterPosisiGridStore',
        idProperty: 'cac_id',
        extraParams: {}
    },
    alias:'widget.popupbelumajbgrid',
    
    bindPrefixName:'Popupbelumajb',
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
                    dataIndex: 'unit_unit_number',
                    text: 'Unit Number',
                    width:80
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cluster_code',
                    text: 'Cluster Code',
                    width:80
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'customer_name',
                    text: 'Customer Name',
                    width:200
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchaseletter No',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'salesman_employee_name',
                    text: 'Salesman',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'pricetype_pricetype',
                    text: 'Pricetype',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'customer_mobile_phone',
                    text: 'Handphone',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'customer_home_phone',
                    text: 'Homephone',
                    width:100
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
});


