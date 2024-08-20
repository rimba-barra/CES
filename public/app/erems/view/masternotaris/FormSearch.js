Ext.define('Erems.view.masternotaris.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:['Erems.library.template.component.Citycombobox',
              'Erems.library.template.component.Countrycombobox'],
    alias:'widget.masternotarisformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fsms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 5
                },
                {
                    xtype      : 'xnamefieldEST',
                    itemId     : 'fsms_name',
                    name       : 'notaris',
                    fieldLabel : 'Notaris name',
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_address',
                    name: 'alamat',
                    fieldLabel: 'Address',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 50
                },{
                    xtype: 'countrycombobox',
                    itemId: 'fs_country',
                    name: 'country_id',
                    fieldLabel: 'Country',
                    anchor:'-20'
                 
                   
                },
                {
                    xtype: 'citycombobox',
                    itemId: 'fs_city',
                    name: 'city_id',
                    fieldLabel: 'City',
                    anchor:'-20'
                 
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});