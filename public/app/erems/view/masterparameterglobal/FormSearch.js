Ext.define('Erems.view.masterparameterglobal.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:['Erems.library.template.component.Datatypeforparametercombobox'],
    alias:'widget.masterparameterglobalformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fsms_code',
                    name: 'parametername',
                    fieldLabel: 'Parameter name',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'value',
                    fieldLabel: 'Value',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 50
                },{
                    xtype: 'datatypeforparametercombobox',
                
                    itemId: 'fsms_datatype',
                    name: 'datatype',
                    fieldLabel: 'Data type',
                    allowBlank:false,
                    anchor: '-5'
                },{
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'value',
                    fieldLabel: 'Value',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
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