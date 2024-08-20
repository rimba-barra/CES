Ext.define('Hrd.view.registertrainingbytype.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.registertrainingbytypeformsearch',
    requires: ['Hrd.template.ComboBoxFields'],
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
              
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    width: 600,
                    defaults: {
                        flex: 1,
                        margin: '0 10px 10px 0',
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d'
                    },
                    items: [
                        {
                            name: 'start_date',
                            fieldLabel: 'Training Start Date',
                            size: 30
                        },
                        {
                            name: 'end_date',
                            labelWidth: 30,
                            fieldLabel: 'to',
                            margin: '0 10px 10px 50px',
                            size: 30
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});