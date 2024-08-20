Ext.define('Hrd.view.transferapitransaction.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.transferapitransactionpanel',
    requires: ['Hrd.template.ComboBoxFields'],
    itemId: 'TransferApiTransaction',
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
                            title: 'Transfer Transaction Data',
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
                                            boxLabel: 'Attendance', name: 'transfer_type', inputValue: "transfer_attendance", checked: true
                                        },
                                        {
                                            boxLabel: 'Overtime', name: 'transfer_type', inputValue: "transfer_overtime"
                                        },
                                        {
                                            boxLabel: 'Uang Makan Lembur', name: 'transfer_type', inputValue: "transfer_uangmakanlembur"
                                        },
                                        {
                                            boxLabel: 'Medical Claim (Internal)', name: 'transfer_type', inputValue: "transfer_medicalclaim"
                                        },
                                        {
                                            boxLabel: 'Unpaid Leave', name: 'transfer_type', inputValue: "transfer_unpaidleave"
                                        },
                                        {
                                            boxLabel: 'Cuti Besar 5 Tahunan', name: 'transfer_type', inputValue: "transfer_cutibesar"
                                        },
                                        {
                                            boxLabel: 'Saldo Cuti Dibayarkan', name: 'transfer_type', inputValue: "transfer_saldocutibayar"
                                        },
                                        {
                                            boxLabel: 'Potongan Transport', name: 'transfer_type', inputValue: "transfer_potongantransport"
                                        },
                                        {
                                            boxLabel: 'Saldo Cuti Minus', name: 'transfer_type', inputValue: "transfer_saldocutiminus"
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
                                    xtype: 'combobox',
                                    name: 'ptpt_id',
                                    fieldLabel: 'Pt',
                                    width:450,
                                    displayField: 'ptpt_name',
                                    valueField: 'ptpt_id',
                                    readOnly: false,
                                    allowBlank: true,
                                    matchFieldWidth: false,
                                    selectOnFocus :true,
                                    queryMode: 'local',
                                    tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="500px" >',
                                      '<tr class="x-grid-row">',
                                          '<th width="100px"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                                      '</tr>',
                                      '<tpl for=".">',
                                          '<tr class="x-boundlist-item">',
                                              '<td><div class="x-grid-cell x-grid-cell-inner">{ptpt_name}</div></td>',                              
                                            '</tr>',
                                        '</tpl>',
                                    '</table>'
                                    )
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'combobox',
                                        width: 250
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Payroll Process (Month/Year)',
                                            xtype: 'combobox',
                                            name: 'payroll_month',
                                            store : new Ext.data.SimpleStore({
                                            data : [[1, '1'], [2, '2'],[3, '3'], [4, '4'],[5, '5'], [6, '6'],[7, '7'], [8, '8'],[9, '9'], [10, '10'],[11, '11'], [12, '12']],
                                                fields : ['value', 'text']
                                            }),
                                            width:250,
                                            valueField : 'value',
                                            displayField : 'text',
                                        },
                                        {
                                            xtype: 'label',
                                            text: '',
                                            margin: '0 10px',
                                            width: 30
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: '',
                                            name: 'payroll_year',
                                            store: 'Trainingperiode',
                                            width:150,
                                            margin: '10px 0',
                                            displayField: 'periode',
                                            valueField: 'periode',
                                        },
                                    ]
                                },
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
                                // {
                                //     xtype: 'combobox',
                                //     name: 'projectpt_id',
                                //     fieldLabel: 'Projectpt',
                                //     width:400,
                                //     displayField: 'project_name',
                                //     valueField: 'projectpt_id',
                                //     readOnly: false,
                                //     allowBlank: true,
                                //     matchFieldWidth: false,
                                //     selectOnFocus :true,
                                //     queryMode: 'local',
                                //     tpl: Ext.create('Ext.XTemplate',
                                //     '<table class="x-grid-table" width="500px" >',
                                //       '<tr class="x-grid-row">',
                                //           '<th width="100px"><div class="x-column-header x-column-header-inner">Project Name</div></th>',
                                //           '<th width="100px"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                                //       '</tr>',
                                //       '<tpl for=".">',
                                //           '<tr class="x-boundlist-item">',
                                //               '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                                //               '<td><div class="x-grid-cell x-grid-cell-inner">{pt_name}</div></td>',                              
                                //           '</tr>',
                                //       '</tpl>',
                                //    '</table>'
                                //     )
                                // },
                                
                                {
                                    xtype: 'fieldset',
                                    title: 'Last Activity',
                                    flex: 1,
                                    layout: 'vbox',
                                    margin: '50px 20px 0 0',
                                    items: [
                                        
                                        
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                xtype: 'combobox',
                                                width: 250
                                            },
                                            items: [
                                                {
                                                    fieldLabel: 'Payroll Process (Month/Year)',
                                                    xtype: 'combobox',
                                                    name: 'la_payroll_month',
                                                    store : new Ext.data.SimpleStore({
                                                    data : [[1, '1'], [2, '2'],[3, '3'], [4, '4'],[5, '5'], [6, '6'],[7, '7'], [8, '8'],[9, '9'], [10, '10'],[11, '11'], [12, '12']],
                                                        fields : ['value', 'text']
                                                    }),
                                                    width:250,
                                                    valueField : 'value',
                                                    displayField : 'text',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: '',
                                                    margin: '0 10px',
                                                    width: 30
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: '',
                                                    name: 'la_payroll_year',
                                                    store: 'Trainingperiode',
                                                    width:150,
                                                    margin: '10px 0',
                                                    displayField: 'periode',
                                                    valueField: 'periode',
                                                    readOnly: true
                                                },
                                            ]
                                        },
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
                                                    name: 'la_start_date',
                                                    value:'',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 's/d',
                                                    margin: '0 10px',
                                                    width: 30
                                                },
                                                {
                                                    fieldLabel: '',
                                                    name: 'la_end_date',
                                                    width: 150,
                                                    value:'',
                                                    readOnly: true
                                                },
                                            ]
                                        },
                                    ]
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
                                text: 'Process'
                            }

                        ]
                    }

                }
            ]
        });

        me.callParent(arguments);
    }


});