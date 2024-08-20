Ext.define('Hrd.view.jobdesc.FormData', {
    alias: 'widget.jobdescformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'jobdesc_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '5px 5px 5px 0',
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'position_position_id',
                            fieldLabel: 'Jabatan',
                            displayField: 'position',
                            valueField: 'position_id'

                        },
                        {
                            xtype: 'textfield',
                            margin: '0 0 0 5px',
                            name:'position_description',
                            keepRO: true,
                            readOnly: true,
                            width: 300,
                            fieldLabel: '',
                        }
                    ]
                },
                {
                    xtype: 'textareafield',
                    name: 'description',
                    rows: '24',
                    cols: '80',
                    fieldLabel: 'Tugas secara umum'
                }
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});