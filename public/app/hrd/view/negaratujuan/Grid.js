Ext.define('Hrd.view.negaratujuan.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.negaratujuangrid',
    storeConfig:{
        id:'NegaratujuanGridStore',
        idProperty:'Negaratujuan_id',
        extraParams:{}
    },
    bindPrefixName: 'Negaratujuan',
    newButtonLabel: 'New Negaratujuan',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults:{
                 xtype: 'gridcolumn',
                 
                 
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },{
                   dataIndex: 'code',
                   text: 'Kode',
                   width:100
                },
                {
                   dataIndex: 'negaratujuan',
                   text: 'Negara Tujuan',
                   width:300
                },
                {
                    xtype: 'booleancolumn',
                    width: 175,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;',
                    dataIndex: 'is_luarnegeri',
                    text: 'Kelompok Luar Negeri'
                }
                ,
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});