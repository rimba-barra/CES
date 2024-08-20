Ext.define('Hrd.view.masterkategorisk.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.masterkategoriskgrid',
    storeConfig:{
        id:'MasterkategoriskGridStore',
        idProperty:'Masterkategorisk_id',
        extraParams:{}
    },
    bindPrefixName: 'Masterkategorisk',
    newButtonLabel: 'New Masterkategori',
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
                   dataIndex: 'name',
                   text: 'Name',
                   width:200
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});