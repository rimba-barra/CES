Ext.define('Hrd.view.workgroupemployee.FormDataDetail', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.workgroupemployeeformdatadetail',
    requires: [
        'Hrd.view.workgroupemployee.Gridemployee',
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'workgroup_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'workgroupdetail_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_nik',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_name',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'department',
                },    
                {
                    xtype: 'workgroupemployeegridemployee',
                    itemId: 'fd_workgroupemployeegridemployee',
                    title: 'Data Employee',
                    name: 'workgroupemployeegridemployee',
                    title: 'Employee Data',
                    width: '98%',
                    height: 400,
                    padding: '20px 0 0 20px',
                 },   
                /*
                {
                    xtype: 'employeecombobox',
                    fieldLabel: 'Employee',
                    itemId: 'fd_employee_id' + me.uniquename,
                    id: 'employee_id' + me.uniquename,
                    name: 'employee_id',
                    width: 300,
                    emptyText: 'Employee Name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                */
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

