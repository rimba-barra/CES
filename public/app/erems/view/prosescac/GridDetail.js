Ext.define('Erems.view.prosescac.GridDetail',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'ProsesCACGridDetailStore',
        idProperty: 'prosescacdetail_id',
        extraParams: {
            mode_read:'cacdetail'
        }
    },
    alias:'widget.prosescacgriddetail',
    
    bindPrefixName:'Prosescac',
   // itemId:'',
    newButtonLabel:'New Proses CAC',
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
                    dataIndex: 'proses_date',
                    text: 'Tgl Proses'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cluster_cluster',
                    text: 'Kawasan'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_unit_number',
                    width:80,
                    text: 'Unit Number'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'point',
                    text: 'Point'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'purchaseletter_purchaseletter_no',
                    text: 'Purchase No.'
                },
                
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'purchaseletter_purchase_date',
                    text: 'Purchase Date'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'pricetype_pricetype',
                    text: 'Pays'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'price_harga_neto',
                    text: 'Harga Netto'
                },
                
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'purchaseletter_harga_total_jual',
                    text: 'Harga Jual Total'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'price_harga_jual',
                    text: 'Sales Price'
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
                height: 28,
                items: []
            }
        ];
        return dockedItems;
    },
});


