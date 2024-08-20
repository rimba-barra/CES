Ext.define('Hrd.view.absenttype.FormData', {
    alias: 'widget.absenttypeformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.Absenttypegroup'],
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
                    name: 'absenttype_id'
                },
                {
                    fieldLabel: 'Code',
                    name: 'code'
                },
                {
                    fieldLabel: 'Absent Type',
                    name: 'absenttype',
                    width:400
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Cut Off',
                    fieldLabel:'&nbsp;',
                    name: 'is_cutleave',
                    inputValue: '1'

                },
                {
                    xtype: 'cbabsenttypegroup',
                    name: 'absenttypegroup_absenttypegroup_id',
                    fieldLabel: 'Group'
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});