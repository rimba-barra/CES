Ext.define('Hrd.view.bobotnilai.FormData', {
    alias: 'widget.bobotnilaiformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        


        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'bobotnilai_id'
                },
                {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Code',
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    name: 'item_number',
                    fieldLabel: 'Item No.',
                    readOnly: true,
                    size:30
                },
                {
                    xtype: 'textfield',
                    name: 'value',
                    fieldLabel: 'Value',
                    readOnly: true,
                    size:30
                },
                

            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});