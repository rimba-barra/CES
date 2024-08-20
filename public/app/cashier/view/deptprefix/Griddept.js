Ext.define('Cashier.view.deptprefix.Griddept', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.deptprefixdepartmentgrid',
    store: 'Department',
    bindPrefixName: 'Department',
    itemId: 'Department',
    title: 'Department Data',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {          
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    dataIndex: 'department',
                    titleAlign: 'left',
                    align: 'left',
                    width: 300,
                    hideable: false,
                    text: 'Description'
                },                
            ]
        });

        me.callParent(arguments);
    },
  
    
});


