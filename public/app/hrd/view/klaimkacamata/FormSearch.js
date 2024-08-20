Ext.define('Hrd.view.klaimkacamata.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.klaimkacamataformsearch',
    requires: ['Hrd.template.ComboBoxFields'],
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Type',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1,
                        margin: '0 0 0 10px'
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'Permanent/Contract/Candidate',
                            name: 'size',
                            inputValue: 'm',
                            checked:true,
                        }, {
                            boxLabel: 'Daily Permanent',
                            name: 'size',
                            inputValue: 'xl'
                        }
                    ]
                },
                {
                    margin:'10px 0 0 0',
                    xtype: 'combobox',
                    fieldLabel: 'Department',
                    name: 'department_department_id',
                    displayField: cbf.department.d,
                    valueField: cbf.department.v

                }
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});