Ext.define('Hrd.view.scheduletraining.FormData', {
    alias: 'widget.scheduletrainingformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();




        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'scheduletraining_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'programtraining_programtraining_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        flex: 1,
                        xtype: 'textfield',
                        readOnly: true,
                        size: 30,
                        margin: '0 10px 10px 0',
                    },
                    items: [
                        {
                            name: 'programtraining_code', fieldLabel: 'Training Code',
                        }, {
                            xtype: 'button',
                            text: 'Browse',
                            action: 'browse',
                            flex: null,
                            width: 100
                        }, {
                            name: 'programtraining_theme',
                            fieldLabel: '',
                        }, {
                            name: 'programtraining_trainingtype',
                            fieldLabel: '',
                            listeners: {
                                change: function(el, newValue, oldValue, eOpts) {
                                   
                                    if (newValue === "T") {
                                        el.setValue("Training");
                                    } else {
                                        el.setValue("Activity");
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    width: 600,
                    defaults: {
                        flex: 1,
                        margin: '0 10px 10px 0',
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'programtraining_days',
                            fieldLabel: 'Training Length',
                            readOnly: true,
                            size: 30
                        },
                        {
                            xtype: 'label',
                            text: ' hari',
                            flex: null,
                            width: 50
                        }
                        , {
                            xtype: 'textfield',
                            name: 'programtraining_is_inhouse',
                            labelWidth: 170,
                            fieldLabel: 'In - House / Out Sourcing',
                            readOnly: true,
                            size: 30,
                            listeners: {
                                change: function(el, newValue, oldValue, eOpts) {
                                  
                                    if (newValue === 1) {
                                        el.setValue("IN");
                                    } else {
                                        el.setValue("OUT");
                                    }
                                }
                            }

                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    name: 'location',
                    fieldLabel: 'Location ',
                    readOnly: true,
                    size: 30
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    width: 600,
                    defaults: {
                        flex: 1,
                        margin: '0 10px 10px 0',
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d'
                    },
                    items: [
                        {
                            name: 'start_date',
                            fieldLabel: 'Date',
                            readOnly: true,
                            size: 30
                        },
                        {
                            name: 'end_date',
                            labelWidth: 30,
                            fieldLabel: 'to',
                            margin: '0 10px 10px 50px',
                            readOnly: true,
                            size: 30
                        }
                    ]
                }

            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});