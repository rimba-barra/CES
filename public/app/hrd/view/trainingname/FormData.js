Ext.define('Hrd.view.trainingname.FormData', {
    alias: 'widget.trainingnameformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingname.GridFormCompetency'],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
               {
                    xtype:'hiddenfield',
                    name:'trainingname_id'
                },
                {
                    xtype: 'textfield',
                    name:'trainingname',
                    width: 400,
                    fieldLabel:'Training Name'
                },
                {
                    xtype: 'textfield',
                    name:'vendor',
                    width: 400,
                    fieldLabel:'Vendor'
                },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Budget Type',
                //     name: 'trainingcaption_id',
                //     width:400,
                //     displayField: 'caption',
                //     valueField: 'trainingcaption_id',
                // },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Competency',
                //     name: 'competency_name_id',
                //     width:400,
                //     displayField: 'competency_name',
                //     valueField: 'competency_name_id',
                // },
                {
                    xtype: 'trainingnameformcompetencygrid',
                    height: 150,
                    width:400,
                    style: 'padding: 10 0 10 0'
                },
                {
                    xtype      : 'fieldcontainer',
                    layout:'hbox',
                    fieldLabel:'Skill Type',
                    width:400,
                    bodyStyle: 'background:none;border:0;',
                    defaults: {
                        xtype: 'radiofield',
                        flex:1
                    },
                    items: [
                        {
                            boxLabel: 'Technical Skill',
                            name: 'skill',
                            inputValue: 'Technical Skill',
                            checked:true
                        }, {
                            boxLabel: 'Soft Skill',
                            name: 'skill',
                            inputValue: 'Soft Skill'
                        },
                        //added by anas 28042022
                        {
                            boxLabel: 'Both',
                            name: 'skill',
                            inputValue: 'Both'
                        },
                        //end added by anas
                    ]
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
                            boxLabel: 'In House',
                            name: 'type',
                            inputValue: 'In House',
                            checked:true
                        }, {
                            boxLabel: 'Internal',
                            name: 'type',
                            inputValue: 'Internal'
                        },
                        //updated by anas 18052022
                        {
                            boxLabel: 'Public',
                            name: 'type',
                            inputValue: 'Public'
                        },
                        //end updated by anas
                    ]
                },
                {
                    xtype      : 'fieldcontainer',
                    layout:'hbox',
                    fieldLabel:'Certificate',
                    width:400,
                    bodyStyle: 'background:none;border:0;',
                    defaults: {
                        xtype: 'radiofield',
                        flex:1
                    },
                    items: [
                        {
                            boxLabel: 'Yes',
                            name: 'certificate',
                            inputValue: 'Yes',
                            checked:true
                        }, {
                            boxLabel: 'No',
                            name: 'certificate',
                            inputValue: 'No'
                        },
                        //updated by anas 18052022
                        {
                            boxLabel: 'Hold (at HC)',
                            name: 'certificate',
                            inputValue: 'Hold'
                        },
                        //end updated by anas
                    ]
                },
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});