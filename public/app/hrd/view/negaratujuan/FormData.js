Ext.define('Hrd.view.negaratujuan.FormData', {
    alias: 'widget.negaratujuanformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
                {
                    xtype:'hiddenfield',
                    name:'negaratujuan_id'
                },
               
                {
                    fieldLabel:'Kode Negara Tujuan',
                    width:250,
                    name:'code'
                },
                {
                    fieldLabel:'Nama Negara Tujuan',
                    width:500,
                    name:'negaratujuan'
                },
                {
                            flex:1,
                            xtype: 'fieldset',
                            title: ' ',
                            layout: 'hbox',
                            margin:'15 10 10 0',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    labelWidth: 1,
                                    width: '100%',
                                    layout: 'hbox',
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {boxLabel: 'Luar Negeri', name: 'is_luarnegeri', inputValue: "1"},
                                        {boxLabel: 'Dalam Negeri', name: 'is_luarnegeri', inputValue: "0", checked: true},
                                    ]
                                }
                            ]
                        }
                
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});