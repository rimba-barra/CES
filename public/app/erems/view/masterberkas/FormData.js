Ext.define('Erems.view.masterberkas.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterberkasformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
//    height: 600,
    width: 400,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'berkas_id',
                    name: 'berkas_id'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Code',
                    anchor: '-5',
                    name: 'code',
                    flex: 5,
                    allowBlank: false,
                    maskRe:/[A-Za-z0-9]/,
                    enforceMaxLength:true,
                    minLength:2,
                    maxLength:5
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Berkas',
                    anchor: '-5',
                    name: 'berkas',
                    flex: 5,
                    allowBlank: false,
                    maskRe:/[A-Za-z0-9\s\.\,]/,
                    enforceMaxLength:true,
                    minLength:2,
                    maxLength:200
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Description',
                    anchor: '-5',
                    name: 'description',
                    flex: 5,
                    enforceMaxLength:true,
                    maxLength:250
                },		
				
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    
});

