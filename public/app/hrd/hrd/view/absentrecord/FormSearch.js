Ext.define('Hrd.view.absentrecord.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.absentrecordformsearch',
    requires: ['Hrd.view.absentrecord.GridEmployee', 'Hrd.template.combobox.Department',
        'Hrd.library.box.tools.2StateElement'],
    collapsed: false,
    initComponent: function() {
        var me = this;

        var years = Ext.create('Ext.data.Store', {
            fields: ['number', 'name', 'year'],
            data: []
        });

        /*
         *  data: [
         {"number": 2014, "name": "2014"},
         {"number": 2015, "name": "2015"},
         {"number": 2016, "name": "2016"},
         {"number": 2017, "name": "2017"},
         ]
         * 
         */

        var months = Ext.create('Ext.data.Store', {
            fields: ['number', 'name', 'year'],
            data: []
        });

        var departments = Ext.create('Ext.data.Store', {
            fields: ['department_id', 'department','month','year'],
            data: []
        });

        /*
         *
         * {"number": 1, "name": "January"},
         {"number": 2, "name": "February"},
         {"number": 3, "name": "March"},
         {"number": 4, "name": "April"},
         {"number": 5, "name": "May"},
         {"number": 6, "name": "June"},
         {"number": 7, "name": "July"},
         {"number": 8, "name": "August"},
         {"number": 9, "name": "September"},
         {"number": 10, "name": "October"},
         {"number": 11, "name": "November"},
         {"number": 12, "name": "December"}, 
         */



        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Date',
                    layout: 'hbox',
                    width: '100%',
                    defaults: {
                        queryMode: 'local',
                        xtype: 'combobox',
                        displayField: 'name',
                        valueField: 'number',
                        flex: 1
                    },
                    items: [
                        {
                            name: 'month_pick',
                            store: months,
                            emptyField: 'month',
                            margin: '0 10 0 0'
                        },
                        {
                            name: 'year_pick',
                            store: years,
                            emptyField: 'year'
                        }

                    ]
                },
                /*   {
                 name: 'search_department_id',
                 xtype: 'cbdepartment'
                 },*/
                {
                    queryMode: 'local',
                    xtype: 'combobox',
                    name:'search_department_id',
                    store:departments,
                    fieldLabel:'Department',
                    displayField: 'department',
                    valueField: 'department_id',
                },
                {
                    margin: '10 0 0 0',
                    xtype: 'absentrecordemployeegrid'
                }
                /* {
                 margin: '10 0 0 0',
                 xtype: '2stateelement',
                 notFoundEl:'Employee list not found...',
                 foundEl:'absentrecordemployeegrid'
                 }*/
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var dockedItems = [
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
                        action: 'search',
                        itemId: 'btnSearch',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-search',
                        text: 'Search'
                    },
                    {
                        xtype: 'button',
                        action: 'reset',
                        itemId: 'btnReset',
                        disabled: true,
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-reset',
                        text: 'Reset'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});