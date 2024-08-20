Ext.define('Erems.view.mastertype.FormAddValue', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.mastertypeformaddvalue',
    requires: ['Erems.library.template.view.combobox.Attribute', 'Erems.library.template.view.combobox.Value'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    height: 150,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;'
            },
            items: [{
                xtype: 'hiddenfield',
                name: 'typeattribute_id'
            }, {
                xtype: 'hiddenfield',
                name: 'attribute'
            },

            {
                xtype: 'cbattribute',
                storeUrl: 'mastertype',
                name: 'attribute_id',
                anchor: '-170',
                bindPrefixName: "mastertype",
                allowBlank: false,

            },
            {
                xtype: 'textfield',
                itemId: 'attributevalue',
                name: 'value',
                fieldLabel: 'Value',
                enforceMaxLength: true,
                maxLength: 50,
                anchor: '-5'

            }, {
                xtype: 'cbvalue',
                storeUrl: 'mastertype',
                itemId: "attributeValueCb",
                fieldLabel: 'Value',
                hidden: true,
                name: 'attributevalue_id',
                anchor: '-170',
                bindPrefixName: "mastertype",
                allowBlank: false,

            }/*{
                    xtype: 'attributevaluecombobox',
                    itemId: 'fav_attributevalue',
                    name: 'attributevalue_id',
                    hidden:true,
                    fieldLabel:'Value',
                    anchor: '-170'

                }*/],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});