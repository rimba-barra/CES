Ext.define('Hrd.view.uploadtransaction.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.uploadtransactionpanel',
    requires: ['Hrd.template.ComboBoxFields'],
    itemId: 'UploadTransaction',
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
                            title: 'Upload Transaction Data',
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
                                            boxLabel: 'Attendance', name: 'upload_type', inputValue: "uploadtransaction_attendance"
                                        },
                                        {
                                            boxLabel: 'Overtime', name: 'upload_type', inputValue: "uploadtransaction_overtime"
                                        },
                                        {
                                            boxLabel: 'Uang Makan Lembur', name: 'upload_type', inputValue: "uploadtransaction_uangmakan"
                                        },
                                        {
                                            boxLabel: 'Medical Claim (Internal)', name: 'upload_type', inputValue: "uploadtransaction_medicalclaim"
                                        },
                                        {
                                            boxLabel: 'Unpaid Leave', name: 'upload_type', inputValue: "uploadtransaction_unpaidleave"
                                        },
                                        {
                                            boxLabel: 'Cuti Besar 5 Tahunan', name: 'upload_type', inputValue: "uploadtransaction_cutibesar"
                                        },
                                        {
                                            boxLabel: 'Saldo Cuti Dibayarkan', name: 'upload_type', inputValue: "uploadtransaction_saldocutibayar"
                                        },
                                        {
                                            boxLabel: 'Potongan Transport', name: 'upload_type', inputValue: "uploadtransaction_potongantransport"
                                        },
                                        {
                                            boxLabel: 'Saldo Cuti Minus', name: 'upload_type', inputValue: "uploadtransaction_saldocutiminus"
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
                                    name: 'projectpt_id',
                                    fieldLabel: 'ProjectPt',
                                    width:450,
                                    displayField: 'project_name',
                                    valueField: 'projectpt_id',
                                    readOnly: false,
                                    allowBlank: true,
                                    matchFieldWidth: false,
                                    selectOnFocus :true,
                                    queryMode: 'local',
                                    tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="500px" >',
                                      '<tr class="x-grid-row">',
                                          '<th width="100px"><div class="x-column-header x-column-header-inner">Project Name</div></th>',
                                          '<th width="100px"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                                      '</tr>',
                                      '<tpl for=".">',
                                          '<tr class="x-boundlist-item">',
                                              '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                                              '<td><div class="x-grid-cell x-grid-cell-inner">{pt_name}</div></td>',                              
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
                                //     name: 'ptpt_id',
                                //     fieldLabel: 'Pt',
                                //     width:400,
                                //     displayField: 'ptpt_name',
                                //     valueField: 'ptpt_id',
                                //     readOnly: false,
                                //     allowBlank: true,
                                //     matchFieldWidth: false,
                                //     selectOnFocus :true,
                                //     queryMode: 'local',
                                //     tpl: Ext.create('Ext.XTemplate',
                                //     '<table class="x-grid-table" width="500px" >',
                                //       '<tr class="x-grid-row">',
                                //           '<th width="100px"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                                //       '</tr>',
                                //       '<tpl for=".">',
                                //           '<tr class="x-boundlist-item">',
                                //               '<td><div class="x-grid-cell x-grid-cell-inner">{ptpt_name}</div></td>',                              
                                //             '</tr>',
                                //         '</tpl>',
                                //     '</table>'
                                //     )
                                // },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'file_name_show',
                                            fieldLabel: 'File Name',
                                            readOnly: true,
                                            width:450,
                                            margin: '10 0px',
                                        },
                                        {
                                            xtype: 'filefield',
                                            fieldLabel: '',
                                            itemId: 'file_name_upload',
                                            name: 'file_name_upload',
                                            buttonOnly: true,
                                            buttonText: 'Browse',
                                            width:50,
                                            margin: '10 0px',
                                        },
                                        {
                                            xtype:'button',
                                            fieldLabel:' ',
                                            text:'View File',
                                            itemId: 'view_file',
                                            action:'view_file',
                                            margin: '10 0px',
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        
                                        {
                                            xtype:'button',
                                            fieldLabel:' ',
                                            text:'Download Template',
                                            itemId: 'download_template_file',
                                            action:'download_template_file',
                                            margin: '10 0px',
                                            disabled: true
                                        }
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
                                itemId: 'btnUpload',
                                iconCls: 'icon-save',
                                text: 'Upload Excel'
                            },
                            {
                                xtype: 'button',
                                action: 'viewtable',
                                padding: 5,
                                itemId: 'btnViewTable',
                                iconCls: 'icon-save',
                                text: 'View Table'
                            }

                        ]
                    }

                }
            ]
        });

        me.callParent(arguments);
    }


});