Ext.define('Hrd.view.overtimetransaction.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.overtimetransactionformsearch',
    requires: [],
    collapsed: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        margin: '0 10px 0 0',
                        labelWidth: 70,
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'employee_name',
                            labelWidth: 50,
                            fieldLabel: 'Name',

                        },
                        {
                            xtype: 'combobox',
                            name: 'department_department_id',
                            fieldLabel: 'Dept.',
                            labelWidth: 50,
                            displayField: 'department',
                            valueField: 'department_id'
                        },
                        {
                            fieldLabel: 'Start Date',
                            xtype: 'datefield',
                            name:'start_date',
                            format:'d-m-Y',
                            flex: 1,
                            submitFormat:'Y-m-d'
                        },
                        {
                            fieldLabel: 'End Date',
                            xtype: 'datefield',
                            name:'end_date',
                            format:'d-m-Y',
                            flex: 1,
                            width: 150,
                            submitFormat:'Y-m-d'
                        },
                        {
                            xtype: 'button',
                            action: 'search',
                            text: 'Search',
                            padding: 5,
                            width: 75,
                            iconCls: 'icon-search',
                        },
                        {
                            xtype: 'button',
                            action: 'reset',
                            text: 'Reset',
                            padding: 5,
                            width: 75,
                            iconCls: 'icon-reset',
                        }
                    ]
                }
            ] ,
            dockedItems:[]       
        });
        

        me.callParent(arguments);
    }
});