Ext.define('Hrd.view.roleapproval.Grid', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.roleapprovalgrid',
    store: 'Roleapproval',
    bindPrefixName: 'Roleapproval',
    itemId: 'Roleapproval',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
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
                    itemId: 'colms_name',
                    width: 160,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Approval for'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    width: 160,
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 160,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'PT'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_name',
                    width: 160,
                    dataIndex: 'employee_name',
                    hideable: false,
                    text: 'Employee'
                },
              
                me.generateActionColumn(),
               
            ],
        });

        me.callParent(arguments);
    },
    
    
});


