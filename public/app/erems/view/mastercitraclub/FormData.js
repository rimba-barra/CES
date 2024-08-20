Ext.define('Erems.view.mastercitraclub.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.mastercitraclubformdata',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow:-1,
    initComponent: function() {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield',
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'citraclub_id'
                },{
                   name:'code',
                   fieldLabel:'Code',
                   size:10,
                   allowBlank:false
                },
                {
                   name:'clubname',
                   fieldLabel:'Name',
                   size:35,
                   allowBlank:false
                },{
                   name:'description',
                   fieldLabel:'Description',
                   size:255
                }
                ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

