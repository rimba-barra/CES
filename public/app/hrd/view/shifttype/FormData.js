Ext.define('Hrd.view.shifttype.FormData', {
    alias: 'widget.shifttypeformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    height: 350,
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

                                    title: 'Un Status Condition In/Out', hidden:true,
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
                                            inputValue: '1', hidden:true,
                                            flex:2
                                        }, {
                                            xtype: 'textfield',
                                            name: 'outafter_time',
                                            margin: '0 30 0 0',
                                            fieldLabel: 'Out time after',
                                            labelWidth:80,
                                            enableKeyEvents: true, hidden:true,
                                            flex:4
                                        }]
                                },
                                //added by anas 10112021
                                {
                                    xtype: 'checkboxfield',
                                    // fieldLabel: 'Mod',
                                    itemId: 'fd_is_mod',
                                    name: 'is_mod',
                                    boxLabel: 'is MoD',
                                    padding: '0 0 0 0',
                                    margin: '15 0 0 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    flex: 2,
                                    checked: false
                                }, 
                                //added by mike 21/04/2022
                                {
                                    xtype:'label',
                                    itemId:'labelismod',
                                    text:'is MoD akan mempengaruhi Extra Leave',
                                    style: 'color:grey;',
                                    margin: '0 0 0 20',
                                },   
                                {
                                    xtype: 'checkboxfield',
                                    // fieldLabel: 'Mod',
                                    itemId: 'fd_is_teams',
                                    name: 'is_teams',
                                    boxLabel: 'Absensi Teams',
                                    padding: '0 0 0 0',
                                    margin: '20 0 0 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    flex: 2,
                                    checked: false
                                },   
                                {
                                    xtype:'label',
                                    itemId:'labelabsensiteams',
                                    text:'Absensi Teams hanya digunakan KP',
                                    style: 'color:grey;',
                                    margin: '0 0 0 20',
                                },   
                                //added by mike 24/08/2022
                                {
                                    xtype: 'checkboxfield',
                                    // fieldLabel: 'Mod',
                                    itemId: 'fd_is_auto',
                                    name: 'is_auto',
                                    boxLabel: 'Auto Change Parameter Shift',
                                    padding: '0 0 0 0',
                                    margin: '20 0 0 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    flex: 2,
                                    checked: false
                                },   
                                {
                                    xtype:'label',
                                    itemId:'labelauto',
                                    text:'Parameter utk merubah shift secara otomatis',
                                    style: 'color:grey;',
                                    margin: '0 0 0 20',
                                }, 
                                //end added by mike 24/08/2022
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
                                                {boxLabel: 'Yes', name: 'holyday', inputValue: 1},
                                                {boxLabel: 'No', name: 'holyday', inputValue: 0, checked: true}
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
                                                {boxLabel: 'Yes', name: 'different_day', inputValue: 1},
                                                {boxLabel: 'No', name: 'different_day', inputValue: 0, checked: true}
                                            ]
                                        }]
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'fd_is_showess',
                                    name: 'is_ess',
                                    boxLabel: 'Show for Shift Change',
                                    padding: '0 0 0 0',
                                    margin: '5 0 0 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    flex: 2,
                                    checked: false
                                },   
                                {
                                    xtype:'label',
                                    itemId:'labelshowess',
                                    text:'Shift bisa dipilih oleh karyawan saat Tukar Shift',
                                    style: 'color:grey;',
                                    margin: '0 0 0 20',
                                },  
                            ]
                        },

                        
                    ]
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});