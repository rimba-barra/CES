Ext.define('Erems.view.popupjatuhtempofilter.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.popupjatuhtempofilterformsearch',
    initComponent: function() {
        var me = this;
        var cbf = new Erems.template.ComboBoxFields();
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
                    xtype      : 'xnamefieldEST',
                    name       : 'customer_name',
                    fieldLabel : 'Customer Name',
                },
                {
                    xtype      : 'xnumericfieldEST',
                    name       : 'today_plus',
                    fieldLabel : 'Due date from Today +',
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
