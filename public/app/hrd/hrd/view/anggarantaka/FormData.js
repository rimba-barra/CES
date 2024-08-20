Ext.define('Hrd.view.anggarantaka.FormData', {
    alias: 'widget.anggarantakaformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields'],
    id: 'formAnggarantakaID',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();
        
        var data = [{
                "value":"N", "text":"None"
            },{
                "value":"F", "text":"Flower Board"
            },{
                "value":"B", "text":"Bouquet"
            }];
       
        var fmStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: data
        });
        
        var bocStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: data
        });
        var esStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: data
        });
        
        var psStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: data
        });

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'tandakasih_id'
                },
                {
                    xtype:'combobox',
                    name: 'group_group_id',
                    fieldLabel: 'Category',
                    displayField: cbf.group.d,
                    valueField: cbf.group.v
                },
                {
                    xtype: 'container',
                    layout:'hbox',
                    margin:'0 0 10px 0',
                    items: [
                        {
                            xtype:'textfield',
                            name: 'first_marriage',
                            fieldLabel: 'First Marriage',
                            width: 300
                        },
                        {
                            xtype:'label',
                            text:'+'
                        },
                        {
                            xtype:'combobox',
                            store:fmStore,
                            name:'first_marriage_plus',
                            queryMode: 'local',
                            displayField: 'text',
                            valueField: 'value'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout:'hbox',
                    margin:'0 0 10px 0',
                    items: [
                        {
                            xtype:'textfield',
                            name: 'birth_of_child',
                            fieldLabel: 'Birth of child (1 to 3)',
                            width: 300
                        },
                        {
                            xtype:'label',
                            text:'+'
                        },
                        {
                            xtype:'combobox',
                            name:'birth_of_child_plus',
                            store:bocStore,
                            queryMode: 'local',
                            displayField: 'text',
                            valueField: 'value'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout:'hbox',
                    margin:'0 0 10px 0',
                    items: [
                        {
                            xtype:'textfield',
                            name: 'sick_in_hospital',
                            fieldLabel: 'Employee sick in hospital',
                            width: 300
                        },
                        {
                            xtype:'label',
                            text:'+'
                        },
                        {
                            xtype:'combobox',
                            name:'sick_in_hospital_plus',
                            store:esStore,
                            queryMode: 'local',
                            displayField: 'text',
                            valueField: 'value'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout:'hbox',
                    margin:'0 0 10px 0',
                    items: [
                        {
                            xtype:'textfield',
                            name: 'parent_passaway',
                            fieldLabel: 'Parent pass away',
                            width: 300
                        },
                        {
                            xtype:'label',
                            text:'+'
                        },
                        {
                            xtype:'combobox',
                            name:'parent_passaway_plus',
                            store:psStore,
                            queryMode: 'local',
                            displayField: 'text',
                            valueField: 'value'
                        }
                    ]
                }

            ],
            dockedItems: [],
        });

        me.callParent(arguments);
    }

});