Ext.define('Hrd.view.employeedata.GridEmployee', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.employeedataemployeegrid',
    storeConfig:{
        id:'EmployeedataEmployeeStore',
        idProperty:'employee_id',
        extraParams:{
            mode_read:'lookemployee'
        }
    },
    bindPrefixName: 'Employeedata',
    newButtonLabel: 'New Employee',
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
                   dataIndex: 'employee_nik',
                   text: 'NIK'
                },
                {
                   dataIndex: 'employee_name',
                   text: 'Employee Name'
                },
               // me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Select',
                    altText: 'Edit',
                    action:'selects',
                    tooltip: 'Edit'
                }
            ]
        };
        return ac;
    }
});