Ext.define('Hrd.view.absentrecord.FormSetupShift', {
    alias: 'widget.absentrecordformsetupshift',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.ShiftType'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        var c = 31;
        var cb = [];
        for (var i = 1; i <= c; i++) {
            cb.push({boxLabel: i, name: 'day_' + i, inputValue: i, margin: 5});
        }
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
                    xtype: 'fieldset',
                    title: 'Tools',
                    layout: 'hbox',
                  
                    
                    items: [
                        {
                            xtype:'button',
                            action:'genholiday',
                            text:'Generate from Holiday'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Shift Type',
                    layout: 'hbox',
                  
                    defaults: {
                        xtype: 'textfield',
                        readOnly: true,
                        margin:'0 10 0 0',
                    },
                    items: [
                        {
                            fieldLabel: '',
                            xtype: 'cbshifttype',
                            name: 'shifttype_id',
                            readOnly:false
                        },
                        {
                            
                            name: 'in_time',
                        },
                        {
                            xtype: 'label',
                            text: 's/d'
                        },
                        {
                            name: 'out_time'
                        }
                    ]
                },
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Days',
                    // Arrange checkboxes into two columns, distributed vertically
                    columns: 7,
                    vertical: true,
                    items: cb
                }


            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});