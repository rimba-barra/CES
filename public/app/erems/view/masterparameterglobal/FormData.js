Ext.define('Erems.view.masterparameterglobal.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterparameterglobalformdata',
    requires:['Erems.library.template.component.Datatypeforparametercombobox'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'parameter_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    name: 'parametername',
                    fieldLabel: 'Parameter name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_side',
                    name: 'value',
                    fieldLabel: 'Value',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[0-9.]/,
                    minLength: 1,
                    maxLength: 50,
                    anchor: '-5'
                },
                {
                    xtype: 'datatypeforparametercombobox',
                    itemId: 'fdms_descriptionss',
                    name: 'datatype',
                    fieldLabel: 'Data type',
                    allowBlank:false,
                    anchor: '-5'
                },
                {
                    xtype      : 'xnotefieldEST',
                    height     : 60,
                    itemId     : 'fdms_description',
                    name       : 'description',
                    fieldLabel : 'Description',
                    anchor     : '-5'
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});