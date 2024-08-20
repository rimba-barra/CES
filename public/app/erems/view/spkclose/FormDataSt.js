Ext.define('Erems.view.spkclose.FormDataSt', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.spkcloseformdatast',
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
         
                    name: 'spk_id'
                },
                {
                    xtype: 'dfdatefield',
                    fieldLabel: 'Tgl. Serah Terima 1',
                    name: 'serahterima_date1',
                    editable:false
                }, {
                    xtype      : 'xnotefieldEST',
                    fieldLabel : 'Serah Terima Note 1',
                    name       : 'serahterima_note1',
                    width      : '100%',
                },
                {
                    xtype: 'dfdatefield',
                    fieldLabel: 'Tgl. Serah Terima 2',
                    name: 'serahterima_date2',
                    editable:false
                }, {
                    xtype      : 'xnotefieldEST',
                    fieldLabel : 'Serah Terima Note 2',
                    name       : 'serahterima_note2',
                    width      : '100%',
                },
                 {
                    xtype: 'dfdatefield',
                    fieldLabel: 'Tgl. Serah Terima 3',
                    name: 'serahterima_date3',
                    editable:false
                }, {
                    xtype      : 'xnotefieldEST',
                    fieldLabel : 'Serah Terima Note 3',
                    name       : 'serahterima_note3',
                    width      : '100%',
                }
                ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});