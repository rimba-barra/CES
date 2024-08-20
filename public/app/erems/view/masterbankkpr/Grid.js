Ext.define('Erems.view.masterbankkpr.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.masterbankkprgrid',
    store:'Masterbankkpr',
    bindPrefixName:'Masterbankkpr',
   // itemId:'',
    newButtonLabel:'New Bank KPR',
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
                    itemId: 'colms_id',
                    width: 50,
                    align: 'right',
                    dataIndex: 'bankkpr_id',
                    text: 'ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_bank_name',
                    width: 150,
                    dataIndex: 'bank_name',
                    hideable: false,
                    text: 'Bank Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_tahap1_persen',
                    width: 150,
                    dataIndex: 'tahap1_persen',
                    hideable: false,
                    text: '% Tahap 1'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tahap2_persen',
                    width: 150,
                    dataIndex: 'tahap2_persen',
                    hideable: false,
                    text: '% Tahap 2'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tahap3_persen',
                    width: 150,
                    dataIndex: 'tahap3_persen',
                    hideable: false,
                    text: '% Tahap 3'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tahap4_persen',
                    width: 150,
                    dataIndex: 'tahap4_persen',
                    hideable: false,
                    text: '% Tahap 4'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tahap5_persen',
                    width: 150,
                    dataIndex: 'tahap5_persen',
                    hideable: false,
                    text: '% Tahap 5'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tahap6_persen',
                    width: 150,
                    dataIndex: 'tahap6_persen',
                    hideable: false,
                    text: '% Tahap 6'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tahap7_persen',
                    width: 150,
                    dataIndex: 'tahap7_persen',
                    hideable: false,
                    text: '% Tahap 7'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tahap8_persen',
                    width: 150,
                    dataIndex: 'tahap8_persen',
                    hideable: false,
                    text: '% Tahap 8'
                },
				
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


