Ext.define('Hrd.view.masterdiscapproval.Grid', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.masterdiscapprovalgrid',
    store: 'Masterdiscapproval',
    bindPrefixName: 'Masterdiscapproval',
    itemId: 'Masterdiscapproval',
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
                    itemId: 'colms_tipe_name',
                    width: 200,
                    dataIndex: 'tipe_name',
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_name',
                    width: 300,
                    dataIndex: 'employee_name',
                    hideable: false,
                    text: 'Employee Name'
                },
                me.generateActionColumn(),
               
            ],
        });

        me.callParent(arguments);
    },
    
    
});


