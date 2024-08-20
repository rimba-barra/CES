Ext.define('Erems.view.popupfollowup.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.popupfollowupformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
               {
                    xtype: 'textfield',
                   
                    name: 'unit_number',
                    fieldLabel: 'Unit Number'
                },
                {
                    xtype: 'textfield',
                    name: 'purchaseletter_no',
                    fieldLabel: 'Purchaseletter Number'
                },
               /* {
                    xtype: 'panel',
                    height: 48,
                    bodyStyle:'background:none;border:0;',
                    anchor:'-15',
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            itemId: 'schedule_duedate',
                            name: 'schedule_duedate',
                            fieldLabel: 'Due date',
                            labelSeparator:'',
                            width: 150,
                            labelAlign: 'top',
                            editable: false,
                            format: 'd-m-Y',
                            altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat: 'Y-m-d H:i:s.u'
                        },
                       
                    ]
                }
                */
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
