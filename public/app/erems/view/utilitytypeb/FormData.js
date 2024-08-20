Ext.define('Erems.view.utilitytypeb.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.utilitytypebformdata',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    height: 200,
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
            },
            items: [{
                    xtype: 'hiddenfield',
                    name: 'utilitytype_id'
                }, 
                {
                    xtype: 'textfield',
                    name: 'utilitytype',
                    fieldLabel: 'Name',
                    enforceMaxLength:true,
                    maxLength:50,
                    maskRe:/[A-Za-z0-9\s.]/
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength:true,
                    maxLength:255,
                    maskRe:/[A-Za-z0-9\s.]/
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

