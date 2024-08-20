Ext.define('Hrd.view.generalparameter.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.generalparametergrid',
    storeConfig:{
        id:'GeneralparameterGridStore',
        idProperty:'generalparameter_id',
        extraParams:{}
    },
    bindPrefixName: 'Generalparameter',
    newButtonLabel: 'New Parameter',
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
                   dataIndex: 'name',
                   width:200,
                   text: 'Parameter'
                },
                {
                   dataIndex: 'module_name',
                   width:150,
                   text: 'Module Name'
                },
                {
                   dataIndex: 'data_type',
                   text: 'Data Type'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});