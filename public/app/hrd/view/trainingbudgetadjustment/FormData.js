Ext.define('Hrd.view.trainingbudgetadjustment.FormData', {
    alias: 'widget.trainingbudgetadjustmentformdata',
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
                    name:'trainingbudgetadjustment_id'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Periode',
                    name: 'periode',
                    store: 'Trainingperiode',
                    width:300,
                    displayField: 'periode',
                    valueField: 'periode',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Apply adjustment to',
                    name: 'apply_adjustment_to',
                    store : new Ext.data.SimpleStore({
                    data : [[1, 'Budget Program'], [2, 'Employee']],
                        fields : ['value', 'text']
                    }),
                    width:300,
                    valueField : 'value',
                    displayField : 'text',
                },
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
                // {
                //     fieldLabel:'Caption',
                //     width:300,
                //     name:'caption_budgetprogram'
                // },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Caption',
                //     name: 'trainingcaption_id',
                //     width:300,
                //     displayField: 'caption',
                //     valueField: 'trainingcaption_id',
                // },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Employee',
                    name: 'employee_id',
                    width:300,
                    displayField: 'employee_name',
                    valueField: 'employee_id',
                },
                {
                    xtype: 'xmoneyfield',
                    name:'adjustment',
                    width:300,
                    fieldLabel:'Adjustment'
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Minus',
                    fieldLabel:'&nbsp;',
                    name: 'minus',
                    uncheckedValue: '0',
                    inputValue: '1'
                },
                {
                    xtype: 'textareafield',
                    rows: '5',
                    fieldLabel:'Notes',
                    width:300,
                    name:'notes'
                },
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});