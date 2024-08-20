Ext.define('Erems.view.popupreservation.FormSearch', {
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.popupreservationformsearch',
    initComponent : function () {
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
                   
                },
                {
                    xtype: 'textfield',
                    name: 'reservation_no',
                    fieldLabel: 'Reservation No',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                },
               
                {
                    xtype      : 'xnamefieldEST',
                    name       : 'customer_name',
                    fieldLabel : 'Customer Name',
                   
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});