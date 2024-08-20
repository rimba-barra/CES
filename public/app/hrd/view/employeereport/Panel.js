Ext.define('Hrd.view.employeereport.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.employeereportpanel',
    itemId: 'EmployeereportPanel',
    layout: 'fit',
    autoScroll: true,
    height: '200px',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    layout: 'hbox',
                    bodyPadding: 10,
                    itemId: 'EmployeereportFormID',
                    width: '100%',
                    autoScroll: true,
                    height: '200px',
                    defaults: {
                        xtype: 'combobox',
                        margin: '10px 0'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'project_project_id'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'project_name'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_pt_id'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_name'
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Report Type',
                            labelWidth: 100,
                            margin: '0 20px 0 0',
                            layout: 'vbox',
                            width: 200,
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    itemId: 'selectreportID',
                                    labelWidth: 1,
                                    width: '100%',
                                    layout: 'vbox',
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {boxLabel: 'Employee Report', name: 'report_type', inputValue: "employee", checked: true},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Parameters',
                            flex: 1,
                            layout: 'vbox',
                            margin: '0 20px 0 0',
                            items: [                                
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'As Of',
                                    name:'asof_date',
                                    format: 'd-m-Y',
                                    value:new Date(),
                                    submitFormat: 'Y-m-d'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Employee Active/Nonactive',
                                    name: 'employee_active',
                                    store : new Ext.data.SimpleStore({
                                    data : [[99, 'All'], [1, 'Employee Active'], [-1, 'Employee Nonactive']],
                                        fields : ['value', 'text']
                                    }),
                                    valueField : 'value',
                                    displayField : 'text',
                                },
                            ]
                        },
                    ],
                    dockedItems: {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'footer',
                        layout: {
                            padding: 6,
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'button',
                                action: 'export',
                                padding: 5,
                                itemId: 'btnSearch',
                                iconCls: 'icon-save',
                                text: 'View Report'
                            }

                        ]
                    }

                }
            ]
        });

        me.callParent(arguments);
    }


});