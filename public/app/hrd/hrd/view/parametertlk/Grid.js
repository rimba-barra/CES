Ext.define('Hrd.view.parametertlk.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.parametertlkgrid',
    storeConfig:{
        id:'ParametertlkGridStore',
        idProperty:'parametertlk_id',
        extraParams:{}
    },
    bindPrefixName: 'Parametertlk',
    newButtonLabel: 'New Destination Project',
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
                   dataIndex: 'code',
                   text: 'Code'
                },
                {
                   dataIndex: 'name',
                   text: 'Project Name'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});