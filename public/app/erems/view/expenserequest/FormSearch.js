Ext.define('Erems.view.expenserequest.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    requires: [
        'Erems.template.ComboBoxFields',
        'Erems.library.template.component.Departmentcombobox'
    ],
    alias: 'widget.expenserequestformsearch',
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype: 'combobox',
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '90%',
                typeAhead: true,
                queryMode: 'local',
                lastQuery: '',
                forceSelection:true,
                listeners:{
                    beforequery: function(record){
                        record.query = new RegExp(record.query, 'i');
                        record.forceAll = true;
                    }
                }
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'expense_no',
                    fieldLabel: 'Expense No',
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    name: 'voucher_no',
                    fieldLabel: 'Voucher No',
                    enableKeyEvents: true
                },
				{
                    xtype: 'textfield',
                    name: 'unit_number',
                    fieldLabel: 'Unit Number',
                    enableKeyEvents: true
                },
                {
                    name: 'department_id',
                    itemId: 'search_department_id',
                    displayField: cbf.department.d,
                    valueField: cbf.department.v,
                    queryMode:'local',
                    fieldLabel: 'Department'
                },
                {
                    name: 'paymentmethod_id',
                    displayField: cbf.paymentmethod.d,
                    valueField: cbf.paymentmethod.v,
                    fieldLabel: 'Payment Method'
                },
                {
                    name: 'approved',
                    store: new Ext.data.ArrayStore({
                        fields: [
                            'approved',
                            'approved_text'
                        ],
                        data: [[999, 'ALL'], [1, 'NON APPROVE'], [2, 'APPROVED']]
                    }),
                    fieldLabel: 'Approve Status',
                    displayField: 'approved_text',
                    valueField: 'approved'
                }

            ],
            dockedItems: me.generateDockedItems()
        });

        /*Ext.applyIf(me, {
         defaults: me.generateDefaults(),
         items: [
         {
         xtype: 'textfield',
         name: 'expense_no',
         fieldLabel: 'Expense No',
         enforceMaxLength: true,
         maskRe: /[^\`"\']/,
         maxLength: 50
         },
         {
         xtype: 'textfield',
         name: 'voucher_no',
         fieldLabel: 'Voucher No',
         enforceMaxLength: true,
         maskRe: /[^\`"\']/,
         maxLength: 50
         },
         {
         xtype:'departmentcombobox',
         anchor:'-15',
         name:'department_id'
         },
         {
         xtype:'paymentmethodcombobox',
         name:'paymentmethod_id',
         anchor:'-15'
         },
         {
         xtype:'approvedcombobox',
         name:'approved',
         anchor:'-15'
         },
         me.createFieldRangeMulti({
         xtype:'datefield',
         fieldLabel:'Request Date',
         textName:'expense_date',
         rangeSeparator:'s/d',
         tailText:''
         }),
         me.createFieldRangeMulti({
         xtype:'datefield',
         fieldLabel:'Approve Date',
         textName:'approve_date',
         rangeSeparator:'s/d',
         tailText:''
         })
         ],
         dockedItems: me.generateDockedItems()
         });*/

        me.callParent(arguments);
    }
});