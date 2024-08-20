Ext.define('Hrd.view.masterbank.FormData', {
    alias: 'widget.masterbankformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        



        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'bank_id'
                },
                {
                    name: 'code',
                    width:150,
                    fieldLabel: 'Kode'
                },
                {
                    name: 'description',
                    width:400,
                    fieldLabel: 'Keterangan'
                },
                
            ],
            dockedItems: [],
            tbar: [
                {
                    padding: '4px 6px',
                    xtype: 'button',
                    disabled: true,
                    action: 'save',
                    cls: 'InfoButton',
                    text: 'Save',
                    iconAlign: 'left',
                    iconCls: 'icon-save'
                },
                '->'

            ]
        });
        me.callParent(arguments);
    }

});