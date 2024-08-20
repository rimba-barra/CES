Ext.define('Hrd.view.absentrecord.FormDataOnduty', {
    alias: 'widget.absentrecordformdataonduty',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.ShiftType','Hrd.template.combobox.Parametertlk'],
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
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Project',
                    labelWidth: 100,
                    // The body area will contain three text fields, arranged
                    // horizontally, separated by draggable splitters.
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            name:'parametertlk_code',
                            enableKeyEvents:true,
                            margin: '0 10 0 0'
                        },
                        {
                            xtype: 'cbparametertlk',
                            name:'parametertlk_parametertlk_id',
                            fieldLabel:'',
                            flex: 2
                        }]
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
                            name:'start_date',
                            format:'d/m/Y',
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
                            format:'d/m/Y',
                            name:'end_date',
                            flex: 1
                        }
                    ]
                }






            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});