Ext.define('Erems.view.reservation.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.reservationformsearch',
    requires: [
        'Erems.library.box.Config', 
        'Erems.template.ComboBoxFields',
        'Erems.library.template.view.combobox.Salesman',
    ],
    initComponent: function() {
        var me = this;

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
                },
                // added by rico 14022023
                {
                    xtype      : 'cbsalesman',
                    fieldLabel : 'Salesman',
                    anchor     : '-5',
                    name       : 'salesman_id',
                    flex       : 2,
                    editable   : false
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});