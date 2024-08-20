Ext.define('Hrd.view.jobfunction.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.jobfunctiongrid',
    storeConfig:{
        id:'JobfunctionGridStore',
        idProperty:'Jobfunction_id',
        extraParams:{}
    },
    bindPrefixName: 'Jobfunction',
    newButtonLabel: 'New Jobfunction',
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
                   dataIndex: 'jobfunction',
                   text: 'Jobfunction Name',
                   width:200
                }
                ,
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});