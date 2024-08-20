Ext.define('Hrd.view.masterworklocation.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.masterworklocationgrid',
    storeConfig:{
        id:'MasterworklocationGridStore',
        idProperty:'Worklocation_id',
        extraParams:{}
    },
    bindPrefixName: 'Masterworklocation',
    newButtonLabel: 'New Masterworklocation',
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
                   dataIndex: 'worklocation',
                   text: 'Worklocation Name',
                   width: 400
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});