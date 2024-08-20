Ext.define('Hrd.view.trainingschedule.FormData', {
    alias: 'widget.trainingscheduleformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingschedule.GridDetail', 
                'Hrd.view.trainingschedule.GridDetailDate', 
                'Hrd.view.trainingschedule.GridFormBanding', 
                'Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    height: 500,
    editedRow:-1,
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
               {
                    xtype:'hiddenfield',
                    name:'trainingschedule_id'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Training',
                    name: 'trainingname_id',
                    displayField: 'trainingname',
                    valueField: 'trainingname_id',
                    width:450
                },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Periode',
                //     name: 'periode',
                //     store: 'Trainingperiode',
                //     width:300,
                //     displayField: 'periode',
                //     valueField: 'periode',
                // },
                // {
                //     xtype: 'textfield',
                //     name:'batch',
                //     width:300,
                //     fieldLabel:'Batch'
                // },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        width: 450
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Periode',
                            name: 'periode',
                            store: 'Trainingperiode',
                            width:220,
                            displayField: 'periode',
                            valueField: 'periode',
                        },
                        {
                            xtype: 'label',
                            text: 'Batch',
                            margin: '3px 20px',
                            width: 50
                        },
                        {
                            xtype: 'textfield',
                            name:'batch',
                            width:125
                        },
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'trainingbudgetprogram_id',
                    fieldLabel: 'Budget Program',
                    width:450,
                    displayField: 'caption',
                    valueField: 'trainingbudgetprogram_id',
                    readOnly: false,
                    allowBlank: true,
                    matchFieldWidth: false,
                    selectOnFocus :true,
                    queryMode: 'local',
                    tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px" >',
                      '<tr class="x-grid-row">',
                          '<th width="100px"><div class="x-column-header x-column-header-inner">Periode</div></th>',
                          '<th width="100px"><div class="x-column-header x-column-header-inner">Caption</div></th>',
                      '</tr>',
                      '<tpl for=".">',
                          '<tr class="x-boundlist-item">',
                              '<td><div class="x-grid-cell x-grid-cell-inner">{periode}</div></td>',    
                              '<td><div class="x-grid-cell x-grid-cell-inner">{caption}</div></td>',                              
                          '</tr>',
                      '</tpl>',
                    '</table>'
                    )
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Saldo Awal',
                    name: 'budget_trainingbudgetprogram',
                    width:300,
                    readOnly:true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Sisa Saldo',
                    name: 'sisabudget_trainingbudgetprogram',
                    width:300,
                    readOnly:true
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
                            fieldLabel: 'Date',
                            name: 'startdate',
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
                            name: 'enddate',
                            width: 140,
                            value:new Date()
                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout:'hbox',
                    defaults:{
                        xtype:'textfield',
                        width: 250
                    },
                     items: [
                        {
                            fieldLabel: 'Time',
                            name: 'timestart',
                            enableKeyEvents: true,
                            value: '00:00:00',
                            margin: '0 0 10 0'
                        },
                        {
                            xtype: 'label',
                            text: 's/d',
                            margin: '0 10px',
                            width: 30
                        },
                        {
                            fieldLabel: '',
                            name: 'timeend',
                            enableKeyEvents: true,
                            value: '00:00:00',
                            width: 140,
                            margin: '0 10 10 0'
                        }
                    ]
                },
                //added by anas 17062022
                {
                    xtype: 'textfield',
                    name:'duration',
                    fieldLabel:'Duration (minutes)'
                },
                // {
                //     xtype      : 'fieldcontainer',
                //     layout:'hbox',
                //     fieldLabel:'Peserta',
                //     bodyStyle: 'background:none;border:0;',
                //     defaults: {
                //         xtype: 'radiofield',
                //         flex:1
                //     },
                //     items: [
                //         {
                //             boxLabel: 'All',
                //             name: 'peserta',
                //             checked: true,
                //             inputValue: 'All'
                //         }, {
                //             boxLabel: 'Banding',
                //             name: 'peserta',
                //             inputValue: 'Banding'
                //         }, {
                //             boxLabel: 'Employee',
                //             name: 'peserta',
                //             inputValue: 'Employee'
                //         }, {
                //             boxLabel: 'Other',
                //             name: 'peserta',
                //             inputValue: 'Other'
                //         },
                //     ]
                // },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Peserta',
                    name: 'peserta',
                    store : new Ext.data.SimpleStore({
                    data : [[1, 'All'], [2, 'Banding'], [3, 'Employee']],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                },
                {
                    xtype: 'numberfield',
                    name:'quota',
                    fieldLabel:'Quota'
                },
                {
                    xtype: 'textfield',
                    name:'venue',
                    fieldLabel:'Venue'
                },
                {
                    xtype:'textareafield',
                    cols:30,
                    //updated by anas 18052022
                    fieldLabel:'Notes',
                    name:'description'
                },
                {
                    xtype: 'xmoneyfield',
                    name:'estimated',
                    fieldLabel:'Estimated',
                    maskRe: /[0-9\.]/
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Publish to Intranet',
                    fieldLabel:'&nbsp;',
                    name: 'publish',
                    checked: true,
                    inputValue: '1',
                    uncheckedValue: '0',
                },
                {
                    xtype: 'trainingscheduleformbandinggrid',
                    height: 150,
                    style: 'padding: 10 0 10 0'
                },
                {
                    xtype: 'employeetraininggriddetail',
                    height: 150,
                    style: 'padding: 10 0 10 0'
                },
                {
                    xtype: 'trainingscheduleddgrid',
                    height: 150,
                    style: 'padding: 10 0 10 0'
                }
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});