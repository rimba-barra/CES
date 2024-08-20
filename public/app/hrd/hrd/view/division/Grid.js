Ext.define('Hrd.view.division.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.divisiongrid',
    storeConfig:{
        id:'DivisionGridStore',
        idProperty:'Division_id',
        extraParams:{}
    },
    bindPrefixName: 'Division',
    newButtonLabel: 'New Division',
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
                   text: 'Code'
                },
                {
                   dataIndex: 'division',
                   text: 'Department Name',
                   width:200
                }
                ,
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});