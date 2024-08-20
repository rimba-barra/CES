Ext.define('Erems.view.masterformula.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masterformulagrid',
    store: 'Masterformula',
    bindPrefixName:'Masterformula',
    newButtonLabel: 'New Formula',
    initComponent: function() {
        var me = this;
        var renderFunc =  function (value, metaData, record, row, col, store, gridView) {
                        if(parseInt(value)==1){
                            return 'HARI';
                        }else if(parseInt(value)==2){
                            return 'MINGGU';
                        }else{
                            return 'BULAN';
                        }
                    };
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
                    width: 60,
                    align: 'right',
                    dataIndex: 'billingrules_id',
                    text: 'ID'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 100,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_persen_tandajadi',
                    width: 100,
                    dataIndex: 'persen_tandajadi',
                    hideable: false,
                    text: 'Tanda jadi(%)'
                },{
                    xtype: 'numbercolumn',
                    itemId: 'colms_tandajadi',
                    width: 100,
                    dataIndex: 'tandajadi',
                    hideable: false,
                    text: 'Tanda jadi'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_persen_uangmuka',
                    width: 100,
                    dataIndex: 'persen_uangmuka',
                    hideable: false,
                    text: 'Uang muka (%)'
                },{
                    xtype: 'numbercolumn',
                    itemId: 'colms_uangmuka',
                    width: 100,
                    dataIndex: 'uangmuka',
                    hideable: false,
                    text: 'Uang muka'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_periode_uangmuka',
                    width: 100,
                    dataIndex: 'periode_uangmuka',
                    hideable: false,
                    
                    text: 'Periode uang muka'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_type_periode_uangmuka',
                    width: 100,
                    dataIndex: 'type_periode_uangmuka',
                    hideable: false,
                    text: 'Type uang muka',
                    renderer:renderFunc
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_term_uangmuka',
                    width: 100,
                    dataIndex: 'term_uangmuka',
                    hideable: false,
                    text: 'Term uang muka'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_periode_angsuran',
                    width: 100,
                    dataIndex: 'periode_angsuran',
                    hideable: false,
                    text: 'Periode Angsuran'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_type_periode_angsuran',
                    width: 100,
                    dataIndex: 'type_periode_angsuran',
                    hideable: false,
                    renderer:renderFunc,
                    text: 'Type angsuran'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_term_angsuran',
                    width: 100,
                    dataIndex: 'term_angsuran',
                    hideable: false,
                    text: 'Term angsuran'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'is_balloon',
                    width: 50,
                    dataIndex: 'is_balloon',
                    hideable: false,
                    text: 'Balloon',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});