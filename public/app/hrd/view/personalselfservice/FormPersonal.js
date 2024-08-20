Ext.define('Hrd.view.personalselfservice.FormPersonal', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalselfserviceformpersonal',
    frame: true,
    autoScroll: true,
    height: 500,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalselfserviceformpersonal',
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
                            name: 'project_id',
                            id: 'project_id' + me.uniquename
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_id',
                            id: 'pt_id' + me.uniquename
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'employee_id',
                            id: 'employee_id' + me.uniquename
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'department_id',
                            id: 'department_id' + me.uniquename
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'bloodgroup_id',
                            id: 'bloodgroup_id' + me.uniquename
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'last_education',
                            id: 'last_education' + me.uniquename
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'marriagestatus_id',
                            id: 'marriagestatus_id' + me.uniquename
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'religion_id',
                            id: 'religion_id' + me.uniquename
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Name',
                            itemId: 'fd_employee_name' + me.uniquename,
                            id: 'employee_name' + me.uniquename,
                            name: 'employee_name',
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
                            fieldLabel: 'Gender',
                            itemId: 'fd_sex' + me.uniquename,
                            id: 'sex' + me.uniquename,
                            name: 'sex',
                            emptyText: 'Auto Value',
                            width: 130,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Religion',
                            itemId: 'fd_religion' + me.uniquename,
                            id: 'religion' + me.uniquename,
                            name: 'religion',
                            emptyText: 'Auto Value',
                            width: 230,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Blood Group',
                            itemId: 'fd_bloodgroup' + me.uniquename,
                            id: 'bloodgroup' + me.uniquename,
                            name: 'bloodgroup',
                            emptyText: 'Auto Value',
                            width: 150,
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
                                    fieldLabel: 'Status',
                                    itemId: 'fd_marriagestatus' + me.uniquename,
                                    id: 'marriagestatus' + me.uniquename,
                                    name: 'marriagestatus',
                                    emptyText: 'Auto Value',
                                    width: 230,
                                    readOnly: true,
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
                            fieldLabel: 'KTP No.',
                            itemId: 'fd_ktp_number' + me.uniquename,
                            id: 'ktp_number' + me.uniquename,
                            name: 'ktp_number',
                            emptyText: 'Auto Value',
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_ktp_address' + me.uniquename,
                            id: 'ktp_address' + me.uniquename,
                            name: 'ktp_address',
                            fieldLabel: 'KTP Address',
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 600,
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_address' + me.uniquename,
                            id: 'address' + me.uniquename,
                            name: 'address',
                            fieldLabel: 'Domicile Address',
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 600,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Zipcode',
                            itemId: 'fd_zipcode' + me.uniquename,
                            id: 'zipcode' + me.uniquename,
                            name: 'zipcode',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'NPWP No.',
                            itemId: 'fd_npwp' + me.uniquename,
                            id: 'npwp' + me.uniquename,
                            name: 'npwp',
                            emptyText: 'Auto Value',
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Passport No.',
                            itemId: 'fd_passport_number' + me.uniquename,
                            id: 'passport_number' + me.uniquename,
                            name: 'passport_number',
                            emptyText: 'Auto Value',
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Telp No.',
                            itemId: 'fd_phone_number' + me.uniquename,
                            id: 'phone_number' + me.uniquename,
                            name: 'phone_number',
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
                            fieldLabel: 'Mobile Phone.',
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
                            xtype: 'textfield',
                            fieldLabel: 'Email Address.',
                            itemId: 'fd_email' + me.uniquename,
                            id: 'email' + me.uniquename,
                            name: 'email',
                            emptyText: 'Auto Value',
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
            ],
        });
        me.callParent(arguments);
    },
});

