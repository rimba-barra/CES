Ext.define('Hrd.view.leavesubmission.FormData', {
    alias: 'widget.leavesubmissionformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                  xtype:'hiddenfield',
                  name:'leave_id'  
                },
                {
                  xtype:'hiddenfield',
                  name:'employee_employee_id'  
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'NIK/Name',
                    labelWidth: 100,
                    // The body area will contain three text fields, arranged
                    // horizontally, separated by draggable splitters.
                    layout: 'hbox',
                    width: '100%',
                    defaults: {
                        xtype: 'textfield',
                        margin: '0 5 0 0'
                    },
                    items: [{
                            flex: 1,
                            name:'employee_employee_nik',
                            readOnly:true
                        }, {
                            flex: 2,
                            name:'employee_employee_name',
                            readOnly:true
                        }, {
                            xtype: 'button',
                            text: 'BROWSE',
                            action:'lookup_employee',
                            width: 100
                        }
                    ]
                },
                {
                    fieldLabel: 'Hire Date',
                   
                    name:'employee_hire_date',
                    readOnly:true
                },
                {
                    fieldLabel: 'Department',
                    name:'employee_department_department',
                    readOnly:true
                },
                {
                    xtype: 'cbabsenttype',
                    fieldLabel: 'Leave Type',
                    name:'absenttype_absenttype_id',
                    width:400,
                    preLoad:true,
                    margin:'0 0 5 0'
                },
                {
                    fieldLabel: 'Ration Leave',
                    readOnly:true
                },
                {
                    xtype: 'fieldset',
                    title: 'Submission',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Duration',
                            layout: 'hbox',
                            width:'100%',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'duration',
                                    flex:1
                                },
                                {
                                    xtype: 'label',
                                    text: 'days',
                                    flex:5,
                                    margin: '0 5'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Date',
                            layout: 'hbox',
                            flex: 1,
                            width: '100%',
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'start_date',
                                    format: 'd/m/Y',
                                    submitFormat:'Y-m-d',
                                    flex: 1
                                },
                                {
                                    xtype: 'label',
                                    text: 'to',
                                    width: 30,
                                    margin: '0 5'
                                },
                                {
                                    xtype: 'datefield',
                                    format: 'd/m/Y',
                                    submitFormat:'Y-m-d',
                                    name: 'end_date',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype:'textareafield',
                            width:500,
                            height:150,
                            name:'note',
                            fieldLabel:'Note'
                        }
                    ]
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});