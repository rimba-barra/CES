Ext.define('Erems.view.prosescac.GridNomor',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'ProcessCacNomorGridStore',
        idProperty: 'prosescacnomor_id',
        extraParams: {
            mode_read:'cacnomor'
        }
    },
    alias:'widget.prosescacgridnomor',
    
    bindPrefixName:'Prosescac',
   // itemId:'',
    newButtonLabel:' ',
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
                    dataIndex: 'nomor',
                    text: 'Nomor'
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


