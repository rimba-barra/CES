Ext.define('Hrd.view.shifttype.FormData', {
    alias: 'widget.shifttypeformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
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
                    name: 'shifttype_id'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Shift Code',
                    labelWidth: 70,
                    width: '100%',
                    layout: 'hbox',
                    items: [{
                            xtype: 'textfield',
                            name: 'code',
                            flex: 2,
                            margin: '0 10 0 0'
                        }, {
                            xtype: 'textfield',
                            name: 'shifttype',
                            flex: 8
                        }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'container',
                        layout: 'vbox',
                        flex: 1,
                        defaults: {
                            width: '100%',
                            xtype: 'fieldset',
                            margin: '0 10 0 0',
                            layout: 'hbox',
                            defaults: {
                                flex: 1,
                                width: '100%',
                                labelWidth: 40
                            }
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    // Fieldset in Column 1 - collapsible via toggle button

                                    title: 'Work Hours',
                                    defaultType: 'textfield',
                                    items: [
                                        /*{
                                         xtype: 'timefield',
                                         name: 'in_time',
                                         fieldLabel: 'In',
                                         margin: '0 30 0 0',
                                         minValue: '6:00 AM',
                                         maxValue: '8:00 PM',
                                         increment: 30,
                                         format: 'H:i'
                                         },
                                         
                                         {
                                         xtype: 'timefield',
                                         name: 'out_time',
                                         fieldLabel: 'Out',
                                         minValue: '6:00 AM',
                                         maxValue: '8:00 PM',
                                         increment: 30,
                                         format: 'H:i'
                                         }
                                         */
                                        {
                                            xtype: 'textfield',
                                            name: 'in_time',
                                            fieldLabel: 'in',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'out_time',
                                            fieldLabel: 'Out',
                                            enableKeyEvents: true
                                        }]
                                },
                                {
                                    // Fieldset in Column 1 - collapsible via toggle button

                                    title: 'Un Status Condition In/Out',
                                    defaultType: 'textfield',
                                    items: [
                                        /*
                                         {
                                         xtype: 'timefield',
                                         name: 'outafter_time',
                                         margin: '0 30 0 0',
                                         fieldLabel: 'After',
                                         minValue: '6:00 AM',
                                         maxValue: '8:00 PM',
                                         increment: 30,
                                         format: 'H:i'
                                         }
                                         */
                                        {
                                            xtype: 'checkbox',
                                            name: 'unstatus',
                                            boxLabel: 'Without Status',
                                            flex:2
                                        }, {
                                            xtype: 'textfield',
                                            name: 'outafter_time',
                                            margin: '0 30 0 0',
                                            fieldLabel: 'Out time after',
                                            labelWidth:80,
                                            enableKeyEvents: true,
                                            flex:4
                                        }]
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    // Fieldset in Column 1 - collapsible via toggle button

                                    title: 'Holiday',
                                    defaultType: 'textfield',
                                    items: [{
                                            xtype: 'radiogroup',
                                            fieldLabel: '',
                                            // Arrange radio buttons into two columns, distributed vertically
                                            itemId: 'holyDay',
                                            vertical: false,
                                            items: [
                                                {boxLabel: 'Yes', name: 'holyday', inputValue: 1, checked: true},
                                                {boxLabel: 'No', name: 'holyday', inputValue: 0}
                                            ]
                                        }]
                                },
                                {
                                    // Fieldset in Column 1 - collapsible via toggle button

                                    title: 'Different Day',
                                    defaultType: 'textfield',
                                    items: [{
                                            xtype: 'radiogroup',
                                            fieldLabel: '',
                                            // Arrange radio buttons into two columns, distributed vertically
                                            itemId: 'differentDay',
                                            vertical: false,
                                            items: [
                                                {boxLabel: 'Yes', name: 'different_day', inputValue: 1, checked: true},
                                                {boxLabel: 'No', name: 'different_day', inputValue: 0}
                                            ]
                                        }]
                                }
                            ]
                        }
                    ]
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});