Ext.define('Hrd.view.trainingbudget.FormData', {
    alias: 'widget.trainingbudgetformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
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
                    name:'trainingbudget_id'
                },
                // {
                //     xtype: 'container',
                //     layout: 'hbox',
                //     defaults: {
                //         xtype: 'textfield',
                //         margin: '0 10px 0 0'
                //     },
                //     items: [
                //         {
                //             maskRe: /[0-9]/,
                //             width:300, 
                //             name: 'periode',
                //             fieldLabel: 'Periode'
                //         },
                //         {
                                            
                //             xtype: 'label',
                //             text: '(ex: 2018/2019/2020)'
                //         }
                //     ]
                // },
                {
                    xtype: 'combobox',
                    name: 'trainingbudgetprogram_id',
                    fieldLabel: 'Budget Program',
                    width:300,
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
                    xtype: 'combobox',
                    fieldLabel: 'Periode',
                    name: 'periode',
                    store: 'Trainingperiode',
                    width:300,
                    displayField: 'periode',
                    valueField: 'periode',
                    readOnly:true
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
                    xtype: 'combobox',
                    fieldLabel: 'Apply budget to',
                    name: 'apply_budget',
                    //updated by anas 28042022
                    store : new Ext.data.SimpleStore({
                    data : [[99, 'All'], [1, 'Banding'], [2, 'Departement'], [3, 'Banding & Departement']],
                        fields : ['value', 'text']
                    }),
                    width:300,
                    valueField : 'value',
                    displayField : 'text',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Department',
                    name: 'department_id',
                    width:300,
                    displayField: 'department',
                    valueField: 'department_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Banding',
                    name: 'banding_id',
                    width:300,
                    displayField: 'banding',
                    valueField: 'banding_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Employee status',
                    name: 'employeestatus_id',
                    store : new Ext.data.SimpleStore({
                    data : [[99, 'All'], [1, 'Permanent'], [2, 'Contract']],
                        fields : ['value', 'text']
                    }),
                    width:300,
                    valueField : 'value',
                    displayField : 'text',
                },
                {
                    xtype: 'xmoneyfield',
                    name:'budget',
                    width:300,
                    fieldLabel:'Budget'
                },
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});