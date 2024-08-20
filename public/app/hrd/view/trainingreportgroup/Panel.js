Ext.define('Hrd.view.trainingreportgroup.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.trainingreportgrouppanel',
    requires: ['Hrd.template.ComboBoxFields'],
    itemId: 'TrainingReportGroupPanel',
    layout: 'fit',
    autoScroll: true,
    height: '300px',
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();



        var based = [{
                number: 1,
                name: 'Division'
            }, {
                number: 2,
                name: 'Category ( Golongan )'
            }, {
                number: 3,
                name: 'N.I.K'
            }, {
                number: 4,
                name: 'Group ( Kelompok)'
            }];

        var basedStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: based
        });




        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    layout: 'hbox',
                    bodyPadding: 10,
                    itemId: 'projectptFormID',
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
                            title: 'Format Laporan',
                            labelWidth: 100,
                            margin: '0 20px 0 0',
                            layout: 'vbox',
                            width: 200,
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '',
                                    // Arrange radio buttons into two columns, distributed vertically

                                    labelWidth: 1,
                                    width: '100%',
                                    layout: 'vbox',
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {
                                            boxLabel: 'Report', name: 'report_type', inputValue: "daftar", checked: true
                                        },
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
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'dfdatefield',
                                        width: 250
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Periode',
                                            name: 'start_date',
                                            value:new Date()
                                        },
                                        {
                                            xtype: 'label',
                                            text: 's/d',
                                            margin: '0 10px',
                                            width: 30
                                        },
                                        {
                                            fieldLabel: '',
                                            name: 'end_date',
                                            width: 150,
                                            value:new Date()
                                        },
                                    ]
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'employee_id',
                                    fieldLabel: 'Employee',
                                    width:400,
                                    displayField: 'employee_name',
                                    valueField: 'employee_id',
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'department_id',
                                    fieldLabel: 'Department',
                                    width:400,
                                    displayField: 'department',
                                    valueField: 'department_id',
                                },

                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Subholding',                    
                                    itemId: 'fd_subholding',
                                    name: 'subholding_id',
                                    displayField: 'name',
                                    valueField: 'subholding_id',        
                                    multiSelect: true,
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Project',                    
                                    itemId: 'fd_project',
                                    name: 'project_id',
                                    displayField: 'name',
                                    valueField: 'code',        
                                    multiSelect: true,
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'PT',
                                    itemId: 'fd_pt',
                                    name: 'pt_id',
                                    displayField: 'name',
                                    valueField: 'code',
                                    multiSelect: true,
                                },


                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Training Close',
                                    name: 'close',
                                    store : new Ext.data.SimpleStore({
                                    data : [['', 'ALL'], [0, 'Open'], [1, 'Close']],
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
                                xtype: 'hiddenfield',
                                action: 'view',
                                padding: 5,
                                itemId: 'btnSearch',
                                iconCls: 'icon-save',
                                text: 'View Report'
                            },
                            {
                                xtype: 'tbfill',
                            },                            
                            {
                                xtype: 'button',
                                action: 'export',
                                padding: 5,
                                itemId: 'btnExport',
                                iconCls: 'icon-save',
                                text: 'Export to Excel'
                            }

                        ]
                    }

                }
            ]
        });

        me.callParent(arguments);
    }


});