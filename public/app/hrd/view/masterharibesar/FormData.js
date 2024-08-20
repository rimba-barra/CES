Ext.define('Hrd.view.masterharibesar.FormData', {
    alias: 'widget.masterharibesarformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.Holidaynamecombobox'],
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
                    name: 'holiday_shift_id'
                },
                {
                    xtype: 'datefield',
                    itemId: 'holiday_date',
                    name: 'holiday_date',
                    fieldLabel: 'Date',
                    labelSeparator:'',
                    editable: false,
                    format: 'd-m-Y',
                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                    submitFormat: 'Y-m-d H:i:s.u',
                    allowBlank: false
                },
                {
                    flex: 1,
                    xtype: 'holidaynamecombobox',
                    fieldLabel: 'Type',
                    name: 'holiday_name_id',
                    displayField: 'holiday_name',
                    valueField: 'holiday_name_id',
                    allowBlank: false
                },

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});