Ext.define('Hrd.view.mastergaji.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.mastergajigrid',
    storeConfig: {
        id: 'MastergajiGridStore',
        idProperty: 'gaji_id',
        extraParams: {}
    },
    bindPrefixName: 'Mastergaji',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
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
                    dataIndex: 'employee_employee_nik',
                    text: 'N.I.K',
                    width:100
                },
                {
                    dataIndex:'employee_employee_name',
                    text:'Employee Name',
                    width:200
                }
                
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [];
        return dockedItems;
    }
});