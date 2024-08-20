Ext.define('Hrd.view.variabelgaji.FormData', {
    alias: 'widget.variabelgajiformdata',
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
                    name: 'variabelgaji_id'
                },
                {
                    xtype:'combobox',
                    name:'komponengaji_komponengaji_id',
                    fieldLabel:'Komponen Gaji',
                    displayField:'code',
                    valueField:'komponengaji_id'
                }
                
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