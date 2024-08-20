Ext.define('Gl.view.subdesccode.FormData', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.subdesccodeformdata',
    // requires: ['Gl.library.template.component.Facilitiestypecombobox'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
	height: 200,
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
                    itemId: 'fdms_subdsk_id',
                    name: 'subdsk_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_subdsk',
                    name: 'subdsk',
                    fieldLabel: 'Kode Sub Deskripsi',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 3,
                    absoluteReadOnly:true,
                    anchor: '-5'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },
				
				],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

