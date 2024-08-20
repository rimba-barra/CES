Ext.define('Gl.view.documentnumbering.FormData', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.documentnumberingformdata',
    // requires: ['Gl.library.template.component.Facilitiestypecombobox'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
	height: 250,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_documentnumber_id',
                    name: 'documentnumber_id'
                },
				{
                    xtype: 'numberfield',
                    itemId: 'fdms_year',
                    name: 'year',
                    fieldLabel: 'Year',
                    allowBlank: false,
                    enforceMaxLength: true,
					value: new Date().getFullYear(),
                    absoluteReadOnly:true,
                    anchor: '-5'
                },
                {
                    xtype: 'numberfield',
                    itemId: 'fdms_month',
                    name: 'month',
                    fieldLabel: 'Month',
                    allowBlank: false,
                    enforceMaxLength: true,
                    value: new Date().getMonth()+1,
                    anchor: '-5'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_subdsk',
                    name: 'module_name',
                    fieldLabel: 'Module Name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    value: 'MJ[XXXX]/[MM]',
                    maxLength: 50,
                    value: 'JOURNAL/MJ',
                    absoluteReadOnly:true,
                    anchor: '-5'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_description',
                    name: 'format',
                    fieldLabel: 'Kode Format',
                    allowBlank: false,
                    enforceMaxLength: true, 
                    value: 'MJ[XXXX]/[MM]',
                    maxLength: 50,
                    anchor: '-5'
                },
				{
                    xtype: 'numberfield',
                    itemId: 'fdms_counter',
                    name: 'counter',
                    fieldLabel: 'Counter',
                    allowBlank: false,
                    enforceMaxLength: true,
					maskRe: /[0-9]/,
                    value: 0,
                    maxLength: 50,
                    anchor: '-5'
                },
				
				],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

