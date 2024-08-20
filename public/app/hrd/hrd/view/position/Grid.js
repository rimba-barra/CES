Ext.define('Hrd.view.position.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.positiongrid',
    storeConfig:{
        id:'PositionGridStore',
        idProperty:'position_id',
        extraParams:{}
    },
    bindPrefixName: 'Position',
    newButtonLabel: 'New Position',
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
                },
                {
                   dataIndex: 'position',
                   text: 'Code'
                },
                {
                   dataIndex: 'description',
                   text: 'Name'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});