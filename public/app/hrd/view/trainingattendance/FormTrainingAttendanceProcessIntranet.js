Ext.define('Hrd.view.trainingattendance.FormTrainingAttendanceProcessIntranet', {
    alias: 'widget.formtrainingattendanceprocessintranet',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingattendance.Gridbrowseintranettrainingattendance', 
                'Hrd.view.trainingattendance.GridDetailDate', 
                'Hrd.view.trainingattendance.GridFile', 
                //added by anas 20062022
                'Hrd.view.trainingattendance.GridDetailSurvey'],
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
                    fieldLabel:'End Time',
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
                //     name:'nilai',
                //     fieldLabel:'Nilai Pre-Test',
                // },
                // {
                //     xtype: 'textfield',
                //     name:'nilai_post',
                //     fieldLabel:'Nilai Post-test',
                // },
                //end updated by anas
                
                {
                    xtype: 'combobox',
                    fieldLabel: 'Implementation Plan',
                    name: 'imp_plan',
                    store : new Ext.data.SimpleStore({
                    data : [['', ''], [1, 'Sharing in my department'], [2, 'Sharing in another department'], [3, 'Do in my job']],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    name:'time_plan',
                    fieldLabel:'When',
                    readOnly: true,
                },
                {
                    xtype:'textareafield',
                    cols:50,
                    fieldLabel:'Description implementation planning',
                    name:'desc_imp',
                    readOnly: true,
                },
                {
                    xtype:'textareafield',
                    cols:50,
                    fieldLabel:'Testimoni',
                    name:'testimonial',
                    readOnly: true,
                },
                {
                    xtype:'textareafield',
                    cols:50,
                    fieldLabel:'Advices',
                    name:'suggestion',
                    readOnly: true,
                },
                {
                    xtype: 'trainingattendanceddgrid',
                    height: 150,
                    style: 'padding: 10 0 10 0'
                },
                {
                    xtype: 'trainingattendancefilegrid',
                    height: 150,
                    style: 'padding: 10 0 10 0'
                },
                //added by anas 20062022
                {
                    xtype: 'trainingattendancedsgrid',
                    height: 150,
                    style: 'padding: 10 0 10 0'
                },

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
                        action: 'processapproveattendance',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Approve'
                    },
                    {
                        xtype: 'button',
                        action: 'processrejectattendance',
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