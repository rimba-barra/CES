Ext.define('Erems.view.utilitytypeb.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterUtilityTypeGridStore',
        idProperty: 'utilitytype_id',
        extraParams: {}
    },
    alias:'widget.utilitytypebgrid',
    
    bindPrefixName:'Utilitytypeb',
   // itemId:'',
    newButtonLabel:'New Utility Type',
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
                    width:150,
                    dataIndex: 'utilitytype',
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    width:500,
                    dataIndex: 'description',
                    text: 'Description'
                },
                
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


