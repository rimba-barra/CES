Ext.define('Erems.view.masterpbbinduk.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterpbbindukformdata',
    // requires: ['Erems.library.template.component.Facilitiestypecombobox'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
	//height: 600,
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
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'pbbinduk_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_pbbinduk',
                    name: 'code',
                    fieldLabel: 'PBB Induk',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9.-]/,
                    maxLength: 50,
                    anchor: '-5'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_nopinduk',
                    name: 'nopinduk',
                    fieldLabel: 'NOP Induk',
                    enableKeyEvents: true,
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9.-]/,
                    maxLength: 50,
                    anchor: '-5'
                },
				{
                    xtype      : 'xnumericfieldEST',
                    itemId     : 'fdms_kecamatan_id',
                    name       : 'kecamatan_id',
                    fieldLabel : 'Kecamatan ID',
                    allowBlank : false,
                    maxLength  : 50,
                    anchor     : '-5'
                },
				/*{
                    xtype: 'kecamatancombobox',
                    itemId: 'fdms_kecamatan_id',
                    name: 'kecamatan_id',
                    anchor:'-15'

                },*/
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

