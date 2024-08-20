Ext.define('Hrd.view.jenispengobatan.FormData', {
    alias: 'widget.jenispengobatanformdata',
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
                    name: 'jenispengobatan_id'
                },
                {
                    name: 'code',
                    fieldLabel: 'Kode Jenis Plafon'
                },
                {
                    name: 'jenispengobatan',
                    fieldLabel: 'Description',
                    width: 500
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype:'textfield',
                            name: 'percent_value',
                            maskRe: /[0-9-.]/,
                            fieldLabel: 'Percent',
                            width: 170
                        },
                        {
                            xtype:'label',
                            padding:'0 0 0 10px',
                            width:30,
                            text:'%'
                        }
                    ]
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