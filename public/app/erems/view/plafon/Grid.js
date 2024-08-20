Ext.define('Erems.view.plafon.Grid',{
     extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterSideGridStore',
        idProperty: 'side_id',
        extraParams: {}
    },
    alias:'widget.plafongrid',
    bindPrefixName:'Plafon',
   // itemId:'',
    newButtonLabel:'New Plafon',
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
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'plafon',
                    hideable: false,
                    text: 'Plafon'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_side',
                    width: 200,
                    dataIndex: 'persen_desc',
                    hideable: false,
                    text: 'Percent'
                },{
                    xtype: 'booleancolumn',
                    itemId: 'colms_createdby',
                    width: 50,
                    dataIndex: 'is_default',
                    hideable: false,
                    falseText: ' ',
                    align:'center',
                    trueText: '&#10003;',
                    text: 'Default'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


