Ext.define('Hrd.view.personalselfservice.FormFamilyParent', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalselfserviceformfamilyparent',
    requires: [
        'Hrd.view.personalselfservice.GridSibling',
    ],
    frame: true,
    autoScroll: true,
    height: 300,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalselfserviceformfamilyparent',
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
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Data Father',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Name',
                                    itemId: 'fd_name_father' + me.uniquename,
                                    id: 'name_father' + me.uniquename,
                                    name: 'name_father',
                                    emptyText: 'Auto Value',
                                    width: 330,
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
                                    fieldLabel: 'Birth Date',
                                    itemId: 'fd_birthdate_father' + me.uniquename,
                                    id: 'birthdate_father' + me.uniquename,
                                    name: 'birthdate_father',
                                    emptyText: 'Auto Value',
                                    width: 180,
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
                                    fieldLabel: 'Work',
                                    itemId: 'fd_work_father' + me.uniquename,
                                    id: 'work_father' + me.uniquename,
                                    name: 'work_father',
                                    emptyText: 'Auto Value',
                                    width: 280,
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
                            itemId: 'fdms_address' + me.uniquename,
                            id: 'address' + me.uniquename,
                            name: 'address',
                            fieldLabel: "Father's Address",
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 830,
                        },
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Data Mother',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Name',
                                    itemId: 'fd_name_mother' + me.uniquename,
                                    id: 'name_mother' + me.uniquename,
                                    name: 'name_mother',
                                    emptyText: 'Auto Value',
                                    width: 330,
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
                                    fieldLabel: 'Birth Date',
                                    itemId: 'fd_birthdate_mother' + me.uniquename,
                                    id: 'birthdate_mother' + me.uniquename,
                                    name: 'birthdate_mother',
                                    emptyText: 'Auto Value',
                                    width: 180,
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
                                    fieldLabel: 'Work',
                                    itemId: 'fd_work_mother' + me.uniquename,
                                    id: 'work_mother' + me.uniquename,
                                    name: 'work_mother',
                                    emptyText: 'Auto Value',
                                    width: 280,
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
                            itemId: 'fdms_address_mother' + me.uniquename,
                            id: 'address_mother' + me.uniquename,
                            name: 'address_mother',
                            fieldLabel: "Mother's Address",
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 830,
                        },
                        {
                            xtype: 'tbspacer',
                            height: '10'
                        },
                        {
                            title: 'Data Sibling',
                            xtype: 'familysiblinggrid',
                            name: 'gridfamilysibling',
                            id: 'gridfamilysibling',
                            readOnly: false,
                            width: 830,
                            height: 200,
                        },
                    ]
                },
            ],
        });
        me.callParent(arguments);
    },
});

