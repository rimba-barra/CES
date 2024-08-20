Ext.define('Hrd.view.trainingattendance.FormData', {
    alias: 'widget.trainingattendanceformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingattendance.GridDetail',
    'Hrd.view.trainingattendance.GridDetailDateForm',
    'Hrd.view.trainingattendance.GridDetailFile',
    'Hrd.view.trainingattendance.GridDetailFileSchedule',
    //added by anas 20062022
    'Hrd.view.trainingattendance.GridDetailSurvey'],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    height: 500,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
               {
                    xtype:'hiddenfield',
                    name:'trainingregistration_id'
                },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Training Schedule',
                //     name: 'trainingschedule_id',
                //     displayField: 'trainingschedule',
                //     valueField: 'trainingschedule_id',
                // },
                {
                                    xtype: 'combobox',
                                    name: 'trainingschedule_id',
                                    fieldLabel: 'Training Schedule',
                                    width:400,
                                    displayField: 'trainingname',
                                    valueField: 'trainingschedule_id',
                                    readOnly: false,
                                    allowBlank: true,
                                    matchFieldWidth: false,
                                    selectOnFocus :true,
                                    queryMode: 'local',
                                    tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="500px" >',
                                      '<tr class="x-grid-row">',
                                          '<th width="100px"><div class="x-column-header x-column-header-inner">Training Name</div></th>',
                                          '<th width="100px"><div class="x-column-header x-column-header-inner">Periode</div></th>',
                                          '<th width="100px"><div class="x-column-header x-column-header-inner">Batch</div></th>',
                                      '</tr>',
                                      '<tpl for=".">',
                                          '<tr class="x-boundlist-item">',
                                              '<td ><div class="x-grid-cell x-grid-cell-inner">{trainingname}</div></td>',
                                              '<td><div class="x-grid-cell x-grid-cell-inner">{periode}</div></td>',
                                              '<td><div class="x-grid-cell x-grid-cell-inner">{batch}</div></td>',                              
                                          '</tr>',
                                      '</tpl>',
                                   '</table>'
                                    )
                                },
                {
                    xtype: 'textfield',
                    name:'periode',
                    fieldLabel:'Periode',
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
                },
                {
                    xtype: 'textfield',
                    name:'enddate',
                    fieldLabel:'End Date',
                    readOnly: true,
                },
                // {
                //     xtype: 'xmoneyfield',
                //     name:'trainingcost',
                //     fieldLabel:'Training Cost',
                //     maskRe: /[0-9\.]/,
                //     readOnly: true
                // },
                // {
                //     xtype: 'xmoneyfield',
                //     name:'accomodation',
                //     fieldLabel:'Accomodation',
                //     maskRe: /[0-9\.]/,
                //     readOnly: true
                // },
                // {
                //     xtype: 'xmoneyfield',
                //     name:'transport',
                //     fieldLabel:'Transport',
                //     maskRe: /[0-9\.]/,
                //     readOnly: true
                // },
                // {
                //     xtype:'button',
                //     text:'CALCULATE',
                //     action:'calculate_trainingcost'
                // },
                // {
                //     xtype: 'xmoneyfield',
                //     name:'totalcost',
                //     fieldLabel:'Total Cost',
                //     maskRe: /[0-9\.]/,
                //     readOnly: true
                // },
                {
                    xtype: 'employeetraininggriddetail',
                    height: 150,
                    style: 'padding: 10 0 10 0'
                },
                {
                    xtype: 'textfield',
                    name:'employee_name',
                    fieldLabel:'Employee Name',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    name:'departement',
                    fieldLabel:'Departement',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    name:'reportto',
                    fieldLabel:'Report To',
                    readOnly: true,
                },
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
                    xtype: 'textfield',
                    name:'nilai',
                    fieldLabel:'Nilai Pre-Test',
                },
                {
                    xtype: 'textfield',
                    name:'nilai_post',
                    fieldLabel:'Nilai Post-test',
                },
                {
                    xtype: 'trainingattendanceddfgrid',
                    height: 180,
                    flex: 2,
                    style: 'padding: 10 0 10 0'
                },
                {
                    xtype: 'trainingattendancedetailfilegrid',
                    height: 180,
                    flex: 2,
                    style: 'padding: 10 0 10 0'
                },

                //added by anas 20062022
                {
                    xtype: 'trainingattendancedsgrid',
                    height: 180,
                    flex: 2,
                    style: 'padding: 10 0 10 0'
                },
                //end added by anas
                {
                    xtype: 'button',
                    action:'save_once_trainingattendance',
                    text:'Save Nilai'
                },
                // {
                //     xtype: 'trainingattendancedetailfileschedulegrid',
                //     height: 180,
                //     flex: 2,
                //     style: 'padding: 10 0 10 0'
                // },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});