Ext.define('Hrd.view.personalselfservice.FormFamilySpouse', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalselfserviceformfamilyspouse',
    requires: [
        'Hrd.view.personalselfservice.GridChield',
    ],
    frame: true,
    autoScroll: true,
    height: 300,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalselfserviceformfamilyspouse',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    autoScroll: true,
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'relation_id',
                            id: 'relation_id' + me.uniquename
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'employee_id',
                            id: 'employee_id' + me.uniquename
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'last_education',
                            id: 'last_education' + me.uniquename
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Spouse Name',
                            itemId: 'fd_name' + me.uniquename,
                            id: 'name' + me.uniquename,
                            name: 'name',
                            emptyText: 'Auto Value',
                            width: 400,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Birth Place',
                                    itemId: 'fd_birth_place' + me.uniquename,
                                    id: 'birth_place' + me.uniquename,
                                    name: 'birth_place',
                                    emptyText: 'Auto Value',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Birth Date',
                                    itemId: 'fd_birth_date' + me.uniquename,
                                    id: 'birth_date' + me.uniquename,
                                    name: 'birth_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 180,
                                    emptyText: 'Auto Value',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Last Education',
                            itemId: 'fd_education' + me.uniquename,
                            id: 'education' + me.uniquename,
                            name: 'education',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Marriage Date',
                                    itemId: 'fd_marriage_date' + me.uniquename,
                                    id: 'marriage_date' + me.uniquename,
                                    name: 'marriage_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 180,
                                    emptyText: 'Auto Value',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '30'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Number of children',
                                    itemId: 'fd_child_count' + me.uniquename,
                                    id: 'child_count' + me.uniquename,
                                    name: 'child_count',
                                    emptyText: 'Auto Value',
                                    width: 130,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Job',
                            itemId: 'fd_job' + me.uniquename,
                            id: 'job' + me.uniquename,
                            name: 'job',
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Company Name',
                                    itemId: 'fd_company_name' + me.uniquename,
                                    id: 'company_name' + me.uniquename,
                                    name: 'company_name',
                                    emptyText: 'Auto Value',
                                    width: 400,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Line Business',
                                    itemId: 'fd_company_line_of_business' + me.uniquename,
                                    id: 'company_line_of_business' + me.uniquename,
                                    name: 'company_line_of_business',
                                    emptyText: 'Auto Value',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_company_address' + me.uniquename,
                            id: 'company_address' + me.uniquename,
                            name: 'company_address',
                            fieldLabel: 'Company Address',
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 600,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Company Phone',
                            itemId: 'fd_company_phone' + me.uniquename,
                            id: 'company_phone' + me.uniquename,
                            name: 'company_phone',
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Mobile Phone',
                            itemId: 'fd_hp_number' + me.uniquename,
                            id: 'hp_number' + me.uniquename,
                            name: 'hp_number',
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'tbspacer',
                            height: '10'
                        },
                        {
                            title: 'Data Children',
                            xtype: 'familychieldgrid',
                            name: 'gridfamilychield',
                            id: 'gridfamilychield',
                            readOnly: false,
                            width: 820,
                            height: 200,
                        },
                    ]
                },
            ],
        });
        me.callParent(arguments);
    },
});

