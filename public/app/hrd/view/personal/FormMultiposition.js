Ext.define('Hrd.view.personal.FormMultiposition', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalformmultiposition',
    requires: ['Hrd.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    height: 380,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalformdocument',
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'employee_multiposition_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'reportto_id'
                },                
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    autoScroll: true,
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit',
                        margin: "0 10 10 0" //atas, kanan, bawah, kiri
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_is_default',
                            name: 'is_default',
                            boxLabel: 'Set as Default',
                            padding: '0 0 0 0',
                            margin: '0 0 0 110',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
                        },
                        {
                            xtype: 'splitter',
                            width: '30'
                        },
                        {
                            name: 'project_id',
                            id: 'project_id' + me.uniquename,
                            xtype: 'projectcombobox',
                            store: 'Project2',
                            matchFieldWidth: false,
                            preLoad: true,
                            width: 400,
                            allowBlank: false,
                        },
                        {
                            name: 'pt_id',
                            id: 'pt_id' + me.uniquename,
                            xtype: 'ptcombobox',
                            preLoad: true,
                            store: 'Pt2',
                            matchFieldWidth: false,
                            width: 400,
                            allowBlank: false,
                        },

      			/*
                        {
                            xtype: 'combobox',
                            name: 'reportto_id',
                            id: 'reportto_id' + me.uniquename,
                            fieldLabel: 'Report to',
                            displayField: cbf.reportto.d,
                            valueField: cbf.reportto.v,
                            allowBlank: false,
                            matchFieldWidth: false,
                        },
			*/
                       
                       /*
			{
                            xtype: 'combobox',
                            name: 'reportto_id',
                            id: 'reportto_id' + me.uniquename,
                            fieldLabel: 'Report to',
                            displayField: cbf.reportto.d,
                            valueField: cbf.reportto.v,
                            allowBlank: true,
                            matchFieldWidth: false,
                            queryMode: 'local',
                            typeAhead: true,
                        },
                        */                        
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
                                    fieldLabel: 'Report to',
                                    itemId: 'fd_namaatasan',
                                    id: 'namaatasan',
                                    name: 'namaatasan',
                                    width: 360,
                                    margin: '0 0 0 0', //(top, right, bottom, left).
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'button',
                                    name: 'reportomulti',
                                    text: 'Browse', 
                                    action: 'lookupreportomulti'
                                }
                            ]
                        },

                        {
                            name: 'department_department_id',
                            id: 'department_department_id' + me.uniquename,
                            xtype: 'cbdepartment',
                            matchFieldWidth: false,
                            preLoad: true,
                            width: 400,
                            allowBlank: false,
                        },
                        {
                            name: 'section_id',
                            id: 'section_id' + me.uniquename,
                            xtype: 'sectiondepartmentcombobox',
                            preLoad: true,
                            matchFieldWidth: false,
                            width: 400,
                            allowBlank: true,
                        },
                        {
                            flex: 4,
                            name: 'jobfamily_jobfamily_id',
                            id: 'jobfamily_jobfamily_id' + me.uniquename,
                            xtype: 'combobox',
                            fieldLabel: 'Job Family',
                            displayField: 'jobfamily',
                            queryMode: 'local',
                            valueField: 'jobfamily_id',
                            width: 400,
                            matchFieldWidth: false,
                            allowBlank: false,
                            listConfig: {
                                itemTpl: '{code} - {jobfamily}'
                            }
                        },
                        {
                            flex: 4,
                            name: 'position_position_id',
                            id: 'position_position_id' + me.uniquename,
                            xtype: 'combobox',
                            queryMode: 'local',
                            fieldLabel: 'Position',
                            displayField: 'description',
                            valueField: 'position_id',
                            width: 400,
                            matchFieldWidth: false,
                            allowBlank: false,
                            listConfig: {
                                itemTpl: '{position} - {description}'
                            }
                        },
                        {
                            flex: 4,
                            name: 'alokasibiaya_alokasibiaya_id',
                            id: 'alokasibiaya_alokasibiaya_id' + me.uniquename,
                            xtype: 'combobox',
                            displayField: 'name',
                            queryMode: 'local',
                            width: 400,
                            valueField: 'alokasibiaya_id',
                            matchFieldWidth: false,
                            allowBlank: true,
                            listConfig: {
                                itemTpl: '{code} - {name}'
                            },
                            fieldLabel: 'Allocation Costs'
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                padding: '0 0 0 0',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    },
                ]
            }
        ];
        return x;
    }
});

