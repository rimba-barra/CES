Ext.define('Hrd.view.employeedata.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.employeedatapanel',
    requires: ['Hrd.template.ComboBoxFields'],
    itemId: 'EmployeeDataPanel',
    layout: 'fit',
    autoScroll: true,
    height: '200px',
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();
        
        var reportType = [{
                number:1,
                name:'Daftar'
        },{
                number:2,
                name:'Data Pribadi'
        },{
                number:3,
                name:'Data Keluarga'
        },{
                number:4,
                name:'Potensi Diri & Organisasi'
        },{
                number:5,
                name:'Riwayat Kerja Sebelumnya'
        },{
                number:6,
                name:'Kursus Sebelumnya'
        },{
                number:7,
                name:'Staffing Resume Berdasarkan Departemen'
        },{
                number:8,
                name:'Staffing Resume Berdasarkan Jabatan'
        },{
                number:9,
                name:'Staffing Resume Berdasarkan Golongan'
        },{
                number:10,
                name:'Riwayat Pendidikan'
        },{
                number:11,
                name:'Asuransi'
        },{
                number:12,
                name:'Pajak'
        },{
                number:13,
                name:'Terminasi'
        },{
                number:14,
                name:'Masa Kerja'
        },{
                number:15,
                name:'Koresponnden'
        }];
        
        var reportTypeStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: reportType
        });

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    layout: 'vbox',
                    bodyPadding: 20,
                    width:'100%',
                    autoScroll:true,
                    height:'200px',
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
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Format',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 1,
                                margin: '0 10px 0 0'
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Rekap',
                                    name: 'size',
                                    inputValue: 'm',
                                    id: 'radio1'
                                }, {
                                    boxLabel: 'Detail',
                                    checked: true,
                                    name: 'size',
                                    inputValue: 'l',
                                    id: 'radio2'
                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Active',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 1,
                                margin: '0 10px 0 0'
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'All',
                                    name: 'active',
                                    inputValue: '999'
                                }, {
                                    boxLabel: 'Yes',
                                    checked: true,
                                    name: 'active',
                                    inputValue: 'l'
                                },{
                                    boxLabel: 'No',
                                    name: 'active',
                                    inputValue: '0'
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Status',
                            name: 'employeestatus_id',
                            displayField: cbf.employeeStatus.d,
                            valueField: cbf.employeeStatus.v

                        },
                        {
                            fieldLabel: 'Report Type',
                            name: 'report_type',
                            store:reportTypeStore,
                            width:'500px',
                            displayField: 'name',
                            valueField:'number'
                        },
                        {
                            xtype: 'panel',
                            itemId:'departmentCheckBoxID',
                            bodyPadding:'20px',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Department',
                                    displayField: cbf.department.d,
                                    valueField: cbf.department.v,
                                    defaultType: 'checkboxfield',
                                    items: [
                                        {
                                            boxLabel: 'Anchovies',
                                            name: 'topping',
                                            inputValue: '1',
                                            id: 'checkbox1'
                                        }, {
                                            boxLabel: 'Artichoke Hearts',
                                            name: 'topping',
                                            inputValue: '2',
                                            checked: true,
                                            id: 'checkbox2'
                                        }, {
                                            boxLabel: 'Bacon',
                                            name: 'topping',
                                            inputValue: '3',
                                            id: 'checkbox3'
                                        }
                                    ]
                                }
                            ],
                            bbar: [
                                
                                {
                                    text: 'Select All',
                                    handler: function(el) {
                                        var fc = el.up('panel').down('fieldcontainer');
                                        var items = fc.items.items;
                                  
                                        for(var i in items){
                                            
                                            fc.down('#'+items[i].id).setValue(true);
                                        }
                                    
                                    }
                                },
                                 '-',
                                {
                                    text: 'Deselect All',
                                    handler: function(el) {
                                        var fc = el.up('panel').down('fieldcontainer');
                                        var items = fc.items.items;
                                  
                                        for(var i in items){
                                            
                                            fc.down('#'+items[i].id).setValue(false);
                                        }
                                    }
                                }
                            ]
                        }
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
                                action: 'view',
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