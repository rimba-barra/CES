Ext.define('Hrd.view.absentrecord.GridTlk', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgridtlk',
    storeConfig:{
        id:'AbsentrecordGridTlkGridStore',
        idProperty:'parametertlk_id',
        extraParams:{}
    },
    bindPrefixName: 'Parametertlk',
    newButtonLabel: 'New Destination Project',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems:[],
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
                   text: 'Project Name',
                   width:300
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});