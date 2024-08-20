Ext.define('Hrd.view.programtraining.FormData', {
    alias: 'widget.programtrainingformdata',
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
                    name: 'programtraining_id'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Training Group',
                    name: 'grouptraining_grouptraining_id',
                    displayField: cbf.grouptraining.d,
                    valueField: cbf.grouptraining.v

                },
                {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Training Code',
                    readOnly: true,
                    size: 30
                },
                {
                    xtype      : 'fieldcontainer',
                    layout:'hbox',
                    fieldLabel:'Training Type',
                    width:400,
                    bodyStyle: 'background:none;border:0;',
                    defaults: {
                        xtype: 'radiofield',
                        flex:1
                    },
                    items: [
                        {
                            boxLabel: 'Training',
                            name: 'trainingtype',
                            checked: true,
                            inputValue: 'T'
                        }, {
                            boxLabel: 'Activity',
                            name: 'trainingtype',
                            inputValue: 'A'
                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'days',
                            fieldLabel: 'Training Length',
                            readOnly: true,
                            size: 30
                        },
                        {
                            xtype: 'label',
                            text: ' hari'
                        }
                        , {
                            xtype: 'textfield',
                            name: 'duration',
                            fieldLabel: 'Duration',
                            readOnly: true,
                            size: 30
                        },
                        {
                            xtype: 'label',
                            text: ' hh:mm / day'
                        }
                    ]
                },
                {
                    xtype      : 'fieldcontainer',
                    layout:'hbox',
                    fieldLabel:'In - House / Out - House',
                    width:400,
                    bodyStyle: 'background:none;border:0;',
                    defaults: {
                        xtype: 'radiofield',
                        flex:1
                    },
                    items: [
                        {
                            boxLabel: 'In House',
                            name: 'is_inhouse',
                            checked: true,
                            inputValue: 1
                        }, {
                            boxLabel: 'Out House',
                            name: 'is_inhouse',
                            inputValue: 0
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    name: 'organizer',
                    fieldLabel: 'Organizer',
                    readOnly: true,
                    size: 30
                },
                {
                    xtype: 'container',
                    layout:'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'cost',
                            fieldLabel: 'Cost',
                            readOnly: true,
                            size: 30
                        },
                        {
                            xtype: 'label',
                            text: ' / person'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    name: 'theme',
                    fieldLabel: 'Training Theme',
                    readOnly: true,
                    size: 30
                },
                {
                    xtype      : 'fieldcontainer',
                    layout:'hbox',
                    fieldLabel:'Active',
                    width:400,
                    bodyStyle: 'background:none;border:0;',
                    defaults: {
                        xtype: 'radiofield',
                        flex:1
                    },
                    items: [
                        {
                            boxLabel: 'Yes',
                            name: 'is_active',
                            checked: true,
                            inputValue: 1
                        }, {
                            boxLabel: 'No',
                            name: 'is_active',
                            inputValue: 0
                        },
                    ]
                }
            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});