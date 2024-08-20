Ext.define('Hrd.view.trainingregistration.FormTrainingRegistrationProcessIntranet', {
    alias: 'widget.formtrainingregistrationprocessintranet',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingregistration.Gridbrowseintranettrainingregistration','Hrd.view.trainingregistration.GridCompetency'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height:500,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    name:'periode',
                    fieldLabel:'Periode',
                    readOnly: true,
                },
                //added by anas 18052022
                {
                    xtype: 'textfield',
                    name:'trainingschedule_id',
                    fieldLabel:'Training Schedule ID',
                    hidden: true
                },
                //end added by anas
                {
                    xtype: 'textfield',
                    name:'trainingname',
                    fieldLabel:'Training Schedule',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    name:'batch',
                    fieldLabel:'Batch',
                    readOnly: true,
                },
                {
                    xtype: 'trainingregistrationcompetencygrid',
                    height: 150,
                    style: 'padding: 10 0 10 0'
                },
                {
                    xtype: 'textfield',
                    name:'vendor',
                    fieldLabel:'Vendor',
                    readOnly: true,
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Program',
                    name: 'skill_trainingname',
                    store : new Ext.data.SimpleStore({
                    data : [['Soft Skill', 'Soft Skill'], ['Technical Skill', 'Technical Skill']],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                    readOnly: true,
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Training Type',
                    name: 'type_trainingname',
                    store : new Ext.data.SimpleStore({
                    data : [['External', 'External'], ['Internal', 'Internal']],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                    readOnly: true,
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Certificate',
                    name: 'certificate_trainingname',
                    store : new Ext.data.SimpleStore({
                    data : [['No', 'No'], ['Yes', 'Yes']],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                    readOnly: true,
                },

                {
                    xtype: 'textfield',
                    name:'startdate',
                    fieldLabel:'Start Date',
                    readOnly: true,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                },
                {
                    xtype: 'textfield',
                    name:'enddate',
                    fieldLabel:'End Date',
                    readOnly: true,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                },
                {
                    xtype: 'textfield',
                    name:'timestart',
                    fieldLabel:'Start Time',
                    readOnly: true,
                    renderer: Ext.util.Format.dateRenderer('H:m')
                },
                {
                    xtype: 'textfield',
                    name:'timeend',
                    fieldLabel:'Start End',
                    readOnly: true,
                    renderer: Ext.util.Format.dateRenderer('H:m')
                },
                {
                    xtype: 'textfield',
                    name:'employee_name',
                    fieldLabel:'Employee',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    name:'department',
                    fieldLabel:'Department',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    name:'employee_reportto',
                    fieldLabel:'Reportto',
                    readOnly: true,
                },


                {
                    xtype: 'textfield',
                    name:'is_ess_approve_reject_date',
                    fieldLabel:'Approve Date',
                    readOnly: true,
                },

                //updated by anas 06042022
                // {
                //     xtype: 'textfield',
                //     name:'training_cost',
                //     fieldLabel:'Training Cost',
                //     readOnly: true,
                // },
                // {
                //     xtype: 'textfield',
                //     name:'accomodation',
                //     fieldLabel:'Accomodation',
                //     readOnly: true,
                // },
                // {
                //     xtype: 'textfield',
                //     name:'transport',
                //     fieldLabel:'Transport',
                //     readOnly: true,
                // },
                // {
                //     xtype: 'textfield',
                //     name:'total_cost',
                //     fieldLabel:'Total Cost',
                //     readOnly: true,
                // },

                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Periode Budget',
                //     name: 'periode_budget',
                //     store: 'Trainingperiode',
                //     width:300,
                //     displayField: 'periode',
                //     valueField: 'periode',
                // },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Budget Type',
                //     name: 'trainingcaption_id',
                //     width:400,
                //     displayField: 'caption',
                //     valueField: 'trainingcaption_id',
                //     readOnly: true
                // },
                // {
                //     xtype: 'xmoneyfield',
                //     name:'balance_budget',
                //     fieldLabel:'Balance Budget',
                //     readOnly: true,
                // },
                // {
                //     xtype: 'xmoneyfield',
                //     name:'balance_budget_employee',
                //     fieldLabel:'Balance Budget Employee',
                //     readOnly: true,
                // },
                // {
                //     xtype: 'xmoneyfield',
                //     name:'extra_budget',
                //     fieldLabel:'Extra Budget',
                //     readOnly: true,
                // },
                // {
                //     xtype: 'checkbox',
                //     boxLabel: 'Tidak Sesuai Budget',
                //     fieldLabel:'&nbsp;',
                //     name: 'hc_approve_reject',
                //     uncheckedValue: '0',
                //     inputValue: '1',
                //     readOnly: true,
                // },
                // {
                //     xtype: 'checkbox',
                //     boxLabel: 'Approve Extra Budget',
                //     fieldLabel:'&nbsp;',
                //     name: 'hc_approve_extra',
                //     uncheckedValue: '0',
                //     inputValue: '1'
                // },
                //end updated by anas 06042022

                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Periode',
                //     name: 'trainingperiodeapply_id',
                //     store: 'Trainingperiode',
                //     width:300,
                //     displayField: 'periode',
                //     valueField: 'periode',
                // },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Employee',
                //     name: 'employee_id',
                //     width:300,
                //     displayField: 'employee_name',
                //     valueField: 'employee_id',
                // },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Is HC Approve',
                //     name: 'hc_approve_reject',
                //     store : new Ext.data.SimpleStore({
                //     data : [[0, 'No'], [1, 'Yes'], [99, 'All']],
                //         fields : ['value', 'text']
                //     }),
                //     valueField : 'value',
                //     displayField : 'text',
                // },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Tidak Sesuai Budget',
                //     name: 'tidak_sesuai_budget',
                //     store : new Ext.data.SimpleStore({
                //     data : [[0, 'No'], [1, 'Yes'], [99, 'All']],
                //         fields : ['value', 'text']
                //     }),
                //     valueField : 'value',
                //     displayField : 'text',
                // },
                // {
                //     xtype:'button',
                //     text:'Search',
                //     action:'search_trainingregistration'
                // },
                // {
                //             xtype: 'gridbrowseintranettrainingregistration',
                //             height: 180,
                //             flex: 2,
                //             style: 'padding: 10 0 10 0'
                //         },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
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
                        action: 'processapprove',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Approve'
                    },
                    {
                        xtype: 'button',
                        action: 'processreject',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Reject'
                    }
                ]
            }
        ];
        return x;
    }
});