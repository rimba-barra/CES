Ext.define('Hrd.view.sanction.FormData', {
    alias: 'widget.sanctionformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.SanctionType'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height:420,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            layout:'hbox',
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                  xtype:'hiddenfield',
                  name:'sanction_id'
                },
                {
                  xtype:'hiddenfield',
                  name:'employee_employee_id'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Employee',
                    labelWidth: 100,
                    // The body area will contain three text fields, arranged
                    // horizontally, separated by draggable splitters.
                    layout: 'hbox',
                    defaults:{
                        xtype:'textfield',
                        margin:'0 5 0 0'
                    },
                    items: [{
                            name:'employee_employee_nik',
                            readOnly:true
                        }, {
                            name:'employee_employee_name'
                        },{
                            xtype:'button',
                            text:'BROWSE',
                            action:'lookup_employee'
                        }
                    ]
                },
                {
                    fieldLabel: 'Division',
                    name:'division_division',
                            readOnly:true
                },
                {
                    name:'group_group_name',
                    fieldLabel: 'Group',
                            readOnly:true
                },
                {
                    xtype:'cbsanctiontype',
                    fieldLabel: 'Sanction',
                    name:'sanctiontype_sanctiontype_id'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Date',
                    layout: 'hbox',
                    margin:'5 0 0 0',
                    flex: 1,
                    width: '100%',
                    items: [
                        {
                            xtype: 'datefield',
                            name:'start_date',
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
                            name:'end_date',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype:'textareafield',
                    name:'note',
                    margin:'5 0 0 0',
                    fieldLabel:'Note',
                    width:500,
                    height:100
                }
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});