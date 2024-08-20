Ext.define('Hrd.view.personalselfservice.FormSearch', {
    extend: 'Hrd.library.template.view.FormSearch',
    alias: 'widget.personalselfserviceformsearch',
    uniquename: '_personalselfserviceformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_name',
                    value: ''
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    border: false,
                    title: 'Type Data',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    padding: '0 0 0 10', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: '',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 3
                            },
                            layout: 'vbox',
                            items: [
                                {
                                    boxLabel: 'NEW DATA',
                                    name: 'status',
                                    inputValue: '4',
                                    id: 'status4' + me.uniquename,
                                    allowBlank: false,
                                    checked: false,
                                },
                                {
                                    boxLabel: 'UPDATE DATA',
                                    name: 'status',
                                    inputValue: '1',
                                    id: 'status1' + me.uniquename,
                                    allowBlank: false,
                                    checked: true,
                                },
                                {
                                    boxLabel: 'DATA ALREADY VALID / APPROVED',
                                    name: 'status',
                                    inputValue: '2',
                                    id: 'status2' + me.uniquename,
                                    allowBlank: false,
                                    checked: false,
                                },
                                {
                                    boxLabel: 'NO UPDATE AND NOT YET VALID DATA',
                                    name: 'status',
                                    inputValue: '3',
                                    id: 'status3' + me.uniquename,
                                    allowBlank: false,
                                    checked: false,
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'departmentcombobox',
                    fieldLabel: 'Department',
                    itemId: 'fd_department_id' + me.uniquename,
                    id: 'department_id' + me.uniquename,
                    name: 'department_id',
                    width: 250,
                    emptyText: 'Department',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
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
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 200,
                    items: [
                        {
                            // Fieldset in Column 
                            xtype: 'fieldset',
                            title: 'last update user ',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '20 10 20 10', //(top, right, bottom, left).
                            width: 200,
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    itemId: 'fd_fromdate_user' + me.uniquename,
                                    id: 'fromdate_user' + me.uniquename,
                                    name: 'fromdate_user',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'From Date',
                                    width: 120,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'label',
                                    forId: 'labelto',
                                    text: 'S/d',
                                    margin: '0 0 0 30',
                                    width: 30,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    itemId: 'fd_untildate_user' + me.uniquename,
                                    id: 'untildate_user' + me.uniquename,
                                    name: 'untildate_user',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Until Date',
                                    width: 120,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 200,
                    items: [
                        {
                            // Fieldset in Column 
                            xtype: 'fieldset',
                            title: 'last update admin ',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '20 10 20 10', //(top, right, bottom, left).
                            width: 200,
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    itemId: 'fd_fromdate_admin' + me.uniquename,
                                    id: 'fromdate_admin' + me.uniquename,
                                    name: 'fromdate_admin',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'From Date',
                                    width: 120,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'label',
                                    forId: 'labelto',
                                    text: 'S/d',
                                    margin: '0 0 0 30',
                                    width: 30,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    itemId: 'fd_untildate_admin' + me.uniquename,
                                    id: 'untildate_admin' + me.uniquename,
                                    name: 'untildate_admin',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Until Date',
                                    width: 120,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
