Ext.define('Hrd.view.klaimpengobatan.FormData', {
    alias: 'widget.klaimpengobatanformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.klaimpengobatan.GridClaim'],
    frame: false,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();




        Ext.applyIf(me, {
            defaults: {},
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'klaimpengobatan_id'
                },
                {
                    xtype: 'fieldset',
                    title: 'Employee Information',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                margin: '0 50px 0 0',
                                readOnly: true,
                            },
                            items: [
                                {
                                    name: 'employee_name',
                                    fieldLabel: 'Employee Name',
                                    stayReadOnly:true
                                },
                                {
                                    name: 'group_code',
                                    labelWidth: 150,
                                    fieldLabel: 'Category (Golongan)',
                                    stayReadOnly:true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                margin: '0 50px 0 0',
                                readOnly: true,
                            },
                            items: [
                                {
                                    name: 'hire_date',
                                    xtype: 'datefield',
                                    format: 'd/m/Y',
                                    fieldLabel: 'Hire Date',
                                    stayReadOnly:true
                                },
                                {
                                    name: 'year',
                                    labelWidth: 150,
                                    fieldLabel: 'Year of plafon',
                                    stayReadOnly:true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Claim',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'container'
                    },
                    items: [
                        {
                            flex: 2,
                            items: [
                                {
                                    xtype: 'klaimpengobatanclaimgrid',
                                    id:'klaimpengobatanclaimgridID',
                                    height: 200
                                }
                            ]
                        },
                        {
                            margin: '0 0 0 10px',
                            flex: 3,
                            width: '100%',
                            defaults: {
                                xtype: 'textfield',
                                width: 500
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: '100%',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'textfield',
                                        margin: '5px 10px 0 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            name: 'jenispengobatan_jenispengobatan_id',
                                            fieldLabel: 'Claim Type',
                                            displayField: cbf.jenispengobatan.d,
                                            valueField: cbf.jenispengobatan.v
                                        },
                                        {
                                            name: 'jenispengobatan_jenispengobatan',
                                            readOnly:true,
                                            
                                            fieldLabel: ''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: '100%',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'datefield',
                                        format: 'd/m/Y',
                                        submitFormat: 'Y-m-d',
                                        margin: '5px 50px 5px 0'
                                    },
                                    items: [
                                        {
                                            name: 'claim_date',
                                            fieldLabel: 'Claim Date'
                                        },
                                        {
                                            name: 'kwitansi_date',
                                            labelWidth: 100,
                                            fieldLabel: 'Kuitansi Date'
                                        }
                                    ]
                                },
                                {
                                    name: 'docter_name',
                                    fieldLabel: 'Docter Name'
                                },
                                {
                                    name: 'hospital_name',
                                    fieldLabel: 'Hospital Name'
                                },
                                {
                                    name: 'apotic_name',
                                    fieldLabel: 'Pharmacy Name'
                                },
                                {
                                    name: 'description',
                                    fieldLabel: 'Description'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'textfield',
                                        margin: '0 10px 0 0'
                                    },
                                    items: [
                                        {
                                            name: 'inpatient',
                                            fieldLabel: 'Rawat Inap'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Days'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: '100%',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'textfield',
                                        margin: '5px 50px 0 0'
                                    },
                                    items: [
                                        {
                                            name: 'plafon',
                                            fieldLabel: 'Plafon',
                                            stayReadOnly:true
                                        },
                                        {
                                            name: 'total',
                                            labelWidth: 50,
                                            fieldLabel: 'Quantity'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: '100%',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'textfield',
                                        margin: '5px 50px 0 0'
                                    },
                                    items: [
                                        {
                                            name: 'total_claim',
                                            stayReadOnly:true,
                                            fieldLabel: 'Total Claim'
                                        },
                                        {
                                            name: 'saldo_claim',
                                            labelWidth: 50,
                                            stayReadOnly:true,
                                            fieldLabel: 'Saldo'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Claim for',
                                    layout: 'hbox',
                                    width: 400,
                                    defaults: {
                                        flex: 1,
                                        xtype: 'radiofield',
                                        name: 'claim_subject'
                                    },
                                    items: [
                                        {
                                            boxLabel: 'Self',
                                            checked: true,
                                            inputValue: "S"
                                        },
                                        {
                                            boxLabel: 'Wife',
                                            inputValue: "W"
                                        },
                                        {
                                            boxLabel: 'Daughter',
                                            inputValue: "D"
                                        }
                                    ]
                                },
                                {
                                    name:'paid',
                                    xtype: 'checkbox',
                                    inputValue:1,
                                    fieldLabel: 'Paid status',
                                    boxLabel: 'Yes',
                                }
                            ]

                        }
                    ]
                }
            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});