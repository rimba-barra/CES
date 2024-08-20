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
                   text: 'Kode Proyek'
                },
                {
                   dataIndex: 'name',
                   text: 'Nama Proyek',
                   width:300
                },
                {
                   xtype:'numbercolumn',
                   dataIndex: 'uang_transport',
                   text: 'Uang Transport',
                   width:100
                },
                {
                    xtype:'numbercolumn',
                   dataIndex: 'uang_saku',
                   text: 'Uang Saku',
                   width:100
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});