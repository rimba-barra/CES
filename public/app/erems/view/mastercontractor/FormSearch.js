Ext.define('Erems.view.mastercontractor.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.mastercontractorformsearch',
    requires: ['Erems.template.ComboBoxFields'],
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

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
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'contractorname',
                    fieldLabel: 'Contractor name',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'address',
                    fieldLabel: 'Address',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'combobox',
                    itemId: 'fs_country',
                    displayField: cbf.country.d,
                    valueField: cbf.country.v,
                    name: 'country_country_id',
                    fieldLabel: 'Country',
                    anchor: '-20'


                },
                {
                    xtype: 'combobox',
                    itemId: 'fs_city',
                    name: 'city_city_id',
                    displayField: cbf.city.d,
                    valueField: cbf.city.v,
                    fieldLabel: 'City',
                    anchor: '-20'

                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_pic',
                    name: 'PIC',
                    fieldLabel: 'Contact Person',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 50
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});