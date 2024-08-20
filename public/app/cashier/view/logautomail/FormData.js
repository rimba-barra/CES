Ext.define('Cashier.view.logautomail.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.logautomailformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
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
                    itemId: 'fdms_employee_id',
                    name: 'employee_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fmis_project_project_id',
                    name: 'project_id'
                },
                {
                            xtype: 'ptusercombobox',
                            fieldLabel: 'PT / Company',
                            itemId: 'fd_pt_id',
                            id: 'pt_id_b123',
                            name: 'pt_id',
                            width: 250,
                            emptyText: 'Pt / Company',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_employee_name',
                    name: 'employee_name',
                    fieldLabel: 'Employee Name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5',
                    enableKeyEvents: true,
                    absoluteReadOnly: true,
                     msgTarget: "side",
                    blankText: 'This should not be blank!',
                },
                  {
                    xtype: 'textfield',
                    itemId: 'fdms_nik',
                    name: 'nik_group',
                    fieldLabel: 'NIK',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5',
                    enableKeyEvents: true,
                    absoluteReadOnly: true,
                },
                 {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Gender',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 3
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'Male',
                            name: 'sex',
                            inputValue: 'M',
                            id: 'radio1',
                            checked : true
                        },
                        {
                            boxLabel: 'Female',
                            name: 'sex',
                            inputValue: 'F',
                            id: 'radio2'
                        }
                    ]

                },
               {
                            xtype: 'departmentcombobox',
                            fieldLabel: 'Department',
                            itemId: 'fdms_department_id',
                            id: 'department_id',
                            name: 'department_id',
                            width: 350,
                            emptyText: 'Department',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                         {
                            xtype: 'employeehrdcombobox',
                            fieldLabel: 'Reporting to',
                            itemId: 'fdms_reportto',
                            id: 'report_to',
                            name: 'reportto',
                            width: 350,
                           emptyText: 'Reporting to',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            forceSelection:false,
                            typeAhead:false,
                            listeners:{
                                
                                keyup: function(field){
                                    var c = 0;
                                       var searchString = field.getValue();

                                       if (searchString) {

                                       this.store.filterBy(function (record, id) {
                                        if( record.get('employee_name').toLowerCase().indexOf(field.getValue()) > -1) { 
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        
                                        });
                                       }

                                },
                                buffer:300,
                            },
                        },
             
//                {
//                    xtype: 'textfield',
//                    itemId: 'fdms_openmonth',
//                    name: 'openmonth',
//                    fieldLabel: 'Open Month',
//                    allowBlank: true,
//                    enforceMaxLength: true,
//                    maskRe: /[^\`\"\']/,
//                    maxLength: 2,
//                    anchor: '-5',
//                    enableKeyEvents: true
//                },
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
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75, iconCls: 'icon-save',
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
                    }
                ]
            }
        ];
        return x;
    },
});

