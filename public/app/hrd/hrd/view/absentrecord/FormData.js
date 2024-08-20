Ext.define('Hrd.view.absentrecord.FormData', {
    alias: 'widget.absentrecordformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.ShiftType'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        var i = 0;
        var hours = [], minutes = [];
        var temp = '';
        for (i = 0; i <= 24; i++) {

            temp = i < 10 ? '0' + i : i;

            hours.push({
                "number": i + 1, "name": temp
            });
        }
        for (i = 0; i <= 59; i++) {
            temp = i < 10 ? '0' + i : i;
            minutes.push({
                "number": i + 1, "name": temp
            });
        }

        var hoursStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: hours
        });
        var minutesStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: minutes
        });

        var hoursStoreo = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: hours
        });
        var minutesStoreo = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: minutes
        });

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield',
                margin:'0 0 5 0'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'department_id'
                },
                {
                    xtype:'hiddenfield',
                    name:'onduty_project_id'
                    
                },
                {
                    xtype:'hiddenfield',
                    name:'absenttype_absenttype_id'
                },
               /* {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Time In',
                    labelWidth: 100,
                    // The body area will contain three text fields, arranged
                    // horizontally, separated by draggable splitters.
                    layout: 'hbox',
                    items: [{
                            xtype: 'combobox',
                            name: 'timein_hour',
                            store: hoursStore,
                            queryMode: 'local',
                            width: 50,
                            value: 1,
                            displayField: 'name',
                            valueField: 'number'
                        }, {
                            xtype: 'label',
                            margin: '0 5',
                            text: ':'
                        }, {
                            xtype: 'combobox',
                            name: 'timein_minute',
                            store: minutesStore,
                            queryMode: 'local',
                            value: 1,
                            width: 50,
                            displayField: 'name',
                            valueField: 'number'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Time Out',
                    labelWidth: 100,
                    // The body area will contain three text fields, arranged
                    // horizontally, separated by draggable splitters.
                    layout: 'hbox',
                    items: [{
                            xtype: 'combobox',
                            name: 'timeout_hour',
                            store: hoursStore,
                            queryMode: 'local',
                            width: 50,
                            value: 1,
                            displayField: 'name',
                            valueField: 'number'
                        }, {
                            xtype: 'label',
                            margin: '0 5',
                            text: ':'
                        }, {
                            xtype: 'combobox',
                            name: 'timeout_minute',
                            store: minutesStore,
                            queryMode: 'local',
                            width: 50,
                            value: 1,
                            displayField: 'name',
                            valueField: 'number'
                        }
                    ]
                }, */
                {
                  xtype:'textfield',
                  name:'timein',
                  fieldLabel:'Time In',
                  enableKeyEvents:true
                },
                {
                  xtype:'textfield',
                  name:'timeout',
                  fieldLabel:'Time Out',
                  enableKeyEvents:true
                },
                {
                    fieldLabel: 'Shift Type',
                    xtype: 'cbshifttype',
                    name: 'shifttype_shifttype_id',
                    readOnly: false
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Absent Reason',
                    labelWidth: 100,
                    // The body area will contain three text fields, arranged
                    // horizontally, separated by draggable splitters.
                    layout: 'hbox',
                    items: [{
                            xtype:'textfield',
                            readOnly:true,
                            name:'absenttype_absenttype',
                            width:'300px'
                        },{
                            xtype: 'button',
                            text:'change',
                            action:'reason',
                            margin:'0 10'
                        }]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'On Duty outside',
                    labelWidth: 100,
                    // The body area will contain three text fields, arranged
                    // horizontally, separated by draggable splitters.
                    layout: 'hbox',
                    items: [
                        {
                            xtype:'textfield',
                            readOnly:true,
                            name:'project_project',
                            width:'300px'
                        },{
                            xtype: 'button',
                            text:'change',
                            action:'onduty',
                            margin:'0 10'
                        }]
                },
                {
                    xtype:'textareafield',
                    name:'description',
                    readOnly:true,
                    width:'100%',
                    fieldLabel:'Note'
                },
                


            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});