Ext.define('Erems.view.masterattribute.FormAddValue', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterattributeformaddvalue',
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
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
                    itemId: 'attributevalue_id',
                    name: 'attributevalue_id'
                },
                
                {
                    xtype: 'textfield',
                    itemId: 'fav_attribute',
                    name: 'attribute',
                    fieldLabel: 'Attribute name',
                    readOnly: true,
                    enforceMaxLength: true,
                    maxLength: 50,
                    anchor: '-5'

                },
                {
                    xtype: 'textfield',
                    itemId: 'attributevalue',
                    name: 'attributevalue',
                    fieldLabel: 'Value',
                    enforceMaxLength: true,
                    maxLength: 50,
                    anchor: '-5'

                },{
                    xtype: 'checkboxfield',
                    itemId: 'fai_is_default',
                    margin: '15 0 0 0',
                    name: 'is_default',
                    boxLabel: 'As Default',
                    inputValue: '1',
                    uncheckedValue: '0'
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});