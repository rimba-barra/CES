Ext.define('Hrd.view.trainingregistration.FormData', {
    alias: 'widget.trainingregistrationformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingregistration.GridDetail', 'Hrd.library.template.view.MoneyField'],
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
                {
                    xtype: 'xmoneyfield',
                    name:'trainingcost',
                    fieldLabel:'Training Cost',
                    maskRe: /[0-9\.]/
                },
                {
                    xtype: 'xmoneyfield',
                    name:'accomodation',
                    fieldLabel:'Accomodation',
                    maskRe: /[0-9\.]/
                },
                {
                    xtype: 'xmoneyfield',
                    name:'transport',
                    fieldLabel:'Transport',
                    maskRe: /[0-9\.]/
                },
                {
                    xtype:'button',
                    text:'CALCULATE & APPLY',
                    action:'calculate_trainingcost'
                },
                {
                    xtype: 'xmoneyfield',
                    name:'totalcost',
                    fieldLabel:'Total Cost',
                    maskRe: /[0-9\.]/,
                    readOnly: true,
                },
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
                // {
                //     xtype: 'textfield',
                //     name:'periode',
                //     fieldLabel:'Periode',
                //     readOnly: true,
                // },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Periode Budget',
                    name: 'periode_budget',
                    store: 'Trainingperiode',
                    width:300,
                    displayField: 'periode',
                    valueField: 'periode',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Budget Type',
                    name: 'trainingcaption_id',
                    width:400,
                    displayField: 'caption',
                    valueField: 'trainingcaption_id',
                    readOnly: true
                },
                {
                    xtype: 'xmoneyfield',
                    name:'balance_budget',
                    fieldLabel:'Balance Budget',
                    readOnly: true,
                },
                {
                    xtype: 'xmoneyfield',
                    name:'balance_budget_employee',
                    fieldLabel:'Balance Budget Employee',
                    readOnly: true,
                },
                {
                    xtype: 'xmoneyfield',
                    name:'extra_budget',
                    fieldLabel:'Extra Budget',
                    readOnly: true,
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Tidak Sesuai Budget',
                    fieldLabel:'&nbsp;',
                    name: 'hc_approve_reject',
                    uncheckedValue: '0',
                    inputValue: '1',
                    readOnly: true,
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Approve Extra Budget',
                    fieldLabel:'&nbsp;',
                    name: 'hc_approve_extra',
                    uncheckedValue: '0',
                    inputValue: '1'
                },
                {
                    xtype: 'button',
                    action:'save_once',
                    text:'Save Extra Budget'
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});