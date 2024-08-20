////// add by Erwin 04/06/2021
Ext.define('Erems.view.purchaseletter.FormDataTahanBatal', {
    extend      : 'Erems.library.template.view.FormData',
    alias       : 'widget.purchaseletterformdatatahanbatal',
    frame       : true,
    autoScroll  : true,
    anchorSize  : 100,
    height      : 300,
    bodyBorder  : true,
    bodyPadding : 10,
    bodyStyle   : 'padding:5px 5px 0',
    defaults    : {
        border : false,
        xtype  : 'panel',
        flex   : 1,
        layout : ''
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign     : 'top',
                labelSeparator : ' ',
                labelClsExtra  : 'small',
                fieldStyle     : 'margin-bottom:3px;',
                anchor         : '100%'
            },
            items: [
                {
                    xtype  : 'hiddenfield',
                    name   : 'purchaseletter_id'
                },
                {
                    xtype      : 'checkboxfield',
                    itemId     : 'is_tahanbatal',
                    name       : 'is_tahanbatal',
                    fieldLabel : 'Tahan Batal',
                    labelWidth : 130,
                },
                {
                    xtype            : 'numberfield',
                    itemId           : 'lama_tahanbatal',
                    name             : 'lama_tahanbatal',
                    fieldLabel       : 'Lama Tahan Batal (hari)',
                    minValue         : 0,
                    allowExponential : false,
                    allowDecimals    : false,
                    labelWidth       : 130,
                    disabled         : false
                },
                {
                    xtype      : 'xnotefieldEST',
                    itemId     : 'notes_tahanbatal',
                    name       : 'notes_tahanbatal',
                    fieldLabel : 'Notes Tahan Batal',
                    labelWidth : 130,
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});