Ext.define('Cashier.view.popupjatuhtempo.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    requires:[],
    alias:'widget.popupjatuhtempoformsearch',
    initComponent: function() {
        var me = this;
        var cbf = new Cashier.template.ComboBoxFields();
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                   
                    name: 'unit_number',
                    fieldLabel: 'Unit Number',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                   
                },
                {
                    xtype: 'textfield',
                    
                    name: 'customer_name',
                    fieldLabel: 'Customer Name',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/
                },
                {
                    xtype: 'textfield',
                    
                    name: 'today_plus',
                    fieldLabel: 'Due date from Today +',
                    enforceMaxLength: true,
                    maskRe: /[0-9]/
                },
                {
                    xtype: 'combobox',
                    name: 'scheduletype',
                    displayField: 'scheduletype',
                    valueField: 'scheduletype_id',
                    fieldLabel: 'Schedule Type ',
                    anchor:'-15'
                 
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
