Ext.define('Hrd.view.tipepinjaman.FormData', {
    alias: 'widget.tipepinjamanformdata',
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
                    name: 'tipepinjaman_id'
                },
                {
                    name:'code',
                    fieldLabel:'Kode Tipe'
                },
                {
                    name:'name',
                    fieldLabel:'Keterangan'
                }

            ],
            dockedItems: [],
            tbar: [
                {
                    padding: '4px 6px',
                    xtype: 'button',
                    disabled:true,
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