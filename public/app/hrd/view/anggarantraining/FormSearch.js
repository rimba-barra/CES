Ext.define('Hrd.view.anggarantraining.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.anggarantrainingformsearch',
    requires: [],
    collapsed: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            layout: 'hbox',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        margin:'5px 10px 5px 5px'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Tahun',
                            name: 'year',
                            displayField: 'name',
                            valueField: 'number'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Departemen',
                            name: 'department_id',
                            displayField: 'code',
                            valueField: 'department_id'
                        }
                    ]
                }

            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});