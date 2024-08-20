Ext.define('Erems.view.masterpromotionmedia.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterpromotionmediaformdata',
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
                    name: 'mediapromotion_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },{
                    xtype: 'mediapromotionkategoricombobox',
                    fieldLabel: 'Media Promotion Kategori',
                    anchor: '-5',
                    itemId: 'fd_media_promotion_kategori',
                    name: 'mediapromotion_kategori_id',
                    allowBlank: false,
                    listeners: {
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        },
                    }
                },
                {
                    xtype      : 'xnotefieldEST',
                    height     : 60,
                    itemId     : 'fdms_side',
                    name       : 'mediapromotion',
                    fieldLabel : 'Media Promotion',
                    allowBlank : false,
                    maskRe     : /[^\`\"\']/,
                    maxLength  : 150,
                    anchor     : '-5'
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