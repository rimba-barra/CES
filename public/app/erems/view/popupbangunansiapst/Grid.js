Ext.define('Erems.view.popupbangunansiapst.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterPosisiGridStore',
        idProperty: 'cac_id',
        extraParams: {}
    },
    alias:'widget.popupbangunansiapstgrid',
    
    bindPrefixName:'Popupbangunansiapst',
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
                    dataIndex: 'unit_number',
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
                    dataIndex: 'purchaseletter_purchaseletter_no',
                    text: 'Purchaseletter No',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'bank_bank_name',
                    text: 'Bank Name',
                    width:70
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'spk_spk_no',
                    text: 'SPK No',
                    width:200
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'contractor_contractorname',
                    text: 'Contractor',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'salesman_employee_name',
                    text: 'Salesman',
                    width:100
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'purchaseletter_rencana_serahterima_date',
                    text: 'Rencana Serah Terima',
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


