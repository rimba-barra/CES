Ext.define('Hrd.view.overtimevp.FormData', {
    alias: 'widget.overtimevpformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields'],
    id: 'formOvertimevpID',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                  xtype:'hiddenfield',
                  name:'overtimevp_id'
                },
                {
                    xtype: 'container',
                    layout:'hbox',
                    defaults:{
                         xtype: 'textfield',
                         margin: '0px 10px 0px 0px'
                    },
                    items: [
                        {
                           
                            fieldLabel: 'Work lifetime',
                            name:'start_year'
                        },
                        {
                            
                            fieldLabel: 'To',
                            name:'end_year',
                            labelWidth:20,
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    name:'value',
                    fieldLabel: 'Overtime value / hour'
                }
            ],
            dockedItems: [],
        });

        me.callParent(arguments);
    }

});