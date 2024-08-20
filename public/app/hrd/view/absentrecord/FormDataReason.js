Ext.define('Hrd.view.absentrecord.FormDataReason', {
    alias: 'widget.absentrecordformdatareason',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.ShiftType','Hrd.template.combobox.AbsentType'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;


        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'department_id'
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Leave Taking'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Reason',
                    labelWidth: 100,
                    // The body area will contain three text fields, arranged
                    // horizontally, separated by draggable splitters.
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            name:'absenttype_code',
                            enableKeyEvents:true,
                            margin: '0 10 0 0'
                        },
                        {
                            xtype: 'cbabsenttype',
                            name:'absenttype_id',
                            fieldLabel:'',
                            flex: 2
                        }]
                },
                {
                    xtype: 'fieldset',
                    title: 'Date',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'container'
                    },
                    items: [
                        {
                            layout: 'hbox',
                            flex: 1,
                            width: '100%',
                            items: [
                                {
                                    xtype: 'datefield',
                                   // value:new Date(),
                                    format:'d/m/Y',
                                    name:'start_date',
                                    flex: 1
                                },
                                {
                                    xtype: 'label',
                                    text: 's/d',
                                    width: 30,
                                    margin: '0 5'
                                },
                                {
                                    xtype: 'datefield',
                                  //  value:new Date(),
                                    format:'d/m/Y',
                                    name:'end_date',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            width: 100,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    itemId: 'sexID',
                                    labelWidth: 1,
                                    width: '100%',
                                    layout: 'vbox',
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {boxLabel: '1 day', name: 'sex', inputValue: "M", checked: true},
                                        {boxLabel: '1/2 day', name: 'sex', inputValue: "F"},
                                    ]
                                }

                            ]
                        }


                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Leave Entitlements'
                },
                {
                    xtype: 'textareafield',
                    width: '200px',
                    name:'description',
                    labelWidth: 50,
                    fieldLabel: 'Leave Note',
                }




            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});